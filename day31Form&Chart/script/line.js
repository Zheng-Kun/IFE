

function canvasLineChart(product,region){
    var width = 600;
    var height = 400;

    //创建canvas节点
    var chart = document.createElement("canvas");
    chart.setAttribute("width",width.toString());
    chart.setAttribute("height",height.toString());

    var linechart = chart.getContext("2d");

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

    //定义数据间
    var space =(width-40)/12;

    //定义纵轴比例
    var unitHeight = (height-40)/max;

    //绘制坐标轴
    linechart.moveTo(20,height-20);
    linechart.lineTo(width-20,height-20);
    linechart.moveTo(20,height-20);
    linechart.lineTo(20,20);
    linechart.strokeStyle = "red";
    linechart.stroke();



    //绘折线形图的点
    for(let i = 0; i < chartData.length; i++){
        let x = 40 + i*space;
        let y = height-20-unitHeight*chartData[i];

        linechart.fillStyle = "#FF0000";
        linechart.beginPath();
        linechart.arc(x,y,5,0,Math.PI*2,true);
        linechart.fill();
        linechart.closePath();
    }

    //绘折线形图的线
    for(let i = 0; i < chartData.length-1; i++){
        let x = 40 + i*space;
        let y = height-20-unitHeight*chartData[i];

        let x2 = 40 + (i+1)*space;
        let y2 = height-20-unitHeight*chartData[i+1];

        linechart.moveTo(x,y);
        linechart.lineTo(x2,y2);
        linechart.strokeStyle = "red";
        linechart.stroke();

    }

    return chart;
}