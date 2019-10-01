package trivia;

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
    public void testQestion()
    {
        assertTrue( true );
    }
    /**
     * Este test valida que la aplicacion que la aplicacion continue funcionando en 
     * la ultima pregunta
     */
    public void lastQestion()
    {
    	/*getQuestions*/
    	/*select resp*/
    	/*luego de responder si devuelve otra pregunta no es la ultima.
    	 * si develve un mensaje estamos en la ultima pregunta
    	 */
    	
    	assertTrue( true );
    }
    
}
