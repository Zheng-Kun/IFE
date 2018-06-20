


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