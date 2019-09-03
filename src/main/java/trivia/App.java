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
	static int identificador;
	public static void main( String[] args ){ 
		before((request, response) -> {
			if (Base.hasConnection()) {
				Base.close();
			}
			if (!Base.hasConnection())
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

		//guarda en la base de datos los distintos parametros de usuario que se le pasaron
		post("/users", (req, res) -> {

			Map<String, Object> bodyParams = new Gson().fromJson(req.body(), Map.class);
			User user = new User();
			user.set("username", bodyParams.get("username"));
			user.set("password", bodyParams.get("password"));
			user.set("name", bodyParams.get("name"));
			user.set("lastname", bodyParams.get("lastname"));
			user.set("dni", bodyParams.get("dni"));
			user.set("admin", false);
			user.set("point", 0);
			user.set("amount_right", 0);
			user.set("amount_wrong", 0);

			user.saveIt();

			res.type("application/json");

			return user.toJson(true);
		});

		//guarda en la base de datos los distintos parametros de preguntas que se le pasaron
		//asocia una lista de respuestas a una pregunta
		//crea las estadisticas de dicha pregunta, para saber porcentaje de alumos que la respondiron correctamente o no.
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

		//get all users load
		get("/allusers", (req, res) -> {
			LazyList<User> user = User.findAll();
			List<String> lista = new ArrayList<String>();
			for(User u: user ){
				String usuario = "Su username es: " + u.get("username") + ", su dni es: " + u.get("password");
				lista.add(usuario);
			}
			return lista;
		});

		//get all questions load of a given category
		get("/catquestions", (req, res) -> {
			LazyList<Question> question = Question.findAll();
			List<String> lista = new ArrayList<String>();
			for(Question q: question ){
				String pregunta = "Su categoria es: " + q.get("category") + ", su descripcion es: " + q.get("description");
				lista.add(pregunta);
			}
			return lista;
		});   

		//return a question whith his options
		post("/getquestions", (req, res) -> {

			Map<String, Object> bodyParams = new Gson().fromJson(req.body(), Map.class);
			Boolean flag = false;
			LazyList<Question> question = Question.where("category = ?", bodyParams.get("category"));
			Question choice = new Question();

			for(int i = 0;i < question.size() || flag ){
				Random aux = new Random();
				System.out.println(question.size());
				int a = aux.nextInt(question.size());
				choice = question.get(a);
				
				if(!(Boolean)choice.get("see")){
					flag = true;
				}
			}
			identificador = (int)choice.get("id");
			choice.set("see", true);
			choice.save();
			String resp= "{\"Question\":"+ choice.toJson(true,"description");
			LazyList<Option> option = Option.where("question_id = ?", identificador);
			List<String> lista = new ArrayList<String>();
			int i=1;
			for(Option o : option){
				resp= resp+", \"Opcion"+i+"\" : "+o.toJson(true,"description");
				i++;
			}
			resp=resp+"}";
			res.type("application/json");
			return resp;
		});

		//obtiene respuesta del usuario y corrobora si es la correcta, luego actualiza las estadisticas
		post("/getanswer", (req, res) -> {

			Map<String, Object> bodyParams = new Gson().fromJson(req.body(), Map.class);
			Statistics statistics = new Statistics();
			User user = currentUser;
			LazyList<Question> quest = Question.where("id = ?", identificador);
			Question choice = quest.get(0);

			LazyList<Option> answer = Option.where("question_id = ? and correct = ?", identificador, true);
			Option option_correct = answer.get(0);

			int point =(int) user.get("point");
			int user_correct =(int) user.get("amount_right");
			int user_incorrect =(int) user.get("amount_wrong");

			statistics = Statistics.findFirst("question_id = ?", choice.get("id"));
			int correct = (int) statistics.get("amount_user_right");
			int incorrect = (int) statistics.get("amount_user_wrong");
			if(option_correct.get("description").equals(bodyParams.get("description"))){
				point = point + 1;
				correct = correct + 1;
				user_correct = user_correct + 1;
				statistics.set("amount_user_right", correct);
				user.set("point", point);
				user.set("amount_right", user_correct);
				user.save();
				statistics.save();
				String resp = "{\"Point"+"\" : "+user.toJson(true,"point") + ", \"Correctas\" : "+option_correct.toJson(true,"description");
				resp=resp+"}";
				res.type("application/json");
				return resp ;
			}
			incorrect = incorrect + 1;
			user_incorrect = user_incorrect + 1;
			statistics.set("amount_user_wrong", incorrect);
			user.set("amount_wrong", user_incorrect);
			user.save();
			statistics.save();
			String resp = "{\"Point"+"\" : "+ user.toJson(true,"point") + ", \"Correctas"+"\" : "+ option_correct.toJson(true,"description"); 
			resp=resp+"}";
			res.type("application/json");
			return resp ;
		});

		//por ahora no se utiliza
		get("/users", (req, res) -> {//verfication that a user is load
			Map<String, Object> bodyParams = new Gson().fromJson(req.body(), Map.class);
			LazyList<User> users = User.where("username = ?", bodyParams.get("username"));

			if(users.size() > 0){
				User user = users.get(0);
				String pass = (String)bodyParams.get("password");
				if(user.get("password").equals(pass)){
					currentUser = user;
					return "Usuario logueado";
				}else{
					return "Password incorrecta.";
				}
			}
			return "Username incorrecto";
		});
		//delete an user
		delete("/users", (req, res) -> {

			Map<String, Object> bodyParams = new Gson().fromJson(req.body(), Map.class);

			User user = User.findFirst("username = ?", bodyParams.get("username"));
			user.delete();
			return "borrado";
		});

		//delete an question
		delete("/questions", (req, res) -> {

			Map<String, Object> bodyParams = new Gson().fromJson(req.body(), Map.class);
			Question question = Question.findFirst("id = ?", bodyParams.get("id"));
			question.delete();
			return "borrada";
		});

		//modify a password of a user with his username
		put("/users", (req,res) -> {

			Map<String, Object> bodyParams = new Gson().fromJson(req.body(), Map.class);
			User user = User.findFirst("username = ?", bodyParams.get("username"));
			user.set("password", bodyParams.get("password"));
			user.saveIt();

			res.type("application/json");
			return user.toJson(true);
		});

		//modify the description of a question with his id
		put("/questions", (req,res) -> {

			Map<String, Object> bodyParams = new Gson().fromJson(req.body(), Map.class);
			Question question = Question.findFirst("id = ?", bodyParams.get("id"));
			question.set("description", bodyParams.get("description"));
			question.saveIt();

			res.type("application/json");
			return question.toJson(true);
		});

		//envia el puntaje de un usuario
		post("/stats", (req, res) -> {
			User user = currentUser;
			res.type("application/json");

			String stat= "{\"Point"+"\" : "+user.toJson(true,"point");
			stat=stat+"}";
			return stat;
		});

		//envia las estadisticas de un usuario
		post("/allstats", (req, res) -> {

			User user = currentUser;
			res.type("application/json");

			String stat= "{\"Point"+"\" : "+user.toJson(true,"point") + ", \"Correctas\" : "+user.toJson(true,"amount_right")+ ", \"Incorrectas\" : "+user.toJson(true,"amount_wrong");
			stat=stat+"}";
			return stat;
		});

		//envia los diez usuarios con los mejores puntajes
		post("/allscore", (req, res) -> {

			LazyList<User> users = User.findAll().limit(10).orderBy("point desc");
			int i = 2;
			User user = users.get(0);
			String resp= "{\"Point1\":"+ user.toJson(true,"point") + ", \"User1\" : "+ user.toJson(true,"username") ;
			users.remove(0);
			for(User o : users){
				resp = resp +", \"Point"+i+"\" : " + o.toJson(true,"point") + ", \"User"+i+"\" : "+o.toJson(true,"username");
				i++;
			};
			resp=resp+"}";
			res.type("application/json");
			return resp;
		});

		post("/login", (req, res) -> {
			res.type("application/json");
			// if there is currentUser is because headers are correct, so we only
			// return the current user here
			return currentUser.toJson(true);
		});
	}
}