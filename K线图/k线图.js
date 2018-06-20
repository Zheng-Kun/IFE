window.loadStockData = function (r) {
    var
        NUMS = 30,
        data = r.data;
    if (data.length > NUMS) {
        data = data.slice(data.length - NUMS);
    }
    data = data.map(function (x) {
        return {
            date: x[0],//日期
            open: x[1],//开盘价格
            close: x[2],//闭市价格
            high: x[3],//最高价
            low: x[4],//最低价
            vol: x[5],
            change: x[6]
        };
    });
    window.drawStock(data);
};
window.drawStock = function (data) {
    var
        canvas = document.getElementById('stock-canvas'),
        width = canvas.width,
        height = canvas.height,
        ctx = canvas.getContext('2d');
    ctx.fillText('Canvas 绘制K线图', 10, 10);
    var low = data[0].low;
    var high = data[0].high;
    console.log(low,high);
    for(let a of data){
        low = (a.low<low)?a.low:low;
        high = (a.high>high)?a.high:high;
    }
    console.log(low,high);
    var height_start = height*0.05;
    var width_start = width*0.05;
    //高度比例
    var scale = (height*0.9)/(high - low);
    //宽度比例
    var box_width = width*0.6/(data.length);
    var blank_width = width*0.2/(data.length+1);
    var xper_height = (height*0.9)/30;
    //console.log(`height:${height};width:${width};height_start:${height_start};width_start:${width_start};scale:${scale};high - low:${high - low}`);
    for(let i = 0;data[i];i++){
        //第i天竖线的x坐标
        let line_x = blank_width*(i+1)+box_width*i+box_width/2+width_start+i-1;
        //第i天竖线的起点终点坐标
        let line_ystart = height -((data[i].low-low)*scale+height_start);
        let line_yend = height -((data[i].high-low)*scale+height_start);
        console.log(i,line_x,line_yend,line_ystart);
        //绘制竖线
        ctx.moveTo(line_x,line_ystart);
        ctx.lineTo(line_x,line_yend);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "black";
        ctx.stroke();

        //计算矩形顶点的坐标
        let box_yopen = height -((data[i].open-low)*scale+height_start);
        let box_yclose = height -((data[i].close-low)*scale+height_start);
        let box_xleft = width_start + blank_width*(i+1) + box_width*i+i-1;
        let box_xright = width_start + blank_width*(i+1) + box_width*(i+1)+i-1;
        //绘制矩形
        ctx.beginPath();
        if(data[i].open<data[i].close){
            ctx.fillStyle = "#30A9DE";
            console.log(ctx.fillStyle);
        }else{
            ctx.fillStyle = "#ef5285";
            console.log(ctx.fillStyle);
        }

        ctx.moveTo(box_xleft,box_yopen);
        ctx.lineTo(box_xleft,box_yclose);
        ctx.lineTo(box_xright,box_yclose);
        ctx.lineTo(box_xright,box_yopen);
        ctx.lineTo(box_xleft,box_yopen);
        ctx.fill();

        //绘制坐标轴数据
        if(i%2==0){
            ctx.fillText(data[i].date.slice(-2),line_x-box_width/2,height-height_start);
            ctx.fillText((low+(high-low)/30*(i+1)).toFixed(0),1,height-(xper_height*(i+1)-xper_height/2),15);
        }

    }
    ctx.fillText("（日期）",260,height-height_start-15,40);
    ctx.fillText("（股价）",0,20,40);

}
// 加载最近30个交易日的K线图数据:
var js = document.createElement('script');
js.src = 'http://img1.money.126.net/data/hs/kline/day/history/2015/0000001.json?callback=loadStockData&t=' + Date.now();
//window.open(js.src);
document.getElementsByTagName('head')[0].appendChild(js);
