package trivia;

import trivia.User;

import org.javalite.activejdbc.Base;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class UserTest {
  @Before
  public void before(){
      Base.open("com.mysql.jdbc.Driver", "jdbc:mysql://localhost/trivia_test", "root", "root");
      System.out.println("UserTest setup");
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
	  User user = new User();
      user.set("username", "maxi");
      user.set("password", "maxi123");
      user.set("name", "maximiliano");
      user.set("lastname","gaspero");
      user.set("dni", 89);
      user.set("point", 0);
      user.set("amount_right", 0);
      user.set("amount_wrong",0);
      
    assertEquals("username can't be blank", user.isValid(), true);
  }
}
