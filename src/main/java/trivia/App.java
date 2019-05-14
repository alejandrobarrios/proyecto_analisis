package trivia;

import static spark.Spark.after;
import static spark.Spark.before;
import static spark.Spark.*;

import java.util.Map;
import java.util.*;

import org.javalite.activejdbc.Base;
import org.javalite.activejdbc.DB;
import org.javalite.activejdbc.LazyList;

import trivia.User;
import trivia.Question;
import trivia.Option;

import com.google.gson.Gson;

public class App
{
    public static void main( String[] args )
    {
      before((request, response) -> {
        Base.open();
      });

      after((request, response) -> {
        Base.close();
      });

      get("/hello/:name", (req, res) -> {
        return "hola" + req.params(":name");
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

      post("/questions", (req, res) -> {//create a question.
        Map<String, Object> bodyParams = new Gson().fromJson(req.body(), Map.class);

        Question question = new Question();
        question.set("category", bodyParams.get("category"));
        question.set("description", bodyParams.get("description"));
        question.saveIt();

        res.type("application/json");

        return question.toJson(true);
      });

      post("/options", (req, res) -> {//create an option.
        Map<String, Object> bodyParams = new Gson().fromJson(req.body(), Map.class);

        Option option = new Option();
        option.set("description", bodyParams.get("description"));
        option.set("question_id", bodyParams.get("question_id"));
        option.set("correct", bodyParams.get("correct"));
        option.saveIt();

        res.type("application/json");

        return option.toJson(true);
      });

      get("/users", (req, res) -> {//get all users load
        LazyList<User> user = User.findAll();
        List<String> lista = new ArrayList<String>();
        for(User u: user ){
          String usuario = "Su username es: " + u.get("username") + ", su dni es: " + u.get("password");
          lista.add(usuario);
        }
        return lista;
      });

      get("/questions/:category", (req, res) -> {//get all questions load of a given category
        LazyList<Question> question = Question.findAll();
        List<String> lista = new ArrayList<String>();
        for(Question q: question ){
          String pregunta = "Su categoria es: " + q.get("category") + ", su descripcion es: " + q.get("description");
          lista.add(pregunta);
        }
        return lista;
      });    

      get("/questions/:id", (req, res) -> {//return a question
        LazyList<Option> option = Question.where("id = ?",req.params(":id"));
        Option choice = option.get(0);
        return "Su categoria es: " + choice.get("category") + ", su descripcion es: " + choice.get("description");
      }); 

      get("/options/:id", (req, res) -> {//get all options of a given question_id
        LazyList<Option> option = Option.where("question_id = ?",req.params(":id"));
        List<String> lista = new ArrayList<String>();
        for(Option o: option ){
          String opcion = "Su categoria es: " + o.get("category") + ", su descripcion es: " + o.get("description");
          lista.add(opcion);
        }
        return lista;
      });  

      get("/users/:id", (req, res) -> {//verfication that a user is load
        LazyList<User> user = User.where("id = ?", req.params(":id"));
        User usuario = user.get(0);
        return "Su dni es: " + usuario.get("dni") + ", el nombre es: " + usuario.get("name") + " y su apellido es: " + usuario.get("lastname");
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
        User user = User.findFirst("username = ?", bodyParams.get("username"));
        if(user.get("password") == bodyParams.get("password")){
          Game partida = Game.findFirst("user_id = ?", user.get("id"));
          int puntaje = (int) partida.get("point");
          pregunta = Question.findFirst("category = ?", bodyParams.get("category"));
          LazyList<Option> opciones = Option.where("question_id = ?", pregunta.get("id"));
          System.out.println("la pregunta es :" + pregunta.get("description"));
          int i = 1;
          Boolean asserto = false;
          for(Option o: opciones ){
            String opcion = "la opcion" + i + ": " + o.get("description");
            i++;
            System.out.println(opcion);
          }
          Option correct = Question.findFirst("question_id = ? and correct = ?",pregunta.get("id"),"true");
          if(correct.get("description") == bodyParams.get("description")){
            puntaje = puntaje +1;
            partida.set("point", puntaje);
         }
         System.out.println(partida.get("point"));
      }
            
        return "le assertaste";
       });


    }
}