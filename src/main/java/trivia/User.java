package trivia;

import org.javalite.activejdbc.Model;

public class User extends Model {
	static{
   		validatePresenceOf("username", "password", "dni","name","lastname");
 	}


 	public static User searchUserByUsername (String name) {
		User user = User.findFirst("username = ?", name);

		return user;
	}

}
