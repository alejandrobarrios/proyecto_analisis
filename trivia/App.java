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

      post("/users", (req, res) -> {
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
        option.saveIt();

        res.type("application/json");

        return option.toJson(true);
      });

      get("/users", (req, res) -> {//get all users load
        LazyList<User> user = User.findAll();
        List<String> lista = new ArrayList<String>();
        for(User u: user ){
          String usuario = "Su username es: " + u.get("username") + ", su dni es: " + u.get("dni");
          lista.add(usuario);
        }
        return lista;
      });

      get("/questions", (req, res) -> {//get all questions load
        LazyList<Question> question = Question.findAll();
        List<String> lista = new ArrayList<String>();
        for(Question q: question ){
          String pregunta = "Su categoria es: " + q.get("category") + ", su descripcion es: " + q.get("description");
          lista.add(pregunta);
        }
        return lista;
      });    

      get("/options/:id", (req, res) -> {//get all options of a given question_id
        LazyList<Option> option = Option.where("question_id = ?",req.params(":id"));
        List<String> lista = new ArrayList<String>();
        for(Option u: option ){
          String opcion = "Su categoria es: " + u.get("category") + ", su descripcion es: " + u.get("description");
          lista.add(opcion);
        }
        return lista;
      });  

      get("/users/:id", (req, res) -> {//verfication that a user is load
        LazyList<User> user = User.where("id = ?", req.params(":id"));
        return user.get(0);
      });
      
      get("/questions/:id", (req, res) -> {//verification if a question is load
        Question question = Question.findFirst("id = ?",req.params(":id"));
        return "La pregunta pertenece a " + question.get("category") + " y es la siguiente: " + question.get("description");
      });
      
      get("/questions/:id", (req, res) -> {//verification of a option i load
        Option option = Option.findFirst("question_id = ?",req.params(":id"));
        return option.get("description");
      });
      




    }
}