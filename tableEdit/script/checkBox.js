//生成复选框，参数一为容器，参数二为复选框属性数组
function creatCheckBox(wrapper,itemArray){
    //生成全选复选框HTMl
    var checkboxHTMl = wrapper.innerHTML;
    checkboxHTMl  += `<label><input type="checkbox" checkBox-type= "all" class="select-all">全选</label>`;

    //遍历itemArray参数生成各项HTMl
    itemArray.forEach(function(el){
        checkboxHTMl += `<label><input type="checkbox" name="${el.name}" value="${el.value}">${el.text}</label>`
    });
    //放入容器
    wrapper.innerHTML = checkboxHTMl;

    //给容器添加事件委托(控制多选框的快捷操作)
    wrapper.addEventListener('change',function(ev){
        if(ev.target.tagName.toLowerCase() == 'input'){
            let checklist = wrapper.getElementsByTagName('input');

            if(ev.target.getAttribute("checkBox-type") == 'all'){
                //全选/全不选操作
                for(let i = 1;i < checklist.length;i++){
                    checklist[i].checked = checklist[0].checked;
                }
            }else{
                //单选操作
                let checkNum = 0;
                for(let i = 1;i < checklist.length; i++){
                    if(checklist[i].checked == true){
                        checkNum ++;
                    }
                }

                if(checkNum == checklist.length-1){
                    checklist[0].checked = true;
                }else{
                    checklist[0].checked = false;
                }

            }
        }
    });

    //给容器添加事件委托（创建表格）
    wrapper.addEventListener('change',function (ev) {
        if(ev.target.tagName.toLowerCase() == 'input'){
            creatTable(getSelectedData());
        }
    })
}


var region_form  = [
    {
        value:"华东",
        name:"region",
        text:"华东"
    },{
        value:"华南",
        name:"region",
        text:"华南"
    },{
        value:"华北",
        name:"region",
        text:"华北"
    }
];
var product_form = [
    {
        value:"手机",
        text:"手机",
        name:'product'
    },{
        value:"笔记本",
        text:"笔记本电脑",
        name:'product'
    },{
        value:"智能音箱",
        text:"智能音箱",
        name:'product'
    }
];

creatCheckBox(document.getElementById('region-select'),region_form );
creatCheckBox(document.getElementById('product-select'),product_form );
