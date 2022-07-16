// 设定 函数 输入 键名 键值 路径 时效 设定 cookie
// 参数 以对象的形式 存储 cookie的相关设定
function mySetCookie( cookieObj ) {
    // 定义 对象 存储 默认值 
    // 路径 和 时效 设定默认值是 空字符串
    const obj = {
        key : '' ,
        val : '' , 
        path : '',
        time : '',
    };

    // 输入的实参对象中 必须有 键名 键值 
    if( cookieObj.key === undefined ) throw('您必须输入键名');
    if( cookieObj.val === undefined ) throw('您必须输入键值');

    // 循环遍历 默认值对象 如果 在 实参对象中有实参数据输入 
    // 将 实参数据 覆盖 默认值数据
    for( let k in obj ){
        // k 就是 默认值对象中的键名 
        // 使用这个键名 从 实参对象中 调用数据
        if( cookieObj[k] !== undefined ){
            // 如果调用结果 不是 undefined 
            // 证明 实参对象中有这个数据 
            // 将实参数据 赋值给 默认值对象 存储 
            obj[k] = cookieObj[k];
        }
    }

    // 创建 时间对象 
    const t = new Date();

    // 设定 时间对象的时间戳
    // 当前时间时间戳 + 时效(转化毫秒) - 时差(转化毫秒)
    t.setTime(t.getTime() + obj.time * 1000 - 8 * 60 * 60 * 1000);

    // 如果 time 存储 空字符串 是 没有输入时效 时效设定 空字符串 也就是 会话时效
    // 如果 time 存储 不是 空字符串 是 输入时效 时效设定 时间对象 
    document.cookie = `${obj.key}=${obj.val};path=${obj.path};expires=${obj.time === '' ? '' : t}`;
}


// 获取 cookie键值对字符串 转化为对象形式
function myGetCookie(){
    // 设定一个空对象 
    const obj = {} ;

    // 获取 cookie 键值对 
    let str = document.cookie;

    // 按照 分号空格 为 间隔符号 将 字符串 分割为数组
    const arr1 = str.split( '; ' );

    // 循环遍历 数组1 每一个数据单元 都是 键值对字符串
    // 以 等号 为间隔 分割
    arr1.forEach( item => {
        // item 是 键值对字符串 
        // arr2[0] 是 键值对 键名
        // arr2[1] 是 键值对 键值
        let arr2 = item.split('=');

        // 使用 arr2[0] 键名 从 obj 中 调用数据 
        if( obj[ arr2[0] ] === undefined ){
            // 如果 调用 结果是 undefined 
            // 证明 对象中 没有 arr2[0] 这个键名 
            // 直接 新增键名 存储 键值 
            obj[ arr2[0] ] = arr2[1];

        }else{
            // 如果 调用 结果 不是 undefined
            // 证明 对象中 有 arr2[0] 这个键名 

            // 判断 使用 arr2[0] 属性 从 obj 中 调用数据的数据类型
            if( typeof( obj[ arr2[0] ]  ) === 'string' ){
                // 如果 数据类型 是 string 字符串类型 需要转护为 数组 存储多个单元
                obj[ arr2[0] ] = [ obj[ arr2[0] ] , arr2[1] ];


            }else{
                // 如果 数据类型 不是 string 字符串 只能是 数组
                // 数组 直接在 末位 新增数据 
                obj[ arr2[0] ].push( arr2[1] );
            }
        }

    })

    // return 返回值 是 这个对象 
    return obj ;
}