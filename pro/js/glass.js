// 放大镜面向对象编程构造函数
// 参数1    生成放大镜的标签对象
// 参数2    生成放大镜的数组信息
class setGlass{
    constructor( element , array ){
        // 使用 属性属性值 存储 构造器参数
        this.ele = element ;
        this.arr = array ;

        // 定义变量 存储 多个函数都需要使用的数据
        this.show ;
        this.img ;
        this.mask ;
        this.list ;
    }

    // 定义 入口函数 执行所有的函数方法
    init(){
        // 调用所有需要执行的函数程序
        this.setPage();
        this.setMouseShow();
        this.setMouseList();
        this.setMouseMove();
    }

    // 函数方法1 动态生成页面
    setPage(){
        // 创建显示区标签节点
        this.show = document.createElement('div');
        // 设定class属性值
        this.show.classList.add( 'show' );

        // 创建 显示区中 图片节点
        this.img = document.createElement('img');
        // 图片默认显示数组中第一组单元存储的图片
        this.img.setAttribute( 'src' ,  `./images/${this.arr[0].large}` );

        // 创建 遮盖层 div节点
        this.mask = document.createElement('div');
        // 设定class属性值
        this.mask.classList.add( 'mask' );

        // 将 图片 和 遮盖层写入 显示区
        this.show.appendChild( this.img );
        this.show.appendChild( this.mask );


        // 创建 列表区
        this.list = document.createElement('ul');
        // 设定class属性值
        this.list.classList.add( 'list' );

        // 定义变量存储 生成的li标签内容
        let liStr = '';
        // 循环遍历数组 生成字符串内容
        this.arr.forEach( (item , key) => {
            // item 是 数组中存储的对象 
            // key  是 索引下标 
            liStr += key === 0 ? `<li><img name="img" key="${key}" class="active" src="./images/${item.small}" alt=""></li>` : `<li><img name="img" key="${key}" src="./images/${item.small}" alt=""></li>` ;
        })
        // 将字符串内容写入 this.list ul标签
        this.list.innerHTML = liStr;

        // 创建 放大区
        this.glass = document.createElement('div');
        // 设定class属性值
        this.glass.classList.add( 'glass' );

        // 将 显示区 写入 box div 
        this.ele.appendChild( this.show ) ;
        // 将 列表区 写入 box div 
        this.ele.appendChild( this.list ) ;
        // 将 放大区 写入 box div 
        this.ele.appendChild( this.glass ) ;

    }

    // 函数方法2 鼠标移入移出 显示区
    setMouseShow(){
        // 给 show,div 添加 鼠标移入事件
        this.show.addEventListener( 'mouseenter' , ()=>{
            // 遮盖层 显示
            this.mask.style.display = 'block';
            // 放大镜 显示
            this.glass.style.display = 'block';
        })

        // 给 show,div 添加 鼠标移出事件
        this.show.addEventListener( 'mouseleave' , ()=>{
            // 遮盖层 隐藏
            this.mask.style.display = 'none';
            // 放大镜 隐藏
            this.glass.style.display = 'none';
        })
    }

