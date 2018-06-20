function getHash() {
    return location.hash.slice(1).split(",");
}

function changePage() {
    var hash = getHash();
    hash.forEach(function (el) {
        if (el <= "C"){
            document.getElementById("contABC").innerText = el;
        }else{
            document.getElementById("contDEF").innerText = el;
        }
    })


}
(()=>{
    var elsButton =  document.getElementsByTagName("button");
    var hashArr = [];
    for(let i=0;i<elsButton.length;i++){
        elsButton[i].addEventListener('click',function(ev){

            if(ev.target.innerText <= "C"){
                hashArr[0] = ev.target.innerText;
            }else{
                hashArr[1] = ev.target.innerText;
            }
            location.hash = hashArr.join(",");
        });

    }
})();

window.onhashchange = changePage;
changePage();