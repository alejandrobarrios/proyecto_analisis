package trivia;

import org.javalite.activejdbc.Base;
import org.javalite.activejdbc.DB;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;
import static spark.Spark.after;
import static spark.Spark.before;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.Base64;
import java.util.Arrays;
import java.util.ArrayList;

import org.junit.After;
import org.junit.Before;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

import trivia.User;
import spark.utils.IOUtils;

import spark.Spark;

import java.io.OutputStreamWriter;

import com.google.gson.Gson;

class QuestionParam
{
  String description;
  String category;
  Boolean see;
  ArrayList<OptionParam> options;

  public QuestionParam(String a, String b, Boolean c , ArrayList<OptionParam> d){
    this.description = a;
    this.category = b;
    this.see = c;
    this.options = d;
  }
}

class OptionParam
{
  String description;
  Boolean correct;

  public OptionParam(String a,Boolean b){
    this.description = a;
    this.correct = b;
  }

}

public class GameIntegrationTest {
    private static int PORT = 4567;
    private static String ADMIN_USERNAME = "janito";
    private static String ADMIN_PASSWORD = "123";

    @AfterClass
    public static void tearDown() {
        Spark.stop();
    }

    @After
    public void clear() {
    }


    @Before
    public void beforeTest() {
    }

    @BeforeClass
    public static void setup() {
        App.main(null);

        Spark.awaitInitialization();
        Base.open("com.mysql.jdbc.Driver", "jdbc:mysql://localhost:3306/trivia_dev", "root", "root");
        User u = new User();
        u.set("username", ADMIN_USERNAME);
        u.set("password", ADMIN_PASSWORD);
        u.set("name", "aleja");
        u.set("lastname", "bar");
        u.set("dni",45678);
        u.set("point",0);
        u.set("amount_right",0);
        u.set("amount_wrong",0);
        u.saveIt();
        Base.close();

    }
    @Test
    public void canPlay() {

      String opcion = "opcion 1";
      Boolean correct1 = true;
      OptionParam parametro = new OptionParam(opcion, correct1);

      String opcion2 = "opcion 2";
      Boolean correct2 = false;
      OptionParam parametros = new OptionParam(opcion2, correct2);

      
      String descripcion = "cuantas horas estamos en la uni?";
      String categoria = "anatomia";
      Boolean see = false;
      ArrayList<OptionParam> options = new ArrayList<OptionParam>();

      options.add(parametro);
      options.add(parametros);

      QuestionParam mapa = new QuestionParam(descripcion, categoria, see, options);
      
      UrlResponse respuesta = doRequeste("POST", "/questions", mapa);

      String username = "janito";
      String password = "123";

      Map<String, Object> parameter = new HashMap<String,Object>();
      parameter.put("username", username);

      UrlResponse respons = doRequest("POST", "/stats", parameter);
      Map<String, Object> gsonResponse = new Gson().fromJson(respons.body, Map.class);

      Double point = (Double)gsonResponse.get("point");
      Double correct = (Double)gsonResponse.get("amount_right");
      Double incorrect = (Double)gsonResponse.get("amount_wrong");


      String category = "anatomia";
      String description = "opcion 1";
      Map<String, Object> parameters = new HashMap<>();
      parameters.put("username", username);
      parameters.put("password", password);
      parameters.put("category", category);
      parameters.put("description", description);

      UrlResponse response = doRequest("POST", "/games", parameters);
      Map<String, Object> jsonResponse = new Gson().fromJson(response.body, Map.class);

      assertNotNull(response);
      assertNotNull(response.body);
      assertEquals(200, response.status);
      assertEquals(jsonResponse.get("point"), point + 1);
    }

    private static UrlResponse doRequest(String requestMethod, String path, Map body) {
        UrlResponse response = new UrlResponse();

        try {
            getResponse(requestMethod, path, body, response);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return response;
    }

    private static void getResponse(String requestMethod, String path, Map body, UrlResponse response)
            throws MalformedURLException, IOException, ProtocolException {
      URL url = new URL("http://localhost:" + PORT + path);

      // This is the point where the connection is opened.
      HttpURLConnection connection = (HttpURLConnection) url.openConnection();
      // Set User to get Authorized request
      String userCredentials = ADMIN_USERNAME + ":" + ADMIN_PASSWORD;
      String basicAuth = "Basic " + new String(
        Base64.getEncoder().encode(userCredentials.getBytes())
      );
      connection.setRequestProperty("Authorization", basicAuth);

      // set connection output to true (needs to be true since this request
      // is carrying an input (response) body.)
      connection.setDoOutput(true);

      // set connection verb to user
      connection.setRequestMethod(requestMethod);

      // write parameters into connection
      OutputStreamWriter writer = new OutputStreamWriter(connection.getOutputStream());
      writer.write(body.toString());
      writer.close();

      // Open communications link (network traffic occurs here).
      connection.connect();

      //  Retrieve the response body as an InputStream.
      String res = IOUtils.toString(connection.getInputStream());

      // Build the response to return
      response.body = res;
      response.status = connection.getResponseCode();
      response.headers = connection.getHeaderFields();
    }

    private static UrlResponse doRequeste(String requestMethod, String path, QuestionParam body) {
        UrlResponse response = new UrlResponse();

        try {
            getRespuesta(requestMethod, path, body, response);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return response;
    }

    private static void getRespuesta(String requestMethod, String path, QuestionParam body, UrlResponse response)
            throws MalformedURLException, IOException, ProtocolException {
      URL url = new URL("http://localhost:" + PORT + path);

      // This is the point where the connection is opened.
      HttpURLConnection connection = (HttpURLConnection) url.openConnection();
      // Set User to get Authorized request
      String userCredentials = ADMIN_USERNAME + ":" + ADMIN_PASSWORD;
      String basicAuth = "Basic " + new String(
        Base64.getEncoder().encode(userCredentials.getBytes())
      );
      connection.setRequestProperty("Authorization", basicAuth);

      // set connection output to true (needs to be true since this request
      // is carrying an input (response) body.)
      connection.setDoOutput(true);

      // set connection verb to user
      connection.setRequestMethod(requestMethod);

      // write parameters into connection
      OutputStreamWriter writer = new OutputStreamWriter(connection.getOutputStream());
      //writer.write(body.toString());
      //writer.close();

      // Open communications link (network traffic occurs here).
      connection.connect();

      //  Retrieve the response body as an InputStream.
      //String res = IOUtils.toString(connection.getInputStream());

      // Build the response to return
      //response.body = res;
      //response.status = connection.getResponseCode();
      //response.headers = connection.getHeaderFields();
    }


    // Represent a Response
    private static class UrlResponse {
      public Map<String, List<String>> headers;
      private String body;
      private int status;
    }
}