package trivia;


import org.javalite.activejdbc.LazyList;

import junit.framework.Test;
import junit.framework.TestCase;
import junit.framework.TestSuite;

/**
 * Unit test for simple App.
 */
public class AppTest 
    extends TestCase
{
    /**
     * Create the test case
     *
     * @param testName name of the test case
     */
    public AppTest( String testName )
    {
        super( testName );
    }

    /**
     * @return the suite of tests being tested
     */
    public static Test suite()
    {
        return new TestSuite( AppTest.class );
    }

    /**
     * Rigourous Test :-)
     */
    public void testApp()
    {
        assertTrue( true );
    }
    /**
     * Este test genera una nueva pregunta y valida que se registren
     * las respuestas y las estadisticas de la misma
     */
    public void testQuestion()
    {
		String description = "Test";
		String category = "prueba";
		Boolean see = false;
		ArrayList<OptionParam> opciones;
		
		opciones = [{"description": "Hungria", "correct": false}, 
		            {"description": "Holanda", "correct": false},
		            {"description": "España", "correct": true},
		            {"description": "Italia", "correct": false}];
    	
   	
		Question question = new Question();
		question.set("description", description);
		question.set("category", category);
		question.set("see", see);
		
		for(OptionParam item: opciones) {
			Option option = new Option();
			option.set("description", item.description).set("correct", item.correct);
			question.add(option);
		}

		
		question.saveIt();

		LazyList<Question> question = Question.where("category = ?", "prueba" );
		Question auxiliar = question.get(0);
		
		assertEquals(description, auxiliar.getString("description"));
        
    }
    /**
     * Este test valida que que la aplicacion continue funcionando en 
     * la ultima pregunta de la categoria test
     */
    public void lastQuestion()
    {
    	Map<String, Object> parameters = new HashMap<>();
    	
		LazyList<Question> question = Question.where("category = ? and see = ?", "test", false);
		
		if question.isEmpty(){
			assertTrue( false );
		}else {
			if question.size() == 1 {
				assertTrue( true );
			}else {
				assertTrue( false );
			}
		}
    }
    
}
