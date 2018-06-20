(()=>{

    var storage = {};

    //将data存入storage中
    storage.set = function (data) {
        var dataStr = JSON.stringify(data);
        window.localStorage.setItem("data",dataStr)
    }

    //获取数据，如果storage中没有 数据返回null；
    storage.get = function(){
        var dataStr = window.localStorage.getItem("data");
        if(dataStr){
            return JSON.parse(dataStr);
        }else{
            return null;
        }

    }

    storage.remove = function(){
        window.localStorage.removeItem("data");
    }

    storage.edit = function(product,region,month,value){

        //获取storage中的数据
        var data = JSON.parse(window.localStorage.getItem("data"));

        //找到目标数据并修改
        for(let i = 0; i < data.length; i++ ){
            if(data[i].product == product && data[i].region == region){
                data[i].sale[month - 1] = value;
            }
        }

        //保存修改后的数据
        window.localStorage.setItem("data",JSON.stringify(data));
        return data;
    }

    window.storage = storage;
})();