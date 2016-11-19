function carousel(oUl, oBtn, box) {
	var page = 1;
	var imgWidth = box.offsetWidth;
	var timer;
	//事件绑定
	for (var i=0; i<oBtn.length; i++) {
		oBtn[i].index = i;
		addHandler(oBtn[i], "click", btnClick);
	}
	//轮播
	autoMove();
	function autoMove() {
		clearInterval(timer);
		timer = setInterval(function(){
			if (page == 6) {
				oUl.style.left = 0;
				page = 1
			}
			page++;
			startMove(oUl, {"left": -imgWidth*(page-1)});
			for(var i=0; i<oBtn.length; i++) {

				if (page == 6) {
					oBtn[i].className = "after";
					oBtn[0].className = "now";
				}else {
					oBtn[i].className = "after";
					oBtn[page-1].className = "now";
				}
			}
		}, 3000);
	}
	//按钮点击函数
	function btnClick(ev) {
		var ev = ev || window.event;
		var _this = ev.target || ev.srcElement;
		console.log(_this.index)
		clearInterval(timer);
		page = _this.index + 1;
		startMove(oUl, {"left": -imgWidth*(page-1)}, autoMove);
		for(var i=0; i<oBtn.length; i++) {
			oBtn[i].className = "after";
		}

		oBtn[_this.index].className = "now";
	}
	//鼠标悬停
	oUl.onmouseover = function() {
		clearInterval(timer);
	}
	oUl.onmouseout = function() {
		autoMove();
	}
	//图片移动函数
	function startMove(element, obj, fn) {
		clearInterval(element.timer);
		element.timer = setInterval(function() {
			var isCompleted = false;
			for (attr in obj) {
				var current = Math.round(parseFloat(getStyle(element, attr)));
				if (!current) {
					current = 0;
				}
				var speed = (obj[attr] - current)/10;
				if (speed < 0) {
					speed = Math.floor(speed);
				}
				if (speed >  0) {
					speed = Math.ceil(speed);
				}
				if (speed == 0) {
					isCompleted = true
				}
				oUl.style.left = speed + current + "px";
				
			}
			if (isCompleted) {
				clearInterval(element.timer);
				if (fn) {
					fn()
				}
			}
			
		}, 50);
	}
	//最终样式获取
	function getStyle(element, attr) {
		if (element.currentStyle) {
			return element.currentStyle[attr];
		}else {
			return window.getComputedStyle(element, false)[attr];
		}
	}
	//事件封装
	function addHandler(element, type, handler) {
		if(element.addEventListener) {
            element.addEventListener(type,handler,false);
        }else if(element.attachEvent) {
            element.attachEvent("on"+type,handler);
        }else {
            element["on" +type] = handler;
        }
	}
}
