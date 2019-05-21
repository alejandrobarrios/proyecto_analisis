package trivia;

import org.javalite.activejdbc.Model;

public class User extends Model {
	static{
   		validatePresenceOf("username", "password", "dni","point","amount_right","amount_wrong");
 	}	
}
