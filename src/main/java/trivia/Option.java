package trivia;

import org.javalite.activejdbc.Model;

public class Option extends Model {
	static{
   validatePresenceOf("description", "correct" , "question_id" );
 }	

}