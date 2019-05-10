package trivia;

import trivia.User;

import org.javalite.activejdbc.Base;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class OptionTest {
  @Before
  public void before(){
      Base.open("com.mysql.jdbc.Driver", "jdbc:mysql://localhost/trivia_test", "root", "root");
      System.out.println("OptionTest setup");
      Base.openTransaction();
  }

  @After
  public void after(){
      System.out.println("UserTest tearDown");
      Base.rollbackTransaction();
      Base.close();
  }

  @Test
  public void validatePresenceOfUsername() {
	  Option option = new Option();
      option.set("description", "Cuatro");
      option.set("correct", true);
      option.set("question_id", "1");
         
    assertEquals("username can't be blank", option.isValid(), true);
  }
}
