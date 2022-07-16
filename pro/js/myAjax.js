// 封装函数完成 ajax调用
// 参数 以对象形式存储实参
function myAjax(objVal) {
    // 定义一个 对象 存储 默认值 参数
    const obj = {
        // 请求方式默认值是 get
        type: 'get',
        // 携带参数默认值是 '' 空字符串
        data: '',
        // 回调函数 默认值 是 空函数
        success: function () { },
    }

    // 输入的实参对象中 必须有 url 这个属性
    // 如果 实参对象中使用url属性 调用结果是 undefined 
    // 证明 实参数据中 没有 url请求地址 终止程序执行 抛出报错信息
    if (objVal.url === undefined) throw ('您必须输入请求地址');

    // 循环遍历 实参对象 
    for (let key in objVal) {
        // 使用 实参对象中的键名 从 默认值对象中调用数据 
        if (obj[key] !== undefined) {
            // 如果调用结果 不是 undefined 
            // 证明 默认值对象属性 在 实参对象属性中 也存在 
            // 使用 实参对象 这个属性存储的实参数据 
            // 覆盖 默认值对象 这个属性存储的默认值数据
            obj[key] = objVal[key];
        }
    }

    // 给 默认值 对象 添加 url请求地址属性 
    // 属性值 是 实参对象中url属性存储的属性值
    obj.url = objVal.url;

    // 执行结束 默认值对象中 新增了url请求地址
    // 使用 实参数据 覆盖了 默认值数据 

    // 创建ajax实例化对象 
    const xhr = new XMLHttpRequest() ;

    // 判断 请求类型 是 get 统一大小写 再判断
    if( obj.type.toLowerCase() === 'get' ){
        // 设定 open 携带参数
        xhr.open( 'get' , `${obj.url}${obj.data === '' ? obj.data : '?' + obj.data }` );
        // 设定 send 发送请求
        xhr.send();
    
    // 判断 请求类型 是 post 统一大小写 再判断
    }else if(  obj.type.toLowerCase() === 'post' ){
        // 设定 open()
        xhr.open( 'post' , obj.url );
        // 设定 请求头
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        // 设定 send() 携带参数
        xhr.send( obj.data );
    }

    // 接收响应体结果 
    xhr.onload = function(){
        // ajax状态码 是 4   http状态码是 200-299

        // 逻辑运算符
        // if( xhr.readyState === 4 && ( xhr.status >= 200 && xhr.status <= 299 ) ){

        // 正则表达式
        if( xhr.readyState === 4 && /^2\d{2}$/.test( xhr.status )  ){
            // 触发执行回调函数 参数是 响应体数据
            obj.success( xhr.response ); 
        }
    }
}

// 封装一个promise执行的ajax
function myPromiseAjax( obj ){

    // 创建一个 promise实例化对象 
    const p = new Promise( function( fulfilled , rejected ){
        // 需要执行的异步程序 jQuery封装的ajax请求
        $.ajax({
            url: obj.url ,
            type: obj.type ,
            data: obj.data ,
            success:  fulfilled , 
            error: rejected ,
        })
    });

    // 通过 return 返回这个promise实例化对象
    return p ;
}