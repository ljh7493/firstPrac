"use strict"; // 엄격한 문법 검사

//개인이력카드 작성 내용 데이터로 치환
var personalHistoryGetData = function(){
	var userDataObjArr = [];
	var userDataObjPlainText = "";
	
	$(".user-info-table1, .user-info-table2").find("input, select").each(function(){
		
		var nowLoopData = this;
		var nowLoopId = $(nowLoopData).attr("id")+"";
		var nowLoopValue = $(nowLoopData).val()+"";
		
		var nowDataPlainText = '"' + nowLoopId + '":"' + nowLoopValue + '"';
		
		if(nowLoopValue == ""){ // 해당 키에 내용이 없으면 전송 데이터에서 제외(루프는 진행)
			return true;
		}else{
			userDataObjArr.push(nowDataPlainText);
		}
		
	});
	
	userDataObjPlainText = "{" + userDataObjArr.join(",") + "}";
	
	
	//JSON parsing 하면 key(String) : value(array) 형태로 넘어가서
	//매퍼에서 변수 사용시 변수명 뒤에 [0] 붙혀야함
	var submitDataObj = JSON.parse(userDataObjPlainText);
	
	console.log(submitDataObj);
	
	return submitDataObj;
}

var ajaxRequestRegisterList = function(){
	
	var getData = [];
	
	$.ajax({
		url: "./personalHistory/returnRegisterUserList",
		type: "POST",
		dataType: "json",
		async: false, // 비동기 -> 동기
		success: function(data){
			getData = data;
		},
		error: function(){
			alert("error");
		},
		complete: function(data){
			getData = data.responseJSON;
		}
	});
	
	return getData;
};

// 개인 이력카드 저장
var personalHistoryRegisterAjaxSend = function(submitDataObj){
	
	var userIdxVal = $("#userIdx").val();
	
	var userIdxObj = {"userIdx":userIdxVal}; // 치환된 배열 데이터를 key를 줌
	
	var submitDataObj = $.extend( submitDataObj, userIdxObj); // 전송하기 위해 고정데이터와 유동데이터 합침
	
	var url = "";
	if(isEmpty(userIdxVal)){ // 새 작성을 저장하는 경우
		
		url = "./personalHistory/registerUser";
		
	}else{ // 기존 작성된 이력을 수정저장하려는 경우
		
		url = "./personalHistory/registerUserUpdate";
		
	}
	
	$.ajax({
		url: url,
		type: "POST",
		data: submitDataObj,
		dataType: "json",
		success: function(userIdx){
			
			$("#userIdx").val(userIdx);
			
			alert("작성한 내용이 저장되었습니다.");
			getRegisterList(); // 리스트 새로 로드 
			modeChange("UPDATE"); // 저장 후 상단 상태 변경
		},
		error: function(){
			alert("error");
		}
	});
	
}


/**
 * 행 추가
 * 
 * 여러 테이블에서 같이 사용하는 로직이기 때문에 기준이 되는 오브젝트를 받음
 */
var addRowBtnEve = function($eveObj){
	
	var btnStr = '<button style="display:none;" class="removeTrBtn">-</button>';
	
	var $tbodyObj = $eveObj.parent().prev().find("tbody");
	var firstRowText = "<tr>" + $tbodyObj.find("tr:first-child").html() + "</tr>";
	
	console.log(firstRowText);
	
	$tbodyObj.append(firstRowText);
	
	var $addTr = $tbodyObj.find("tr:last-child");
	
	$addTr.append(btnStr);
	
	flexibleTableTrEve(); // 추가된 삭제버튼에 이벤트 할당
	
	dataPickerInit();
}


//유동 테이블의 row 삭제 이벤트 재정의
var flexibleTableTrEve = function(){
	
	$(".removeTrBtn").unbind().click(function(){
		var $btnSelf = $(this);
		var $parentTr = $btnSelf.parent();
		var $parentTbody = $parentTr.parent();
		
		$parentTr.remove();
	});
	
	$(".flexibleTable").find("tbody").find("tr").unbind().hover(function(){
		var $trSelf = $(this);
		var $childRemoveBtn = $trSelf.find(".removeTrBtn");
		
		$childRemoveBtn.css("display","block");
	},function(){
		var $trSelf = $(this);
		var $childRemoveBtn = $trSelf.find(".removeTrBtn");
		
		$childRemoveBtn.css("display","none");
	});
	
}




