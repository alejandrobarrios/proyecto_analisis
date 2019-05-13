package trivia;

import static spark.Spark.after;
import static spark.Spark.before;
import static spark.Spark.get;
import static spark.Spark.post;

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

      get("/game", (req, res) -> {
        Map<String, Object> bodyParams = new Gson().fromJson(req.body(), Map.class);

        User user = new User();
        user.set("username", bodyParams.get("username"));
        user.set("password", bodyParams.get("password"));
        user.set("name", bodyParams.get("name"));
        user.set("lastname", bodyParams.get("lastname"));
        user.set("dni", bodyParams.get("dni"));
        user.saveIt();

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
        option.set("category", bodyParams.get("category"));
        option.set("description", bodyParams.get("description"));
        option.set("question_id", bodyParams.get("question_id"));
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

      delete("/users/:username", (req, res) -> {//delete an user 
        User user = User.findFirst("username = ?", req.params(":username"));
        user.delete();
        return "borrado";
      });

      delete("/questions/:id", (req, res) -> {//delete an question
        Question question = Question.findFirst("id = ?", req.params(":id"));
        question.delete();
        return "borrado";
      });

      put("/users/:username", (req,res) -> {//modify a password of a user with his username
        Map<String, Object> bodyParams = new Gson().fromJson(req.body(), Map.class);

        User user = User.findFirst("username = ?", bodyParams.get("username"));
        user.set("password", bodyParams.get("password"));
        user.saveIt();

        res.type("application/json");

        return user.toJson(true);
      });

      put("/questions/:id", (req,res) -> {//modify the description of a question with his id
        Map<String, Object> bodyParams = new Gson().fromJson(req.body(), Map.class);

        Question question = Question.findFirst("id = ?", bodyParams.get("id"));
        question.set("description", bodyParams.get("description"));
        question.saveIt();

        res.type("application/json");

        return question.toJson(true);
      });


    }
}