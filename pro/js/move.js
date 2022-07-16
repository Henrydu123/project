/*
    move    运动函数
        @param  object      ele         要修改css样式的标签对象
        @param  object      object      要修改css样式的属性 和 最终值
        @param  function    callback    运动停止 触发执行的回调函数
                                        默认值是 空函数

        整个运动函数 变量定义 
        不要使用关键词 var  
        必须使用关键词 let 

        运动函数只是 简单的封装 
        兼容 多属性运动 
        兼容 透镜度属性设定

        只能 通过 定时器的时间间隔 和 步长值计算的除数 
        设定 运动执行的快慢

        不能设定 运动执行的指定的时间

        不能改变 颜色
*/
function move(ele, object, callback = function () { }) {
    // 1,   定义变量 存储 定时器个数
    let num = 0;

    // 2,   循环遍历 参数2 对象 
    for (let type in object) {
        // type  是 对象的属性 也就是 要运动的css样式属性
        // object[type] 是 对象的属性值 也就是 要运动的css样式的 最终值

        // 2-1 变量 存储 定时器 个数 累加1
        num++;

        // 2-2 获取 初始值 兼容透明度
        // 如果 属性 是透明度 获取结果 * 100 
        // 如果 属性 不是透明度 获取结果 使用 parseInt() 获取整数部分
        let start = type === 'opacity' ? window.getComputedStyle(ele)[type] * 100 : parseInt(window.getComputedStyle(ele)[type]);

        // 2-3 获取 最终值 兼容透明度
        // 如果 属性 是 透明度 对象存储最终值 * 100 
        // 如果 属性 不是透明度 对象存储最终值 
        let end = type === 'opacity' ? object[type] * 100 : object[type];

        // 2-4 设定定时器
        let time = setInterval(function () {
            // 2-4-1 计算步长
            // ( 最终值 - 初始值 ) / 数值
            var step = (end - start) / 5;

            // 2-4-2 步长值 取整
            // 正数 向上取整 负数 向下取整
            step = step > 0 ? Math.ceil(step) : Math.floor(step);

            // 2-4-3 初始值 累加步长值
            start += step;

            // 2-4-4 新初始值 赋值给 标签 对应属性 兼容透明度
            ele.style[type] = type === 'opacity' ? start / 100 : start + 'px';

            // 2-4-5 初始值 累加值 最终值
            if (start === end) {
                // 清除定时器
                clearInterval(time);

                // 存储 定时执行个数变量 累减1
                num--;

                // 如果 num存储数值是 0 
                // 也就是 所有的定时器都被清除了
                // 也就是运动停止 触发执行 回调函数
                if (num === 0) {
                    callback();
                }
            }
        }, 30);
    }
}