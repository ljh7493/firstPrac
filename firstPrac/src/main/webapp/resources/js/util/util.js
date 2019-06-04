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


/*
 * 오브젝트를 드래그가 가능하게 만듬
 * 사용방법 : dragElement(document.getElementById("mydiv"));
 * 해당 Object에 position:absolute; 
 */
function dragElement(elmnt) {
	  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
	  if (document.getElementById(elmnt.id + "header")) {
	    // if present, the header is where you move the DIV from:
	    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
	  } else {
	    // otherwise, move the DIV from anywhere inside the DIV: 
	    elmnt.onmousedown = dragMouseDown;
	  }

	  function dragMouseDown(e) {
	    e = e || window.event;
	    e.preventDefault();
	    // get the mouse cursor position at startup:
	    pos3 = e.clientX;
	    pos4 = e.clientY;
	    document.onmouseup = closeDragElement;
	    // call a function whenever the cursor moves:
	    document.onmousemove = elementDrag;
	  }

	  function elementDrag(e) {
	    e = e || window.event;
	    e.preventDefault();
	    // calculate the new cursor position:
	    pos1 = pos3 - e.clientX;
	    pos2 = pos4 - e.clientY;
	    pos3 = e.clientX;
	    pos4 = e.clientY;
	    // set the element's new position:
	    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
	    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
	  }

	  function closeDragElement() {
	    // stop moving when mouse button is released:
	    document.onmouseup = null;
	    document.onmousemove = null;
	  }
	}