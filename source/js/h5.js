
//展现搜索框
searchShow()
function searchShow() {
    var search = document.querySelector(".search");
    var btn =search.querySelector(".btn");
    var input = search.querySelector("input");
    btn.addEventListener("touchstart", function(){
        input.style.display = "block";
    })
}

//轮播图
banner()
function banner() {
    var box = document.querySelector('.carousel');
    var oUl = document.querySelector('.imgList');
    var oBtn = document.querySelector('.btnList').getElementsByTagName("li");
    carousel(oUl, oBtn, box)
}