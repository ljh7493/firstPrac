package topia.com.prac.personalHistory.cont;

// test
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;

public interface PersonalHistoryCont {
	public HashMap<String, Object> userList(HttpServletRequest request);
	public String registerUser(HttpServletRequest request);
	public String registerUserUpdate(HttpServletRequest request);
	public int updateUser();
	public int deleteUser();
	public HashMap<String, Object> getRegisterData(HttpServletRequest request, HttpServletResponse response) throws JsonParseException, JsonMappingException, IOException;
}
