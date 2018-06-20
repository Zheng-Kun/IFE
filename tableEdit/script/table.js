//获取用户选择的数据
function getSelectedData(){
    var regionList = getSelectedList("region");
    var productList = getSelectedList("product");

    var resultData = [];
    for(let i = 0 ;i < sourceData.length; i++){
        if((regionList.indexOf(sourceData[i].region) >= 0 || regionList.length ==0)
            && (productList.indexOf(sourceData[i].product) >=0 || productList.length ==0)){
            resultData.push(sourceData[i]);
        }
    }
    return resultData;
}

//根据数据创建表格
function creatTable(data){
    var elDataTbaleBox = document.getElementById('data-table-box');
    elDataTbaleBox.innerHTML = "";
    var elTable = document.createElement('table');
    elDataTbaleBox.appendChild(elTable);

    //勾选数目
    var regionNum = getSelectedList("region").length?getSelectedList("region").length:3;
    var productNum = getSelectedList("product").length?getSelectedList("product").length:3;

    //表头HTML
    if(productNum == 1 || (regionNum >1 && regionNum >1)){
        //商品在前
        var tableCode =`<tr>${putIntoTag(["商品","地区","1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],"th")}</tr>` ;
    }else{
        //地区在前
        var tableCode =`<tr>${putIntoTag(["地区","商品","1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],"th")}</tr>` ;
    }

    //生成表格
    if(productNum == 1 || (regionNum >1 && productNum >1)){
        var cowNum = 1;
        data.forEach(function(el){
            if((cowNum-1)%regionNum == 0){
                var tabArray = [el.product,el.region];
            }else{
                var tabArray = [el.region];
            }
            for(let i = 0;i < el.sale.length;i++){
                tabArray.push(el.sale[i]);
            }
            tableCode +=`<tr>${putIntoTag(tabArray,"td","input")}</tr>`;
            cowNum++;
        });
    }else{
        var cowNum = 1;
        data.forEach(function(el){
            if((cowNum-1)%productNum == 0){
                var tabArray = [el.region,el.product];
            }else{
                var tabArray = [el.product];
            }
            for(let i = 0;i < el.sale.length;i++){
                tabArray.push(el.sale[i]);
            }
            tableCode +=`<tr>${putIntoTag(tabArray,"td","input")}</tr>`;
            cowNum++;
        });
    }
    elTable.innerHTML = tableCode;

    //合并列表头
    var elsRow = elTable.getElementsByTagName("tr");
    for(let i = 1;i < elsRow.length;i++){
        if(productNum == 1 || (regionNum >1 && productNum >1)){
            if((i-1)%regionNum == 0){
                elsRow[i].firstChild.setAttribute('rowspan',regionNum);
                elsRow[i].firstChild.classList.add("product");
            }
        }else{
            if((i-1)%productNum == 0){
                elsRow[i].firstChild.setAttribute('rowspan',productNum );
                elsRow[i].firstChild.classList.add("region");
            }
        }
    }
}

//创建默认表格
creatTable(sourceData);

//将数组中元素装入tag标签并组成代码字符串返回,可传入第三个参数嵌套子标签
function putIntoTag(array,tag){
    var tdCode="";
    if(arguments.length == 3){
        var tag2 = arguments[2];
        array.forEach(function(el){
            if(typeof(el) == "number"){
                tdCode += `<${tag} class="data-value-td"><${tag2} type="number" class="data-value-input" value=${el} /></${tag}>`;
            }else{
                tdCode += `<${tag}>${el}</${tag}>`;
            }
        });
    }else{
        array.forEach(function(el){
            tdCode += `<${tag}>${el}</${tag}>`;
        });
    }
    return tdCode;

}

// 获取name值为elname的勾选值数组
function getSelectedList(elname){
    var els = document.getElementsByName(elname);
    var resultArr = [];
    for(let i = 0;i < els.length;i++){
        if(els[i].checked == true){
            resultArr.push(els[i].value);
        }
    }
    return resultArr;
}