    // 函数方法3 鼠标移入 列表区
    setMouseList(){
        // 获取 所有 ul>li>img
        const oImgs = this.list.querySelectorAll('li>img');
        console.log( oImgs );

        // 推荐使用 事件委托语法形式 
        // 给 父级box,div标签 添加 鼠标移入事件 
        // 判断 移入的标签 是 img 图片标签时 触发程序
        this.ele.addEventListener( 'mouseover' , event => {
            // 如果标签name属性值 是 img 证明 鼠标经过 ul>li>img 标签 
            if( event.target.getAttribute('name') === 'img' ){
                // 给 所有 img标签 清除 class,active
                oImgs.forEach( item =>{
                    // item 是 img 图片标签 
                    item.classList.remove('active');
                })

                // 给 触发事件的 img标签 添加 class,active
                event.target.classList.add('active');

                // 设定 显示区 img标签 src属性
                // 和 触发事件的img标签 索引下标相同的数组单元的图片路径

                // img图片标签 src属性设定
                this.img.setAttribute( 'src' ,  `./images/${this.arr[ Number( event.target.getAttribute('key') ) ].large}` );


                // 设定 放大区 div标签 背景图片 url地址
                // 和 触发事件的img标签 索引下标相同的数组单元的图片路径

                // div标签 背景图片css样式设定
                // 只设定背景图片路径地址的改变 背景图片其他css样式不改变
                this.glass.style.backgroundImage = `url("./images/${this.arr[ Number( event.target.getAttribute('key') ) ].large}")`;
            }

        })




        // 给 三个图片 添加 鼠标移入事件
        // oImgs.forEach( (item , key) => {
        //     // item 是 img标签对象
        //     // key  是 索引下标
        //     // 添加 鼠标移入事件
        //     item.addEventListener( 'mouseenter' , ()=>{
        //         // 清除所有的 图片标签 class,active
        //         oImgs.forEach( i => {
        //             i.classList.remove( 'active' );
        //         })

        //         // 给触发事件的img标签 添加 class,active
        //         item.classList.add( 'active' );

        //         // 设定 显示区 img标签 src路径 
        //         // 经过 img标签 索引下标 对应的 数组单元 图片路径

        //         // img标签 src属性
        //         this.img.setAttribute( 'src' ,  `./images/${this.arr[ key ].large}` );

        //         // 设定 背景图 src路径
        //         // 经过 img标签 索引下标 对应的 数组单元 图片路径

        //         // div标签css样式 
        //         // 只是 修改 背景图片路径这一个属性
        //         // 其他属性 例如 背景图片定位 背景图片大小 背景图片重复 等等 属性都不修改
        //         this.glass.style.backgroundImage = `url("./images/${this.arr[ key ].large}")`;

        //     })
        // })
    }

    // 函数方法4 显示区 鼠标移动
    setMouseMove(){
        // 给 show标签 添加 鼠标移动事件
        this.show.addEventListener( 'mousemove' , event => {
            // 获取 鼠标坐标 
            // 如果 标签有固定定位 不跟随页面一起滚动 使用 client
            // 如果 标签根据页面一起滚动 使用 page

            // 获取坐标数据 

            // 外间距 根据不同的css样式设定 获取对应标签的外间距
            // 获取 box div标签的外间距
            let boxLeft = this.ele.offsetLeft ;
            let boxTop = this.ele.offsetTop ;

            // 边框线宽度 show div 的边框线
            let borderLeft = this.show.clientLeft ;
            let borderTop = this.show.clientTop ;

            // show div 占位 内容+padding
            let showWidth = this.show.clientWidth ;
            let showHeight = this.show.clientHeight ;

            // 遮盖层 div 占位 内容+padding+border
            let maskWidth = this.mask.offsetWidth;
            let maskHeight = this.mask.offsetHeight;

            // 计算 定位坐标 
            // 鼠标定位 - 外间距 - 边框线 - 遮盖层/2
            let x = event.pageX - boxLeft - borderLeft - maskWidth/2 ;
            let y = event.pageY - boxTop - borderTop - maskHeight/2 ;

            // 设定极值 

            // 最小值 0 
            x = x < 0 ? 0 : x ;
            y = y < 0 ? 0 : y ;

            // 最大值 显示区占位 - 遮盖层占位
            x = x > showWidth - maskWidth ? showWidth - maskWidth : x ;
            y = y > showHeight - maskHeight ? showHeight - maskHeight : y ;

            // 将结果 赋值给 遮盖层定位 
            // 需要拼接px单位
            this.mask.style.left = x + 'px';
            this.mask.style.top = y + 'px';


            // 给 放大区 背景图片定位
            // 背景图定位数值 和 遮盖定位数值 关系 
            // 反向相反 数值 成 等比例关系 
            // 当前的css样式 是 *4
            this.glass.style.backgroundPosition = `-${x*4}px -${y*4}px`;

        })
    }


}