

var elTrs = document.querySelector("#data-table-box");
elTrs.addEventListener("mouseover",function(ev){
    var ev = ev || window.event;
    var target = ev.target || ev.srcElement;

    if(target.tagName.toLowerCase() == "td" || target.tagName.toLowerCase() == "input"){
        if(target.tagName.toLowerCase() == "input"){
            var tr = target.parentNode.parentNode;
        }else{
            var tr = target.parentNode;
        }

        //如果当前行的表头元素完整
        if(tr.children[0].classList.contains("product")){
            var product = tr.children[0].innerText;
            var region = tr.children[1].innerText

        }else if(tr.children[0].classList.contains("region")){
            var region = tr.children[0].innerText;
            var product = tr.children[1].innerText;
        }else{

            //当前行的某个表头元素被合并
            var pretr = tr.previousElementSibling;
            while(!pretr.children[0].classList.contains("product") && !pretr.children[0].classList.contains("region")){
                pretr = pretr.previousElementSibling;
            }

            if(pretr.children[0].classList.contains("product")){
                var product = pretr.children[0].innerText;
                var region = tr.children[0].innerText;
            }else{
                var product = tr.children[0].innerText;
                var region = pretr.children[0].innerText;
            }

        }

        var chartHeader = document.getElementById("chart-header");
        chartHeader.innerText  = region + "地区的" + product + "销量折线图与柱形图";


        var elBar = document.getElementById("bar-box");
        elBar.innerHTML = "";
        elBar.appendChild(svgColumnarChart(product,region));

        var elLine  = document.getElementById("line-box");
        elLine.innerHTML = "";
        elLine.appendChild(canvasLineChart(product,region));

    }
});