/**
 * 유동 테이블 데이터 일괄 처리
 */
var flexibleTableGetData = function(){
	
	var dataPlainText = "[";
	
	$(".flexibleTable").find("tbody").find("tr").each(function(i){
		
		var $trSelf = $(this);
		var tbName = $trSelf.parent().parent().attr("tb"); 
		
		if(i != 0) dataPlainText += ",";
		var trDataText = "{";
		
		$trSelf.find("input, select").each(function(j){
			
			var $tdSelf = $(this);
			
			var key = $tdSelf.attr("class");
			var val = $tdSelf.val();
			
			if(j == 0) trDataText += '"tbName":"' + tbName + '"';
			
			if(val == "") return true; // 값이 비어있으면 굳이 만들지 않아도 되기때문에 다음 루프로 넘김
			
			trDataText += ",";
			trDataText += '"' + key + '":' + '"' + val + '"';
			
		});
		
		trDataText += "}";
		dataPlainText += trDataText;
		
	}); // tbody
	
	dataPlainText += "]";
	
	var flexibleDataObj = JSON.parse(dataPlainText);
	return flexibleDataObj;
};

var resetInput = function(){
	$("input, select").not("#userIdx").val("");
	
	$(".flexibleTable").find("tbody").find("tr:not(:first-child)").remove();
};




// 불러오기 버튼 눌렀을 시 팝업에 기존 등록 정보들 가져옴
var getRegisterList = function(){
	var $registerListTbody = $(".pop-register-list").find("tbody");
	
	$registerListTbody.html("");
	
	var resultData = ajaxRequestRegisterList();
	var resultLen = resultData.length;
	
	var listText = "";
	
	for(var i = 0; i < resultLen; i++){
		var trText = "<tr>";
		
		trText += "<td>" + (isEmpty(resultData[i].user_idx) == true?"":resultData[i].user_idx) + "</td>";
		trText += "<td>" + (isEmpty(resultData[i].user_name) == true?"":resultData[i].user_name) + "</td>";
		trText += "<td>" + (isEmpty(resultData[i].user_comp) == true?"":resultData[i].user_comp) + "</td>";
		trText += "<td>" + (isEmpty(resultData[i].user_dept) == true?"":resultData[i].user_dept) + "</td>";
		trText += "<td>" + (isEmpty(resultData[i].user_register_date) == true?"":resultData[i].user_register_date) + "</td>";
		
		trText += "<tr>";
	
		
		listText += trText;
	}
	
	console.log(listText);
	$registerListTbody.append(listText);
	
	
	// 리스트가 재 로드 된 후 추가된 obj에 이벤트 재 정의
	$registerListTbody.find("tr").unbind().dblclick(function(){
		
		var conResult = confirm("작성 중이던 내용이 있다면 저장 후 불러오십시오.\n헤당 정보를 가져오시겠습니까?");
		
		if(!conResult) return false;
		
		var $eveTrObj = $(this);
		var userIdx = $(this).find("td:first-child").text();
		
		var registerData = getRegisterData(userIdx);
	});
}

