//筛选数据帅选出满足key=value的数据array = [[key,value],[key,value]]
function selectDate(list){
    var resultDate = [];

    sourceDataSeach:
        for(let j = 0;j<sourceData.length;j++){
            for(let i = 0;i < list.length;i++){
                if(sourceData[j][list[i][0]] != list[i][1]){
                    continue sourceDataSeach;
                }
            }
            resultDate.push(sourceData[j]);
        }
    return resultDate;
}

//根据数据创建表格
function creatTable(date){
    var elDataTbaleBox = document.getElementById('data-table-box');
    elDataTbaleBox.innerHTML = "";
    var elTable = document.createElement('table');
    elDataTbaleBox.appendChild(elTable);

    var tableCode =`<tr>${putIntoTag(["商品","地区","1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],"th")}</tr>` ;

    date.forEach(function(el){
        var tabArray = [el.product,el.region];
        for(let i = 0;i < el.sale.length;i++){
            tabArray.push(el.sale[i]);
        }
        tableCode +=`<tr>${putIntoTag(tabArray,"td")}</tr>`;
    });

    elTable.innerHTML = tableCode;

}

//将数组中元素装入tag标签并组成代码字符串返回
function putIntoTag(array,tag) {
    var tdCode="";
    array.forEach(function(el){
        tdCode += `<${tag}>${el}</${tag}>`;
    });
    return tdCode;

}

var elselectItem = document.getElementById('select-item');

var elRegionSelect = document.getElementById('region-select');
var elProductSelect = document.getElementById('product-select');


//表单改变是生成/更新数据表
elselectItem.addEventListener('change',function(ev){
    let region = elRegionSelect.options[elRegionSelect.selectedIndex].value;
    let product = elProductSelect.options[elProductSelect.selectedIndex].value;

    //构建传入selectDate()函数的参数
    var itemList = [];
    if(region){
        itemList.push(["region",region]);
    }
    if(product){
        itemList.push(["product",product]);
    }

    console.log(itemList);
    var ev = ev || window.event;
    var target = ev.target || ev.srcElement;
    if(target.nodeName.toLowerCase() == "select"){
        if(region || product){//非默认选择是才更新
            creatTable(selectDate(itemList));
        }
    }
});