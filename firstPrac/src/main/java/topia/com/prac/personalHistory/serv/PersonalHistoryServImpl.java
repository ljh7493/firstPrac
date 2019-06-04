package topia.com.prac.personalHistory.serv;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;

import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import topia.com.prac.personalHistory.dao.AbstractDAO;

@Service
public class PersonalHistoryServImpl implements PersonalHistoryServ{
	
	@Autowired
	AbstractDAO dbCon;
	
	@Override
	public ArrayList<Object> returnRegisterUserList() {
		ArrayList<Object> list = null;
		
		try {
			list = (ArrayList<Object>)dbCon.selectList("personalHistory.returnRegisterUserList");
		} catch (Exception e) {
			System.out.println("ERROR PersonalHistoryDAOImpl : " + e);
		}
		
		return list;
	}

	@Override
	public int registerUser(Object inputdata) {
		
		int statusNum = 0;
		
		try {
			statusNum = (Integer)dbCon.insert("personalHistory.registerUser", inputdata);
			
			HashMap<String,Object> map = (HashMap<String,Object>)inputdata;
			String[] strList = (String[])map.get("flexibleData");
			String listJsonStr = strList[0];
			
			String userIdx = (String)map.get("user_idx");
			
			ArrayList<HashMap<String, Object>> list = new ArrayList<HashMap<String,Object>>();
			ObjectMapper mapper = new ObjectMapper();
			list=mapper.readValue(listJsonStr,ArrayList.class);
			
			Iterator it = list.iterator();
			while(it.hasNext()){
				
				HashMap<String,Object> nowLoopObj = (HashMap<String,Object>)it.next();
				
				
				nowLoopObj.put("userIdx", userIdx);
				
				System.out.println("nowLoopObj : ");
				System.out.println(nowLoopObj);
				
				statusNum = (Integer)dbCon.insert("personalHistory.insertUserFlexibleData", nowLoopObj);
				
			}
			
		} catch (Exception e) {
			System.out.println("ERROR registerUserDAOImpl : " + e);
		}
		
		return statusNum;
	}
	
	
	@Override
	public int registerUserUpdate(Object inputdata) {
		
		int statusNum = 0;
		
		System.out.println("inputdata");
		System.out.println(inputdata);		
		
		try {
			statusNum = (Integer)dbCon.update("personalHistory.registerUserUpdate", inputdata);
			
			HashMap<String,Object> map = (HashMap<String,Object>)inputdata;
			String[] strList = (String[])map.get("flexibleData");
			String listJsonStr = strList[0];
			
			String[] userIdxArr = inputdata.get("userIdx");
			
			ArrayList<HashMap<String, Object>> list = new ArrayList<HashMap<String,Object>>();
			ObjectMapper mapper = new ObjectMapper();
			list=mapper.readValue(listJsonStr,ArrayList.class);	
			
			dbCon.delete("personalHistory.deleteCareerData", inputdata);
			dbCon.delete("personalHistory.deleteEduData", inputdata);
			dbCon.delete("personalHistory.deleteLicenData", inputdata);
			dbCon.delete("personalHistory.deleteQualifiData", inputdata);
			dbCon.delete("personalHistory.deleteSkillData", inputdata);
			dbCon.delete("personalHistory.deleteTrainingData", inputdata);
			
			
			Iterator it = list.iterator();
			while(it.hasNext()){
				
				HashMap<String,Object> nowLoopObj = (HashMap<String,Object>)it.next();
				
				System.out.println("nowLoopObj : ");
				System.out.println(nowLoopObj);
				
				nowLoopObj.put("userIdx", userIdx);
				
				statusNum = (Integer)dbCon.insert("personalHistory.insertUserFlexibleData", nowLoopObj);
				
			}
			
		} catch (Exception e) {
			System.out.println("ERROR registerUserDAOImpl : " + e);
		}
		
		return statusNum;
	}

	@SuppressWarnings("unchecked")
	@Override
	public HashMap<String, Object> getRegisterData(HashMap<String, Object> reqMap) throws JsonParseException, JsonMappingException, IOException {
		HashMap<String, Object> resMap = new HashMap<String, Object>(); 
		
		
		String[] strList = (String[])reqMap.get("tbNames");
		String listJsonStr = strList[0];
		String[] userIdxList = (String[])reqMap.get("userIdx");
		String userIdx = userIdxList[0];
		
		ArrayList<HashMap<String, Object>> list = new ArrayList<HashMap<String,Object>>();
		ObjectMapper mapper = new ObjectMapper();
		list = mapper.readValue(listJsonStr,ArrayList.class);
		
		
		//---------------------------------------- 고정 컬럼 데이터 처리
		HashMap<String, Object> fixedMap = new HashMap<String, Object>();
		
		fixedMap.put("userIdx", userIdx);
		
		ArrayList<Object> arr = (ArrayList<Object>)dbCon.selectList("personalHistory.getRegisterData", fixedMap);
		resMap.put("fixedData", arr);
		
		
		Iterator it = list.iterator();
		while(it.hasNext()){
			String tbName = (String)it.next();
			
			System.out.println(tbName);
			
			HashMap<String, Object> iterMap = new HashMap<String, Object>();
			iterMap.put("tbName", tbName);
			iterMap.put("userIdx", userIdx);
			
			resMap.put(tbName, dbCon.selectList("personalHistory.getRegisterFlexibleData", iterMap));
		}
		
		
		return resMap;
	}
	
}
