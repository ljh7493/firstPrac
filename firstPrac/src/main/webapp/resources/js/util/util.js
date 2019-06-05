// 넘어온 값이 빈값인지 체크합니다.
// !value 하면 생기는 논리적 오류를 제거하기 위해
// 명시적으로 value == 사용
// [], {} 도 빈값으로 처리
var isEmpty = function(value) {
	if (value == ""
			|| value == null
			|| value == undefined
			|| value == "undefined"
			|| (value != null && typeof value == "object" && !Object
					.keys(value).length)) {
		return true
	} else {
		return false
	}
};

/**
 * 페이징 텍스트 리턴
 * 
 * totalCnt 전체레코드수
 * dataSize 페이지당 보여줄 데이타수
 * pageNo 페이지 그룹 범위 1 2 3 5 6 7 8 9 10
 * token 현재페이지
 */
var paging = function(totalCnt, dataSize, pageSize, pageNo, token){
	totalCnt = parseInt(totalCnt);// 전체레코드수
	dataSize = parseInt(dataSize); // 페이지당 보여줄 데이타수
	pageSize = parseInt(pageSize); // 페이지 그룹 범위 1 2 3 5 6 7 8 9 10
	pageNo = parseInt(pageNo); // 현재페이지
	
	var html = new Array(); 
	if(totalCnt == 0){ return ""; } // 페이지 카운트
	
	var pageCnt = totalCnt % dataSize;
	if(pageCnt == 0){
		pageCnt = parseInt(totalCnt / dataSize);
	}else{
		pageCnt = parseInt(totalCnt / dataSize) + 1;
	}
	
	var pRCnt = parseInt(pageNo / pageSize);
	
	if(pageNo % pageSize == 0){
		pRCnt = parseInt(pageNo / pageSize) - 1;
	} // 이전
																																																																	// 화살표
	if(pageNo > pageSize){
		var s2;
		if(pageNo % pageSize == 0){
			s2 = pageNo - pageSize;
		}else{
			s2 = pageNo - pageNo % pageSize;
		}
		
		html.push('<a href=javascript:' + token + '("');
		html.push(s2);
		html.push('");>');
		html.push('◀');
		html.push("</a>");
		
		}else{
			
			html.push('<a href="#">\n');
			html.push('◀'); html.push('</a>');
		} // paging
																																																																																		// Bar
	for(var index=pRCnt * pageSize + 1; index<(pRCnt + 1)*pageSize + 1;index++){
		if(index == pageNo){
			html.push('<strong>');
			html.push(index); html.push('</strong>');
		}else{
			html.push('<a href=javascript:' + token + '("');
			html.push(index); html.push('");>'); html.push(index);
			html.push('</a>');
		}if(index == pageCnt){
			break;
		}else html.push(' ');
	} // 다음
																																																																																									// 화살표
	if(pageCnt > (pRCnt + 1) * pageSize){
		html.push('<a href=javascript:' + token + '("');
		html.push((pRCnt + 1)*pageSize+1); html.push('");>');
		html.push('▶'); html.push('</a>');
	}else{
		html.push('<a href="#">');
		html.push('▶');
		html.push('</a>');
	} 
	
	return html.join("");
}
