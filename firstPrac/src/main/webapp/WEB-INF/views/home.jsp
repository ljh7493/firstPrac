<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>

<html>
<head>

	<script src="./resources/compnent/jquery-3.3.1.min.js"></script>
	
	<script src="./resources/js/util/util.js"></script>
	
	<script src="./resources/js/personalHistory/personalHistory.js"></script>
	<script src="./resources/js/personalHistory/personalHistoryFunc.js"></script>
	
	<link rel="stylesheet" type="text/css" href="./resources/css/personalHistory/personalHistory.css">
	
	<title>Home</title>
</head>
<body>

	<%-- 새 작성건의 경우 해당 인풋값은 비어있고 수정 및 조회건은 들어감 --%>
	<div>
		<input id="userIdx" type="hidden">
	</div>

	<div class="user-info-list-pannel">
		<div class="personal-history-title-pannel">
			<h3>개 인 이 력 카 드</h3>
		</div>
		
		<div class="top-header-pannel">
			
			<div class="status-display-pannel">
				<h5>※ 새 이력 작성</h5>
			</div>
			
			<div class="function-btn-pannel">
				<button class="personalHistoryListBtn">
					불러오기
				</button>
				<button class="newHistoryCreateBtn">
					새로작성
				</button>
				<button class="personalHistoryResetBtn">
					초기화
				</button>
				<button class="personalHistorySaveBtn">
					저장
				</button>
			</div>
		</div>
		
		
		<table class="user-info-table1">
		
			<tbody>
				<tr>
					<td>성명</td>
					<td><input type="text" id="userName"></td>
					<td>주민등록번호</td>
					<td colspan="3"><input type="text" id="userSocialSecunum"></td>
					<td>성별</td>
					<td><input type="text" id="userSex"></td>
				</tr>
				
				<tr>
					<td>소속회사</td>
					<td colspan="5"><input type="text" id="userComp"></td>
					<td>입사일</td>
					<td><input type="date"id="userCompEnterdate"></td>
				</tr>
				
				<tr>
					<td>부서</td>
					<td><input type="text" id="userDept"></td>
					<td>직위</td>
					<td><input type="text" id="userSpot"></td>
					<td>병역</td>
					<td><input type="text" id="userArmyServ"></td>
					<td>결혼</td>
					<td><input type="text" id="userMaritalStatus"></td>
				</tr>
				
				<tr>
					<td>병역 입대일<br>~ 제대일</td>
					<td colspan="2"><input type="date" id="userArmyServEnter"></td>
					<td> ~ </td>
					<td colspan="2"><input type="date" id="userArmyServLeave"></td>
					<td>역종/병과</td>
					<td><input type="text" id="userArmyServPeriod"></td>
				</tr>
			</tbody>
			
		</table>
		
		
		
		
		
		
		
		<table class="user-info-table2">

			<tbody>
				<tr>
					<td>전화</td>
					<td><input type="text" placeholder=" (유선)" id="userTelnumWired"></td>
					<td><input type="text" placeholder=" (무선)" id="userTelnumWireless"></td>
				</tr>
				
				<tr>
					<td>E-Mail</td>
					<td colspan="2"><input type="text" id="userEmail"></td>
				</tr>
				
				<tr>
					<td>주소</td>
					<td colspan="2"><input type="text" id="userAddress"></td>
				</tr>
			</tbody>
			
		</table>
		
		
		
		
		
		
		
		
		<%-- 학력 / 자격증 --%>
		<div class="edu-and-qualifi-pannel">
			<div class="edu-table-pannel">
				<table class="edu-table flexibleTable" tb="edu">
				
					<tbody>
						<tr>
							<td><input type="text" placeholder=" (학교명)" class="eduSchoolName"></td>
							<td>
								<select class="eduStatus">
									<option value="">선택없음</option>
									<option value="입학">입학</option>
									<option value="재학">재학</option>
									<option value="졸업">졸업</option>
									<option value="졸업예정">졸업예정</option>
								</select>
							</td>
							<td><input type="text" placeholder=" (0000)" class="eduYear"></td>
							<td>년</td>
							<td><input type="text" placeholder=" (00)" class="eduMonth"></td>
							<td>월</td>
						</tr>
					</tbody>
					
				</table>
				
				<div class="add-row-btn-pannel">
					<button class="add-row-btn addRowBtn">+</button>
				</div>
				
			</div>
			
			<div class="qualifi-table-pannel">
				<table class="qualifi-table flexibleTable" tb="qualifi">
				
					<thead>
						<tr>
							<td>
								자격증명
							</td>
							<td>
								취득일
							</td>
						</tr>
					</thead>
					
					<tbody>
						<tr>
							<td><input type="text" class="qualifiName"></td>
							<td><input type="date"class="qualifiGetdate"></td>
						</tr>
					</tbody>
					
				</table>
				
				<div class="add-row-btn-pannel">
					<button class="add-row-btn addRowBtn">+</button>
				</div>
				
			</div>
		</div>






		<div class="clear-pannel"></div>
		
		
		
		
		
		<div class="career-info-pannel">
			<table class="career-info flexibleTable" tb="career">
				<thead>
					<tr>
						<td rowspan="2">회사명</td>
						<td colspan="2">기간(yyyy.mm ~ yyyy.mm)</td>
						<td rowspan="2">직위</td>
						<td rowspan="2">담당업무</td>
					</tr>
					<tr>
						<td>시작일</td>
						<td>종료일</td>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td><input type="text" class="carreerCompName"></td>
						<td><input type="date"class="carreerEnterdate"></td>
						<td><input type="date"class="carreerLeavedate"></td>
						<td><input type="text" class="carreerSpot"></td>
						<td><input type="text" class="carreerResponsib"></td>
					</tr>
				</tbody>
			</table>
			
			<div class="add-row-btn-pannel">
				<button class="add-row-btn addRowBtn">+</button>
			</div>
			
		</div>
		
		
		
		
		
		
		
		
		<%-- 학력 / 자격증 --%>
		<div class="training-and-licen-pannel">
			<div class="training-table-pannel">
				<table class="training-table flexibleTable" tb="training">
					<thead>
						<tr>
							<td>
								교육명
							</td>
							<td>
								시작일
							</td>
							<td>
								종료일
							</td>
							<td>
								기관
							</td>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><input type="text" class="trainingName"></td>
							<td><input type="date"class="trainingStratdate"></td>
							<td><input type="date"class="trainingEnddate"></td>
							<td><input type="text" class="trainingAgency"></td>
						</tr>
					</tbody>
				</table>
				
				<div class="add-row-btn-pannel">
					<button class="add-row-btn addRowBtn">+</button>
				</div>
				
			</div>
			
			<div class="training-table-pannel">
				<table class="licen-table flexibleTable" tb="licen">
					<thead>
						<tr>
							<td>
								보유기술 및 외국어능력
							</td>
							<td>
								숙련도<br>(A,B,C)
							</td>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><input type="text" class="licenName"></td>
							<td><input type="text" class="licenSkillLevel"></td>
						</tr>
					</tbody>
				</table>
				
				<div class="add-row-btn-pannel">
					<button class="add-row-btn addRowBtn">+</button>
				</div>
				
			</div>
		</div>
		
		
	
	
	
		
		
		<div class="clear-pannel"></div>
		
		
		
		
		
		
		
		
		<div class="skill-inventory-table-pannel">
			<table class="skill-inventory-table flexibleTable" tb="skill">
				<thead>
					<tr>
						<td rowspan="2">프로젝트명<br>업무명</td>
						<td colspan="2">참여기간<br>(yyyy.mm ~<br>yyyy.mm)</td>
						<td rowspan="2">고객사</td>
						<td rowspan="2">근무회사</td>
						<td colspan="2">개발분야</td>
						<td rowspan="2">역할</td>
						<td colspan="7">개발환경</td>
					</tr>
					<tr>
						<td>시작일</td>
						<td>종료일</td>
						<td>산업</td>
						<td>응용</td>
						<td>기종</td>
						<td>O.S</td>
						<td>언어</td>
						<td>DBMS</td>
						<td>TOOL</td>
						<td>통신</td>
						<td>기타</td>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td><input type="text" class="skillProjectName"></td>
						<td><input type="date"class="skillStartdate"></td>
						<td><input type="date"class="skillEnddate"></td>
						<td><input type="text" class="skillCustomerComp"></td>
						<td><input type="text" class="skillWorkComp"></td>
						<td><input type="text" class="skillIndustry"></td>
						<td><input type="text" class="skillApplied"></td>
						<td><input type="text" class="skillRole"></td>
						<td><input type="text" class="skillModel"></td>
						<td><input type="text" class="skillOS"></td>
						<td><input type="text" class="skillLang"></td>
						<td><input type="text" class="skillDBMS"></td>
						<td><input type="text" class="skillTool"></td>
						<td><input type="text" class="skillComm"></td>
						<td><input type="text" class="skillETC"></td>
					</tr>
				</tbody>
			</table>
			
			<div class="add-row-btn-pannel">
				<button class="add-row-btn addRowBtn">+</button>
			</div>
		</div>
		
	</div>
	
	
	<div class="pop-user-register-pannel" id="drag-ele1">
		<div class="pop-user-top-btn-pannel">
			<div class="pop-user-minimize-btn">
			</div>
		</div>
		
		<div class="clear-pannel"></div>
		
		<div class="pop-register-list-pannel">
			<table class="pop-register-list">
				<thead>
					<tr>
						<td>등록번호</td>
						<td>성명</td>
						<td>소속회사</td>
						<td>부서</td>
						<td>등록날짜</td>
					</tr>
				</thead>
				<tbody>
				</tbody>
			</table>
		</div>
	</div>
	
</body>
</html>
