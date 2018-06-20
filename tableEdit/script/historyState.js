function getQuery(){
    return JSON.parse(decodeURIComponent(location.search.slice(1)));
}
//渲染表格
function createTableAndChart(){
    // 获取选择的数据
    var selectedObj = getQuery();

    // 按照数据控制表单状态
    var elProCharts = document.getElementsByName("product");
    var elRegCharts = document.getElementsByName("region");

    for(let i = 0; i < elProCharts.length; i++){
        if(selectedObj.products.indexOf(elProCharts[i].value) > -1){
            elProCharts[i].checked = true;
        }else{
            elProCharts[i].checked = false;
        }
    }
    for(let i = 0; i < elRegCharts.length; i++){
        if(selectedObj.regions.indexOf(elRegCharts[i].value) > -1){
            elRegCharts[i].checked = true;
        }else{
            elRegCharts[i].checked = false;
        }
    }

    //控制全选表单的状态
    if(selectedObj.products.length == 3){
        document.getElementsByClassName("select-all")[1].checked = true;
    }else{
        document.getElementsByClassName("select-all")[1].checked = false;
    }
    if(selectedObj.regions.length == 3){
        document.getElementsByClassName("select-all")[0].checked = true;
    }else{
        document.getElementsByClassName("select-all")[0].checked = false;
    }

    //创建表格
    creatTable(getSelectedData());
}

document.getElementById("select-item").addEventListener('change',function(){

    //获取用户选择的项目并生成JSON字符串
    let proArr =  getSelectedList("product");
    let regArr = getSelectedList("region");
    var selectedObj = {
        "products":proArr,
        "regions":regArr,
    }
    var selectedStr = JSON.stringify(selectedObj);

    //pushState地址
    var href = location.href.split('?')[0];
    var url = href + "?" + selectedStr;
    var stateObj = {
        foo:selectedStr,
    }
    history.pushState(stateObj,null,url);

})

window.onpopstate = createTableAndChart;