/*
    getAdd  获取累加和
        @param  integer num1    输入的数值1
        @param  integer num2    输入的数值2
        @return integer res     累加和结果
        
        输入的两个数值 大小顺序没有限制 有排序容错处理
        
*/ 
function getAdd( num1 , num2 ){
    // 大小排序
    var min = Math.min( num1 , num2 );
    var max = Math.max( num1 , num2 );

    // 定义变量储存 累加和
    var res = 0 ;

    for( var i = min ; i <= max ; i++ ){

        res += i

    }

    return res ;
}



/*
    getGCD   获取最大公约数
        @param  integer num1    输入的数值1
        @param  integer num2    输入的数值2
        @return integer         num1 和 num2 的 最大公约数

        输入的两个数值 大小顺序没有限制 有排序容错处理

*/

function getGCD( num1 , num2 ){
    // 先 处理 输入数据的容错 
    // 1, 必须要输入数值类型
    // 2, 必须要输入整数
    // 3, 大小排序
    var min = Math.min( num1 , num2 );
    var max = Math.max( num1 , num2 );

    // 通过循环判断 最大公约数
    if( max % min === 0 ){
        // 如果 大 % 小 整除 小 就是 最大公约数
        // 不错任何的操作设定 只是 return 返回数据
        return min ;

    }else{
        // 如果 大 % 小 不能整除 
        // 从 小-1 至 1 循环 
        // 第一个 可以 同时 整除的 是 最大公约数
        for( var i = min - 1 ; i >= 1 ; i--){
            if( min % i === 0 && max % i === 0 ){
                return i ;
            }            
        }
    }
}


/*
    getLCM  获取最小公倍数
        @param  integer num1    输入的数值1
        @param  integer num2    输入的数值2
        @return integer         num1 和 num2 的 最小公倍数

        输入的两个数值 大小顺序没有限制 有排序容错处理

*/
function getLCM( num1 , num2 ){
    // 排序容错
    var min = Math.min( num1 , num2 );
    var max = Math.max( num1 , num2 );

    // 判断 
    if( max % min ===0 ){
        // 如果 大 % 小 可以整除 大 就是 最小公倍数
        return max ;
    
    }else{
        // 如果 大 % 小 不能整除 
        // 从 max+1 至 min*max 循环 
        // 第一个可以同时整除的就是最小公倍数
        for( var i = max+1 ; i <= max*min ; i++ ){
            if( i % min === 0 && i % max === 0 ){
                return i ;
            }
        }
    }
}


/*
    isPrimeNumber   判断质数函数
        @param  integer num 输入的需要判断的数值
        @return boolean     是质数 返回值 true 不是 质数 返回值 false
*/

function isPrimeNumber( num ){
    // 从 2 至 数值/2 循环
    for( var i = 2 ; i <= num/2 ; i++ ){
        // 如果 发生整除 数值是合数 返回值false
        if( num % i === 0 ){
            return false;
        }
    }

    // 如果整个循环结束 没有发生整除
    // i 是 质数 返回值 true
    return true ;

}

/*
    setRGB      设定rgb格式的颜色
        @return string  设定的rgb格式的随机颜色字符串

*/ 

function setRGB(){
    return `rgb(${parseInt(Math.random()*256)},${parseInt(Math.random()*256)},${parseInt(Math.random()*256)})`;
}

/*
    setRGBA     设定rgba格式的颜色
        @return string  设定的rgba格式的随机颜色字符串

*/ 

function setRGBA(){
    return `rgba(${parseInt(Math.random()*256)},${parseInt(Math.random()*256)},${parseInt(Math.random()*256)},${parseInt(Math.random()*11)/10})`;                                 
}


/*
    setVC   设定验证码字符串
        @param  object valObj   以对象形式输入实参 键名是 规定好的键名 str length bool 键值是 实参数据

        @return string  vc      生成的验证码字符串内容

*/

function setVC( valObj ){
    // 定义变量 存储 验证码字符串结果
    var vc = '' ;

    // 定义一个对象 存储 默认值 
    var obj = {
        str : '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ' , 
        length : 6 , 
        bool : true , 
    };

    // 如果有实参 valObj 存储 对象 
    // 如果没有实参 valObj 存储 undefined
    if( valObj !== undefined ){
        // 也就是 输入了实参数据 
        // 实参数据 应该 覆盖 obj 中 设定的 默认值
        // 循环遍历 obj 获取 键名 
        // 从 参数valObj 对象中 调用数据 
        // 如果 结果 不是 undefined 证明 有这个 属性 输入的实参
        // 使用 实参 覆盖 默认值
        for( var key in obj ){
            // key 是 默认值对象 中 的 键名
            // 使用 key 键名 从 实参对象 valObj 中 获取数据
            // console.log( key , valObj[key] ); 

            if( valObj[key] !== undefined ){
                // 证明 用默认值对象中的属性 可以 获取 输入的实参
                // 使用 实参 数据覆盖 默认值对象中的 默认值数据
                obj[ key ] = valObj[key];
            }
        } 

    } 
    
    // 定义死循环 拼接生成验证码字符串
    while( true ){
        // 如果 bool 存储 true 是 验证码内容可以重复
        // 直接 拼接 随机字符
        if( obj.bool ){
            // 通过 0 - str.length-1 范围的随机索引下标 获取 随机字符
            // 直接拼接随机字符
            vc += obj.str[ parseInt( Math.random()*obj.str.length ) ] ;

        // 如果 bool 存储 false 是 验证码内容 不能重复
        // 判断 随机字符 不在 验证码字符串中 再 执行 拼接操作
        }else{
            // 通过 0 - str.length-1 范围的随机索引下标 获取 随机字符
            var code = obj.str[ parseInt( Math.random()*obj.str.length ) ] ;

            // 在 vc 验证码字符串中 查询 随机字符 code
            // 如果结果是 -1 证明 随机字符 不在 验证码字符串vc 中 
            // 执行拼接写入操作 
            if( vc.indexOf( code ) === -1 ){
                vc += code ;
            }
        }


        // 当 验证码字符串 长度 等于 需要的长度 
        // 触发 break 终止循环
        if( vc.length === obj.length ){
            break ;
        }
    }

    // 返回值 是 验证码字符串内容
    return vc ;
}

