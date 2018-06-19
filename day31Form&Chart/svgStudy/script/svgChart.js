let sourceData = [{
    product: "手机",
    region: "华东",
    sale: [120, 100, 140, 160, 180, 185, 190, 210, 230, 245, 255, 270]
}, {
    product: "手机",
    region: "华北",
    sale: [80, 70, 90, 110, 130, 145, 150, 160, 170, 185, 190, 200]
}, {
    product: "手机",
    region: "华南",
    sale: [220, 200, 240, 250, 260, 270, 280, 295, 310, 335, 355, 380]
}, {
    product: "笔记本",
    region: "华东",
    sale: [50, 60, 80, 110, 30, 20, 70, 30, 420, 30, 20, 20]
}, {
    product: "笔记本",
    region: "华北",
    sale: [30, 35, 50, 70, 20, 15, 30, 50, 710, 130, 20, 20]
}, {
    product: "笔记本",
    region: "华南",
    sale: [80, 120, 130, 140, 70, 75, 120, 90, 550, 120, 110, 100]
}, {
    product: "智能音箱",
    region: "华东",
    sale: [10, 30, 4, 5, 6, 5, 4, 5, 6, 5, 5, 25]
}, {
    product: "智能音箱",
    region: "华北",
    sale: [15, 50, 15, 15, 12, 11, 11, 12, 12, 14, 12, 40]
}, {
    product: "智能音箱",
    region: "华南",
    sale: [10, 40, 10, 6, 5, 6, 8, 6, 6, 6, 7, 26]
}]

var elBar = document.getElementById("chart");
elBar.appendChild(svgColumnarChart("手机","华南"));


function svgColumnarChart(product,region){
    var width = 600;
    var height = 400;
    var svgns = "http://www.w3.org/2000/svg";

    //创建SVG节点
    var chart = document.createElementNS(svgns,"svg:svg");
    chart.setAttribute("width",width.toString());
    chart.setAttribute("height",height.toString());
    chart.setAttribute("viewBox","0 0 "+width+" "+height);

    //获取目标数据
    var chartData = new Array;
    for(let i=0; i < sourceData.length; i++){
        if(sourceData[i].product == product && sourceData[i].region == region){
            chartData = sourceData[i].sale.slice(0);
        }
    }

    //获取数据中的最大值
    var max = 0;
    for(let i = 0; i < chartData.length; i++){
        if(chartData[i] > max){
            max = chartData[i];
        }
    }

    //定义柱宽与间距
    var colum = (width-40)/12*0.7;
    var space = (width-40)/12*0.3;

    //定义纵轴比例
    var unitHeight = (height-50)/max;

    //绘制坐标轴
    var xAxis = document.createElementNS(svgns,"line");
    xAxis.setAttribute('x1',"20");
    xAxis.setAttribute('y1',(height-20).toString());
    xAxis.setAttribute('x2',width.toString());
    xAxis.setAttribute('y2',(height-20).toString());
    xAxis.setAttribute('stroke',"red");
    xAxis.setAttribute('stroke-width',"1");
    chart.appendChild(xAxis);

    var yAxis = document.createElementNS(svgns,"line");
    yAxis.setAttribute('x1',"20");
    yAxis.setAttribute('y1',(height-20).toString());
    yAxis.setAttribute('x2',"20");
    yAxis.setAttribute('y2',"20");
    yAxis.setAttribute('stroke',"red");
    yAxis.setAttribute('stroke-width',"1");
    chart.appendChild(yAxis);

    //绘制柱形图
    for(let i = 0; i < chartData.length; i++){
        let rect = document.createElementNS(svgns,"rect");
        let x = 20 + (i+1)*space + i*colum;
        let y = height-20-unitHeight*chartData[i];
        rect.setAttribute('x',x.toString());
        rect.setAttribute('y',y.toString());
        rect.setAttribute('width',colum.toString());
        rect.setAttribute('height',(unitHeight*chartData[i]).toString());
        rect.setAttribute('style',"fill:red;stroke:pink;stroke-width:2;fill-opacity:0.5;stroke-opacity:0.1");
        chart.appendChild(rect);
    }

    return chart;
}