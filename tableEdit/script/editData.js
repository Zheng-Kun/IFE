(()=>{
    var table = document.querySelector("#data-table-box table");

    table.addEventListener('change',function(ev){

        var ev = ev || window.event;
        var target = ev.target || ev.srcElement;

        if(target.classList.contains("data-value-input")){

            // 获得当前数据的产品名，地区，以及月份
            var tr = target.parentNode.parentNode;

            //如果当前行的表头元素完整
            if(tr.children[0].classList.contains("product")){
                var product = tr.children[0].innerText;
                var region = tr.children[1].innerText;
                var month = [].indexOf.call(tr.querySelectorAll('td'),target.parentNode) - 1;

            }else if(tr.children[0].classList.contains("region")){
                var region = tr.children[0].innerText;
                var product = tr.children[1].innerText;
                var month = [].indexOf.call(tr.querySelectorAll('td'),target.parentNode) - 1;
            }else{
                //当前行的某个表头元素被合并
                var month = [].indexOf.call(tr.querySelectorAll('td'),target.parentNode);
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

            // console.log(product,region,month);

            var valueNum = parseInt(target.value)
            if(valueNum != NaN){
                // 修改storage中的数据

                storage.edit(product,region,month,valueNum);

                // 修改当使用数据的值
                for(let i = 0; i < sourceData.length; i++ ){
                    if(sourceData[i].product == product && sourceData[i].region == region){
                        sourceData[i].sale[month - 1] = valueNum ;
                    }
                }

                // 重新渲染图表
                var elBar = document.getElementById("bar-box");
                elBar.innerHTML = "";
                elBar.appendChild(svgColumnarChart(product,region));

                var elLine  = document.getElementById("line-box");
                elLine.innerHTML = "";
                elLine.appendChild(canvasLineChart(product,region));
            }
        }
    })
})();