/*
    myGetTime   获取时间数据
        @param  string  时间字符串

        @return object  年月日星期时分秒 时间数据

*/

function myGetTime( timeStr ){
    //  创建 时间对象 
    //  如果 参数 timeStr 没有赋值实参 也就是 存储的是 undefined
    //      不设定参数 获取 当前时间对象
    //  如果 参数 timeStr 赋值实参 也就是 存储的不是 undefined 
    //      根据输入的实参 获取 时间对象 
    var time = timeStr === undefined ? new Date() :  new Date(timeStr) ;

    //  获取年
    var year = time.getFullYear();

    //  获取月  结果是 0 - 11 的数值 对应 1 - 12 的月份
    //  结果 +1 是对应的月份数值
    var month = time.getMonth();

    //  获取日期 
    var day = time.getDate();

    //  定义星期数组
    var weekArr = ['星期日' , '星期一' , '星期二' , '星期三' , '星期四' , '星期五' , '星期六'];

    //  获取星期
    //  使用 结果 作为 索引下标 从 数组中获取星期字符串
    var week = weekArr[ time.getDay() ];

    //  获取小时
    var hour = time.getHours();

    //  获取分钟
    var minute = time.getMinutes();

    //  获取秒
    var second = time.getSeconds();

    //  定义对象 将 数据 作为 返回值 
    return {
        year : year,
        month : month,
        day : day,
        week : week,
        hour : hour,
        minute : minute,
        second : second,
    };
}


/*

    myGetCountDown  获取倒计时 天小时分钟秒
        @param  string  endTime     倒计时结束时间 必须输入
        @param  string  startTime   倒计时起始时间 没有输入 按照 当前时间计算
*/ 

function myGetCountDown( endTime , startTime ){

    //  创建 起始时间对象
    //  如果 没有起始时间参数 获取 当前时间对象
    //  如果 有起始时间参数 获取 输入时间 对应的 时间对象
    var start =  startTime === undefined ? new Date() : new Date( startTime );

    //  终止时间对象
    //  必须有终止时间输入
    var end = new Date( endTime );

    //  获取时间差  单位需要换算成秒
    //  时间对象 - 0 自动 转化为 时间戳数据 
    //  这个方法 移动端 低版本IE不支持 不要使用 
    var time = parseInt( ( end.getTime() - start.getTime() ) / 1000 );

    //  计算天
    var day = parseInt( time / (24*60*60) );

    //  计算小时
    var hour = parseInt( time % (24*60*60) / (60*60) );

    //  计算分钟
    var minute = parseInt( time % (60*60) / 60 );

    //  计算秒
    var second = time % 60 ;

    //  将 结果 设定为 对象 作为返回值
    return { day:day , hour:hour , minute:minute , second:second };

}


/*
    getUrlValObj    获取浏览器地址栏参数数据对象
        @return object  获取浏览器地址栏参数数据对象
        如果 多个参数 键名相同 使用 数组形式存储不同的键值

*/ 

function getUrlValObj(){
    // 创建 空对象 
    var obj = {} ;

    // 获取url地址携带参数字符串 不要第一个 ? 问号
    var str = window.location.search.substr(1) ;

    // 将 字符串 按照 & 符号 分割为数组
    // 数组单元存储的是 参数键值对
    var arr1 = str.split('&');

    // 循环遍历数组 将 参数键值对 按照 = 等号 分割 
    arr1.forEach( function(item){
        // item 就是 参数键值对 字符串 
        // arr2[0] 键名   arr[1] 键值
        var arr2 = item.split('=') ;

        // 使用 arr2[0] 键名 从 对象中调用数据 
        if( obj[ arr2[0] ] === undefined ){
            // 调用结果是 undefined
            // 证明 obj 对象中 没有这个键名 
            // 证明 这个键名 是 第一次 出现
            // 给 obj 对象 新增 arr2[0] 键名 存储 arr2[1] 键值
            // 存储的数据 需要还原为对应的汉字特殊符号
            obj[ arr2[0] ] = window.decodeURIComponent( arr2[1] );


        }else{
            // 调用结果不是 undefined
            // 证明 obj 对象中 已经存在这个属性
            // 判断 存储属性值的数据类型
            if( typeof( obj[ arr2[0] ] ) === 'string' ){
                // 如果 存储 的 数据数值 是 字符串 类型 
                // 需要 覆盖赋值 存储 数组类型 
                // 数组类型的第一个值 是 原始存储的数据 第二个值 是 当前键值对的键值
                // 存储的数据 需要还原为对应的汉字特殊符号
                obj[ arr2[0] ] = [ obj[ arr2[0] ] , window.decodeURIComponent( arr2[1] ) ] ;

            }else{
                // 如果 存储 的 数据数值 不是 字符串 类型 
                // 存储的数据数值 是 数组类型
                // 直接 push写入 当前键值对的键值
                // 存储的数据 需要还原为对应的汉字特殊符号
                obj[ arr2[0] ].push( window.decodeURIComponent( arr2[1] ) );
            }
        }

    })

    // 执行结果返回值 是 这个对象 
    return obj ;
}

