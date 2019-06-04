"use strict"; // 엄격한 문법 검사

// 페이지 로드시 바로 실행
$(window).on("load",function(){
	
	btnEve(); // 버튼이벤트
	
	commonEve(); // 기타 이벤트
	
});


// 버튼 이벤트
var btnEve = function(){
	
	//저장버튼 클릭시 이벤트 발생
	$(".personalHistorySaveBtn").unbind().click(function(){
		
		var userNameEmpty = isUserNameEmpty();
		
		if(userNameEmpty) {
			
		} else {			
			
			var personalHistoryData = personalHistoryGetData(); // 개인이력카드 작성 내용 데이터로 치환
			
			var flexibleData = flexibleTableGetData(); // 하단의 유동적인 내용 데이터로 치환
			
			flexibleData = {"flexibleData":JSON.stringify(flexibleData)}; // 치환된 배열 데이터를 key를 줌
			
			var submitDataObj = $.extend( personalHistoryData, flexibleData); // 전송하기 위해 고정데이터와 유동데이터 합침
			
			personalHistoryRegisterAjaxSend(submitDataObj); // 개인 이력카드 저장
			
			modeChange("UPDATE"); // 저장 후 상단 상태 변경
			
			console.log(submitDataObj);
		}
		
	});
	
	
	$(".personalHistoryResetBtn").unbind().click(function(){
		
		var result = confirm("내용을 초기화 하시겠습니까?");
		
		if(result) resetInput();
		
	});
	
	
	
	// 테이블 행 추가버튼
	$(".addRowBtn").unbind().click(function(){
		
		var $eveObj = $(this); // 이벤트 발생 객체
		
		addRowBtnEve($eveObj); // 행 추가
		
	});
	
	
	// 불러오기 버튼 클릭시 리스트창 켜고 끄기
	$(".personalHistoryListBtn").click(function(){
		
		var $listPannel = $(".pop-user-register-pannel");
		var listPannelVisible = $listPannel.is(":visible");
	
		if(listPannelVisible){
			$listPannel.css("display","none");
			
		}else{
			$listPannel.css("display","block");
			
			getRegisterList();
			
		}
		
	});
	
	
	$(".newHistoryCreateBtn").click(function(){
		
		var result = confirm("새 이력을 작성하시겠습니까?");
		
		if(result){
			resetInput(); // 리셋
			modeChange("NEW"); // 작성모드 변경
		}
		
	});
	
	
	// 불러오기 등록 정보 최소화 버튼
	$(".pop-user-top-btn-pannel").click(function(){
		
		var $listPannel = $(".pop-user-register-pannel");
		$listPannel.css("display","none");
		
	});
	
	
};


var commonEve = function(){
	
	dragElement(document.getElementById("drag-ele1")); // 저장한 리스트 팝업 창 드래그 허용
	
};


var makeTrAppendRemoveBtn = function(){
	
	var btnStr = '<button style="display:none;" class="removeTrBtn">-</button>';
	
	$(".flexibleTable").find("tr").append(btnStr);
	
};