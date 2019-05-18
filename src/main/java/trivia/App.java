package trivia;

import static spark.Spark.after;
import static spark.Spark.before;
import static spark.Spark.*;

import java.util.Map;
import java.util.*;

import org.javalite.activejdbc.Base;
import org.javalite.activejdbc.DB;
import org.javalite.activejdbc.LazyList;
import trivia.BasicAuth;
import trivia.User;
import trivia.Question;
import trivia.Option;

import com.google.gson.Gson;

class QuestionParam
{
  String description;
  ArrayList<OptionParam> options;
}

class OptionParam
{
  String description;
  Boolean correct;
}

public class App
{
  static User currentUser;
    public static void main( String[] args )
    { before((request, response) -> {
        Base.open();

        String headerToken = (String) request.headers("Authorization");

        if (
          headerToken == null ||
          headerToken.isEmpty() ||
          !BasicAuth.authorize(headerToken)
        ) {
          halt(401);
        }

        currentUser = BasicAuth.getUser(headerToken);
      });

      after((request, response) -> {
        Base.close();
        response.header("Access-Control-Allow-Origin", "*");
        response.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
        response.header("Access-Control-Allow-Headers",
          "Content-Type,Authorization,X-Requested-With,Content-Length,Accept,Origin,");
      });

      options("/*", (request, response) -> {
        return "OK";
      });

      post("/users", (req, res) -> {
        Map<String, Object> bodyParams = new Gson().fromJson(req.body(), Map.class);

        User user = new User();
        user.set("username", bodyParams.get("username"));
        user.set("password", bodyParams.get("password"));
        user.set("name", bodyParams.get("name"));
        user.set("lastname", bodyParams.get("lastname"));
        user.set("dni", bodyParams.get("dni"));
        user.saveIt();

        Game game = new Game();
        game.set("point", 0);
        game.set("amount_right", 0);
        game.set("amount_wrong", 0);
        game.set("user_id", user.get("id"));

        res.type("application/json");

        return user.toJson(true);
      });

       post("/questions", (req, res) -> {
        QuestionParam bodyParams = new Gson().fromJson(req.body(), QuestionParam.class);

        Question question = new Question();
        question.set("description", bodyParams.description);
        question.save();

        for(OptionParam item: bodyParams.options) {
          Option option = new Option();
          option.set("description", item.description).set("correct", item.correct);
          question.add(option);
        }

        return question;
      });

      /*get("/users", (req, res) -> {//get all users load
        LazyList<User> user = User.findAll();
        List<String> lista = new ArrayList<String>();
        for(User u: user ){
          String usuario = "Su username es: " + u.get("username") + ", su dni es: " + u.get("password");
          lista.add(usuario);
        }
        return lista;
      });*/

      get("/questions", (req, res) -> {//get all questions load of a given category
        LazyList<Question> question = Question.findAll();
        List<String> lista = new ArrayList<String>();
        for(Question q: question ){
          String pregunta = "Su categoria es: " + q.get("category") + ", su descripcion es: " + q.get("description");
          lista.add(pregunta);
        }
        return lista;
      });    

      get("/questions", (req, res) -> {//return a question
        LazyList<Option> option = Question.where("id = ?",req.params(":id"));
        Option choice = option.get(0);
        return "Su categoria es: " + choice.get("category") + ", su descripcion es: " + choice.get("description");
      }); 

      get("/options", (req, res) -> {//get all options of a given question_id
        LazyList<Option> option = Option.where("question_id = ?",req.params(":id"));
        List<String> lista = new ArrayList<String>();
        for(Option o: option ){
          String opcion = "Su categoria es: " + o.get("category") + ", su descripcion es: " + o.get("description");
          lista.add(opcion);
        }
        return lista;
      });  

      get("/users", (req, res) -> {//verfication that a user is load
        Map<String, Object> bodyParams = new Gson().fromJson(req.body(), Map.class);

        User user = User.findFirst("username = ?", bodyParams.get("username"));
        if(user != null){
         return user; 
        }else{
          return "Usuario no encontrado.";
        }

      });

      delete("/users", (req, res) -> {//delete an user 7
        Map<String, Object> bodyParams = new Gson().fromJson(req.body(), Map.class);

        User user = User.findFirst("username = ?", bodyParams.get("username"));
        user.delete();
        return "borrado";
      });

      delete("/questions", (req, res) -> {//delete an question
        Map<String, Object> bodyParams = new Gson().fromJson(req.body(), Map.class);

        Question question = Question.findFirst("id = ?", bodyParams.get("id"));
        question.delete();
        return "borrado";
      });

      put("/users", (req,res) -> {//modify a password of a user with his username
        Map<String, Object> bodyParams = new Gson().fromJson(req.body(), Map.class);

        User user = User.findFirst("username = ?", bodyParams.get("username"));
        user.set("password", bodyParams.get("password"));
        user.saveIt();

        res.type("application/json");

        return user.toJson(true);
      });

      put("/questions", (req,res) -> {//modify the description of a question with his id
        Map<String, Object> bodyParams = new Gson().fromJson(req.body(), Map.class);

        Question question = Question.findFirst("id = ?", bodyParams.get("id"));
        question.set("description", bodyParams.get("description"));
        question.saveIt();

        res.type("application/json");

        return question.toJson(true);
      });

      get("/games", (req, res) -> {
        Map<String, Object> bodyParams = new Gson().fromJson(req.body(), Map.class); 
        Question pregunta = new Question();
        Game partida = new Game();
        User user = User.findFirst("username = ?", bodyParams.get("username"));
        if(user.get("password") == bodyParams.get("password")){
          partida = Game.findFirst("user_id = ?", user.get("id"));
          int puntaje = (int) partida.get("point");
          pregunta = Question.findFirst("category = ?", bodyParams.get("category"));
          LazyList<Option> opciones = Option.where("question_id = ?", pregunta.get("id"));
          System.out.println("la pregunta es :" + pregunta.get("description"));
          int i = 1;
          Boolean asserto = false;
          for(Option o: opciones ){
            String opcion = "La opcion" + i + ": " + o.get("description");
            i++;
            System.out.println(opcion);
          }
          Option correct = Question.findFirst("question_id = ? and correct = ?",pregunta.get("id"),"true");
          if(correct.get("description") == bodyParams.get("description")){
            puntaje = puntaje + 1;
            partida.set("point", puntaje);
            partida.saveIt();
         }
         System.out.println(partida.get("point"));
      }
            
        return "le assertaste" +  partida.get("point");
      });


      post("/login", (req, res) -> {
        res.type("application/json");

        // if there is currentUser is because headers are correct, so we only
        // return the current user here
        return currentUser.toJson(true);
      });

      /*post("/logout", (req, res) -> {
        Map<String, Object> bodyParams = new Gson().fromJson(req.body(), Map.class);




      });*/
    }
}