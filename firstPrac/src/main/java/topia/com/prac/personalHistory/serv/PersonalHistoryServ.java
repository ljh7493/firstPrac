package topia.com.prac.personalHistory.serv;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;

import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;

public interface PersonalHistoryServ {
	public ArrayList<Object> returnRegisterUserList();
	public int registerUser(Object intputdata);
	public int registerUserUpdate(Object intputdata);
	public HashMap<String, Object> getRegisterData(HashMap<String, Object> userIdx) throws JsonParseException, JsonMappingException, IOException;
}