var getRegisterData = function(userIdx){
	var getData;
	
	// 테이블명 가져오기
	var tbNames = [];
	$(".flexibleTable").each(function(){
		var tbName = $(this).attr("tb");
		tbNames.push(tbName);
	});
	
	var sendData = {
			"userIdx" : userIdx
			, "tbNames" : JSON.stringify(tbNames)
	};
	
	$.ajax({
		url: "./personalHistory/getRegisterData",
		type: "POST",
		data: sendData,
		dataType: "json",
		async: false, // 비동기 -> 동기
		success: function(data){
			getData = data;
			
			console.log(getData);
			
		},
		error: function(){
			alert("error");
		}
	});
	
	
	// 가져온 데이터 폼에 뿌려주기
	
	// 고정 데이터폼
	var fixedData = getData.fixedData[0];
	for (var key in fixedData) {
		var val = eval("(fixedData." + key + ")");
		
		$("#"+(eval("convertData."+key)+"")).val(val);
		
	}
	
	// 유동 데이터폼
	$(".flexibleTable").each(function(){
		
		var $loopTable = $(this);
		var $loopTbody = $loopTable.find("tbody"); 
		var tbName = $loopTable.attr("tb");
		
		var $tbodyFirstTr = $loopTbody.find("tr:first-child");
		var trText = $tbodyFirstTr.html();
		
		
		var nowFlexibleData = eval("getData." + tbName);
		var nowFlexibleDataLen = nowFlexibleData.length; 
		
		$loopTbody.find("tr").remove(); // tr 요소들 전부 삭제 
		
		//form 복사하여 추가
		for(var i = 0; i < nowFlexibleDataLen; i++){
			$loopTbody.append("<tr>" + trText + "</tr>");
		}
		
		for(var i = 0; i < nowFlexibleDataLen; i++){
			var nowData = nowFlexibleData[i];
			for (var key in nowData) {
				var val = eval("(nowData." + key + ")");
				
				$loopTbody.find("tr").eq(i).find("."+(eval("convertData."+key)+"")).val(val);
				
			}
		}
		
		
	});
	
	var btnStr = '<button style="display:none;" class="removeTrBtn">-</button>';
	
	var $flexibleTrs = $(".flexibleTable").find("tbody").find("tr").not(":first-child");
	$flexibleTrs.append(btnStr);
	
	flexibleTableTrEve(); // 추가된 삭제버튼에 이벤트 할당
	modeChange("UPDATE"); // 불러오기 후 상단 상태 변경
};



var convertData = {
		"user_address": "userAddress"
		, "user_army_serv": "userArmyServ"
		, "user_army_serv_period": "userArmyServPeriod"
		, "user_comp": "userComp"
		, "user_comp_enterdate": "userCompEnterdate"
		, "user_dept": "userDept"
		, "user_email": "userEmail"
		, "user_idx": "userIdx"
		, "user_marital_status": "userMaritalStatus"
		, "user_name": "userName"
		, "user_register_date": "userRegisterDate"
		, "user_army_serv_enter": "userArmyServEnter"
		, "user_army_serv_leave": "userArmyServLeave"
		, "user_sex": "userSex"
		, "user_social_secunum": "userSocialSecunum"
		, "user_spot": "userSpot"
		, "user_telnum_wired": "userTelnumWired"
		, "user_telnum_wireless": "userTelnumWireless"
		, "edu_school_name": "eduSchoolName"
		, "edu_status": "eduStatus"
		, "edu_year": "eduYear"
		, "edu_month": "eduMonth"
		, "qualifi_name": "qualifiName"
		, "qualifi_getdate": "qualifiGetdate"
		, "carreer_comp_name": "carreerCompName"
		, "carreer_enterdate": "carreerEnterdate"
		, "carreer_leavedate": "carreerLeavedate"
		, "carreer_spot": "carreerSpot"
		, "carreer_responsib": "carreerResponsib"
		, "training_name": "trainingName"
		, "training_startdate": "trainingStratdate"
		, "training_enddate": "trainingEnddate"
		, "training_agency": "trainingAgency"
		, "licen_name": "licenName"
		, "licen_skill_level": "licenSkillLevel"
		, "skill_project_name": "skillProjectName"
		, "skill_startdate": "skillStartdate"
		, "skill_enddate": "skillEnddate"
		, "skill_customer_comp": "skillCustomerComp"
		, "skill_work_comp": "skillWorkComp"
		, "skill_industry": "skillIndustry"
		, "skill_applied": "skillApplied"
		, "skill_role": "skillRole"
		, "skill_model": "skillModel"
		, "skill_os": "skillOS"
		, "skill_lang": "skillLang"
		, "skill_dbms": "skillDBMS"
		, "skill_tool": "skillTool"
		, "skill_comm": "skillComm"
		, "skill_etc": "skillETC"
}


var modeChange = function(mode){
	var $topHeaderStatus = $(".top-header-pannel").find("h5");
	var userIdx = $("#userIdx").val();
	
	if(mode == "NEW"){
		$topHeaderStatus.text("※ 새 이력 작성");
		$("#userIdx").val("");
	}else if(mode == "UPDATE"){
		
		$topHeaderStatus.text("※ 등록번호 : " + userIdx + " (수정)");
	}
}