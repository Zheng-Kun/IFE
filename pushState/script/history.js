
function getState(){
    return location.search.slice(1).split(",");
}
function onloadPage(){
    var state = getState();
    state.forEach(function (el) {
        if (el <= "C"){
            document.getElementById("contABC").innerText = el;
        }else{
            document.getElementById("contDEF").innerText = el;
        }
    })
}

(()=>{
    var elsBtn = document.getElementsByTagName('button');
    for(let i = 0;i < elsBtn.length; i++){
        var stateArr = [];
        elsBtn[i].addEventListener('click',function(ev){
            if(ev.target.innerText <= "C"){
                stateArr[0] = ev.target.innerText;
            }else{
                stateArr[1] = ev.target.innerText;
            }

            var href = location.href.split('?')[0];
            var url = href + "?" + stateArr.join(",");
            var stateObj = {
                foo:stateArr.join(','),
            }
            history.pushState(stateObj,null,url);

            onloadPage();
        });

    }
})();

window.onpopstate = onloadPage;