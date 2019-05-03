package trivia;

import static spark.Spark.after;
import static spark.Spark.before;
import static spark.Spark.get;
import static spark.Spark.post;

import java.util.Map;

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
        user.saveIt();

        res.type("application/json");

        return user.toJson(true);
      });

      post("/questions", (req, res) -> {//create a question.
        Map<String, Object> bodyParams = new Gson().fromJson(req.body(), Map.class);

        Question question = new Question();
        question.set("id",bodyParams.get("id"));
        question.set("category", bodyParams.get("category"));
        question.set("description", bodyParams.get("description"));
        question.saveIt();

        res.type("application/json");

        return question.toJson(true);
      });

      post("/options", (req, res) -> {//create an option.
        Map<String, Object> bodyParams = new Gson().fromJson(req.body(), Map.class);

        Option option = new Option();
        option.set("id",bodyParams.get("id"));
        option.set("category", bodyParams.get("category"));
        option.set("description", bodyParams.get("description"));
        option.saveIt();

        res.type("application/json");

        return option.toJson(true);
      });

      get("/users/:name", (req, res) -> {//consulta dado un nombre
        LazyList<User> user = User.where("username = ?",req.params(":name"));
        User usuario = user.get(0);
        return usuario.get("username");
      });
      
      get("/questions/:id", (req, res) -> {//consulta dada una categoria
        LazyList<Question> question = Question.where("id = ?",req.params(":id"));
        Question query = question.get(0);
        return "la pregunta pertenece a " + query.get("category") + " y es la siguiente: " + query.get("description");
      });
      
      get("/questions/:category", (req, res) -> {//consulta dada una categoria
        LazyList<Option> option = Option.where("category = ?",req.params(":category"));
        Option answer = option.get(0);
        return answer.get("description");
      });
      




    }
}