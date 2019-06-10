"use strict"; // 엄격한 문법 검사

// 페이지 로드시 바로 실행
$(window).on("load",function(){
	
	btnEve(); // 버튼이벤트
	
	commonEve(); // 기타 이벤트
	
});


// 버튼 이벤트
var btnEve = function(){
	
	// 저장버튼 클릭시 이벤트 발생
	$(".personalHistorySaveBtn").unbind().click(function(){
		
		var check = regexAndEmptyCheck(); // 유저 이름이 비어있는지? 비어있으면 메세지로 알리고 boolean return
		
		if(check) { // 유저 이름이 비어있지 않으면 로직 수행
			var personalHistoryData = personalHistoryGetData(); // 개인이력카드 작성 내용 데이터로 치환
			
			var flexibleData = flexibleTableGetData(); // 하단의 유동적인 내용 데이터로 치환
			
			flexibleData = {"flexibleData":JSON.stringify(flexibleData)}; // 치환된 배열 데이터를 key를 줌
			
			var submitDataObj = $.extend( personalHistoryData, flexibleData); // 전송하기 위해 고정데이터와 유동데이터 합침
			
			personalHistoryRegisterAjaxSend(submitDataObj); // 개인 이력카드 저장
			
			modeChange("UPDATE"); // 저장 후 상단 상태 변경
			
			console.log(submitDataObj);
		}
		
	});
	
	// 초기화 버튼
	$(".personalHistoryResetBtn").unbind().click(function(){
		
		var result = confirm("내용을 초기화 하시겠습니까?");
		
		if(result) resetInput(); // 내용 비워줌
		
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
			
			userListPagingView(1);
			
		}
		
	});
	
	
	// 새 이력 작성버튼
	// 초기화랑 다른점은 input #userIdx도 비움
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
	
<<<<<<< HEAD
	
	// 불러오기창 검색버튼
	$("#userListSearchBtn").click(function(){
		userListPagingView(parseInt($("#userInfoPageNo").val()));
	});	
	
=======
>>>>>>> d527b2c5ee681457cdac68ab1f772bd89096691a
	$("#personalZipcodeSearchBtn").unbind().click(function() {
		daum.postcode.load(function(){
	        new daum.Postcode({
	            oncomplete: function(data) {
	            	// 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

	                // 각 주소의 노출 규칙에 따라 주소를 조합한다.
	                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
	                var addr = ''; // 주소 변수

	                //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
	                if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
	                    addr = data.roadAddress;
	                } else { // 사용자가 지번 주소를 선택했을 경우(J)
	                    addr = data.jibunAddress;
	                }

	                // 우편번호와 주소 정보를 해당 필드에 넣는다.
	                document.getElementById('userZipcode').value = data.zonecode;
	                document.getElementById("userAddress").value = addr;
//	                document.getElementById("userAddress").value += ", ";
	                
//	                // 커서를 상세주소 필드로 이동한다.
	                document.getElementById("userAddress").focus();
//	                alert("상세 주소를 입력해 주세요.")
	            }
	        }).open();
	    });
	});
<<<<<<< HEAD
	
=======
>>>>>>> d527b2c5ee681457cdac68ab1f772bd89096691a
};




var commonEve = function(){
	
	$("#drag-ele1").draggable();
	
};


var makeTrAppendRemoveBtn = function(){
	
	var btnStr = '<button style="display:none;" class="removeTrBtn">-</button>';
	
	$(".flexibleTable").find("tr").append(btnStr);
	
};