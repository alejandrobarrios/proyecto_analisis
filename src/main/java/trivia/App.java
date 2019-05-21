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
import trivia.Statistics;

import com.google.gson.Gson;

class QuestionParam
{
  String description;
  String category;
  Boolean see;
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
        user.set("admin", bodyParams.get("admin"));
        user.set("point", bodyParams.get("point"));
        user.set("amount_right", bodyParams.get("amount_right"));
        user.set("amount_wrong",bodyParams.get("amount_wrong"));

        user.saveIt();
        
        res.type("application/json");  
        
        return user.toJson(true);


      });

       post("/questions", (req, res) -> {
        
        QuestionParam bodyParams = new Gson().fromJson(req.body(), QuestionParam.class);

        Question question = new Question();
        question.set("description", bodyParams.description);
        question.set("category", bodyParams.category);
        question.set("see", bodyParams.see);
        question.save();

        Statistics estadisticas = new Statistics();
        estadisticas.set("amount_user_right", 0);
        estadisticas.set("amount_user_wrong", 0);
        question.add(estadisticas);

        for(OptionParam item: bodyParams.options) {
          Option option = new Option();
          option.set("description", item.description).set("correct", item.correct);
          question.add(option);
        }
        
        res.type("application/json");
        return question.toJson(true);
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

      /*get("/questions", (req, res) -> {//get all questions load of a given category
        LazyList<Question> question = Question.findAll();
        List<String> lista = new ArrayList<String>();
        for(Question q: question ){
          String pregunta = "Su categoria es: " + q.get("category") + ", su descripcion es: " + q.get("description");
          lista.add(pregunta);
        }
        return lista;
      }); */    

      get("/questions", (req, res) -> {//return a question whith his options
        
        Map<String, Object> bodyParams = new Gson().fromJson(req.body(), Map.class);

        Boolean flag = true;
        LazyList<Question> question = Question.where("category = ?", bodyParams.get("category"));
        Question choice = new Question();

        while(flag){
          Random aux = new Random();
          int a = aux.nextInt(question.size());       
           choice = question.get(a);
          if(!(Boolean)choice.get("see")){
            flag = false;
          }
        }
        int id = (int)choice.get("id");

        LazyList<Option> option = Option.where("question_id = ?", id);
        List<String> lista = new ArrayList<String>();
        for(Option o: option ){
          String opcion = (String)o.get("description");
          lista.add(opcion);
        }
        
        return "la pregunta es : " + choice.get("description") + "y las opciones son :" + lista;
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

      delete("/users", (req, res) -> {//delete an user
        
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

      post("/games", (req, res) -> {
        
        Map<String, Object> bodyParams = new Gson().fromJson(req.body(), Map.class); 
    

        Statistics statistics = new Statistics();
        LazyList<User> users = User.where("username = ?", bodyParams.get("username"));
        if(users.size() > 0){
          User user = users.get(0);
          String pass = (String)bodyParams.get("password");
          if(user.get("password").equals(pass)){
          
            Boolean flag = true;
            LazyList<Question> question = Question.where("category = ? and see = ?", bodyParams.get("category"),false);
            Question choice = new Question();

            int point =(int) user.get("point");
            int user_correct =(int) user.get("amount_right");            
            int user_incorrect =(int) user.get("amount_wrong");


            while(flag){
              Random aux = new Random();
              int a = aux.nextInt(question.size());       
              choice = question.get(a);
              if(!(Boolean)choice.get("see")){
                flag = false;
              }
            }
            statistics = Statistics.findFirst("question_id = ?", choice.get("id"));
            int correct = (int) statistics.get("amount_user_right");
            int incorrect = (int) statistics.get("amount_user_wrong");

            choice.set("see", true);
            choice.save();

            int id = (int)choice.get("id");

            LazyList<Option> options = Option.where("question_id = ?", id);
            List<String> list = new ArrayList<String>();
            for(Option o: options ){
              String option = "Su descripcion es: " + o.get("description");
              list.add(option);
            }

            LazyList<Option> answer = Option.where("question_id = ? and correct = ?", id, true);
            Option option_correct = answer.get(0);
            if(option_correct.get("description").equals(bodyParams.get("description"))){
              point = point + 1;
              correct = correct + 1;
              user_correct = user_correct + 1;
              statistics.set("amount_user_right", correct);
              user.set("point", point);
              user.set("amount_right", user_correct);
              user.save();
              statistics.save();
              return user.toJson(true);
            }
            incorrect = incorrect + 1;
            user_incorrect = user_incorrect + 1;
            statistics.set("amount_user_wrong", incorrect);
            user.set("amount_wrong", user_incorrect);
            user.save();
            statistics.save();
            
            res.type("application/json");
            return user.toJson(true);
          }else{ 
            
            res.type("application/json");
            return user.toJson(true);
        }
      }
      
      return "hola";     
    });


      post("/stats", (req, res) -> {
        
        Map<String, Object> bodyParams = new Gson().fromJson(req.body(), Map.class);

        LazyList<User> users = User.where("username = ?", bodyParams.get("username"));
        if(users.size() > 0){
          User user = users.get(0);
          res.type("application/json");
          
          return user.toJson(true);
        }else{
          
          return "Username no encontrado";
        }

      });


      post("/login", (req, res) -> {
        res.type("application/json");

        // if there is currentUser is because headers are correct, so we only
        // return the current user here
        return currentUser.toJson(true);
      });

    }
}