import trivia.Question;

import org.javalite.activejdbc.Base;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class QuestionTest {
  @Before
  public void before(){
      Base.open("com.mysql.jdbc.Driver", "jdbc:mysql://localhost/trivia_test", "root", "root");
      System.out.println("QuestionTest setup");
      Base.openTransaction();
  }

  @After
  public void after(){
      System.out.println("QuestionTest tearDown");
      Base.rollbackTransaction();
      Base.close();
  }

  @Test
  public void validatePresenceOfUsername() {
    Question q = new Question();
    q.set("description","¿cuantas patas tiene una vaca?");
    q.set("category", "anatomy");
    q.set("see",false);
    assertEquals("question can't be blank", q.isValid(), true);
  }
}
