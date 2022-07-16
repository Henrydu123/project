// 创建面向对象轮播图构造函数
// 参数1 创建轮播图的标签对象
// 参数2 创建轮播图的数组
class CreateBannerObj {
    constructor(element, array) {
        // 定义属性 存储 参数
        this.ele = element;
        this.arr = array;

        // 多个函数中要使用的数据 定义成实例化对象的属性和属性值
        this.oUl;
        this.oOl;
        this.oUlLis;
        this.oOlLis;
        this.liWidth;
        this.time;
        this.index = 1;
        this.flag = true;
    }

    // 定义入口函数 触发执行 所有需要调用的函数程序
    init(){
        // 调用触发 init() 
        // 就 等于调用触发 设定的所有函数
        this.setPage();
        this.autoLoop();
        this.setMouse();
        this.setClick();
        this.setHidden();
    }

    // 定义函数方法1    动态生成页面
    setPage() {
        // 创建 div标签节点 div标签节点中有 左右 两个切换超链接
        // 创建 ul ol 标签对象 根据数组 动态生成内容
        // 将 ul ol div 标签节点 写入 父级div标签中
        // 获取 ul>li ol>li 
        // 克隆 ul>li 中的第一个 写入 ul末位 
        // 克隆 ul>li 中的最后一个 写入 ul起始 
        // 根据 ul>li 个数 和 ul>li 宽度 设定 ul标签 宽度 
        // 将 ul标签 向左定位一个li宽度

        // 创建div标签 写入 左右切换 焦点按钮
        // 只有一个函数需要使用的数据 可以 只 定义成这个函数中的变量数据
        const oDiv = document.createElement('div');
        oDiv.innerHTML = '<a name="left" href="JavaScript:;">&lt;</a><a name="right" href="JavaScript:;">&gt;</a>';

        // 创建 ul标签对象 
        this.oUl = document.createElement('ul');

        // 创建 ol标签对象 
        this.oOl = document.createElement('ol');

        // 根据数组 循环遍历 动态生成 ul>li ol>li
        this.arr.forEach((item, key) => {
            // item 是 数组中存储的数据单元的数据数值 也就是 { }
            // key  是 这个数据单元的索引下标

            // ul标签中 innerHTML 拼接写入 li标签
            this.oUl.innerHTML += `<li name="ulLi"><img src="${item.src}" alt=""></li>`;

            // ol标签中 innerHTML 拼接写入 li标签
            // 第一个ol>li 添加 class,active
            this.oOl.innerHTML += key === 0 ? `<li name="olLi" key="${key}" class="active"></li>` : `<li name="olLi" key="${key}"></li>`;
        })

        // 将 ul ol div 标签 写入 banner轮播图
        this.ele.appendChild(this.oUl);
        this.ele.appendChild(this.oOl);
        this.ele.appendChild(oDiv);

        // 获取 ul>li 和 ol>li
        this.oUlLis = this.oUl.querySelectorAll('li');
        this.oOlLis = this.oOl.querySelectorAll('li');

        // 克隆 ul>li 中 第一个 和 最后一个 li标签
        var cloneFirst = this.oUlLis[0].cloneNode(true);
        var cloneLast = this.oUlLis[this.oUlLis.length - 1].cloneNode(true);

        // 将 克隆的第一张图片 写入 ul标签的末位
        this.oUl.appendChild(cloneFirst);

        // 将 克隆的最后一张图片 写入 ul标签的起始
        // 也就是 写入 ul标签中 第一个li标签 的 前面
        this.oUl.insertBefore(cloneLast, this.oUlLis[0]);

        // 重新设定 ul标签的宽度 
        // 宽度是 li标签宽度 * li标签个数
        // li标签个数 一定是 数组单元个数+2

        // 获取 li标签的占位
        this.liWidth = this.oUlLis[0].offsetWidth;

        // 设定 ul标签宽度  需要拼接 px 单位
        this.oUl.style.width = this.liWidth * (this.arr.length + 2) + 'px';

        // ul标签中 克隆写入两个li标签 
        // 默认状态 应该显示 原始轮播图第一张图片
        // 现在是 ul标签中 第二个图片 
        // 需要将 ul标签 向左定位一个li的宽度
        this.oUl.style.left = -this.liWidth + 'px';
    }

    // 定义函数方法2    自动轮播
    autoLoop() {
        // 设定定时器 每间隔一段时间 通过 move运动函数 切换 轮播图片
        this.time = setInterval(() => {
            // 每次执行定时器 也就是 要显示下个 ul>li
            // 也就是要显示的 ul>li 索引下标 要 累加1
            this.index++;

            // 调用函数 切换焦点样式
            // 构造函数中 调用 定义的函数方法 
            // 也必须是 this.函数() ;
            this.setFocusStyle();

            // 通过 调用 move() 运动函数 
            // 实现 ul标签 运动切换效果
            // 每次定位的数值 应该是 - ul>li索引下标 * li宽度 

            // 参数3 是 回调函数 的 函数名称
            // 本质是 绑定一个 回调函数 
            // 此时 不是 执行 回调函数

            // 回调函数 需要在 move()运动函数中触发执行 
            // 需要设定 this指向 为 实例化对象 

            // 解决方法1 bind() 生成绑定一个新的函数 
            // this指向 是 实例化对象 
            // move(this.oUl, { left: -this.index * this.liWidth }, this.loopEnd.bind( this ) );

            // 解决方法2 定义一个箭头函数 在箭头函数中 调用 回调函数
            move(this.oUl, { left: -this.index * this.liWidth }, () => {
                // 在 箭头函数中 调用 回调函数
                this.loopEnd();
            });


        }, 2000)
    }


    // 定义函数方法3    焦点样式切换函数
    setFocusStyle() {
        // 给所有的ol>li 清除class,active
        this.oOlLis.forEach((item) => {
            // item 是 ol>li 标签对象
            item.classList.remove('active');
        })

        if (this.index === this.arr.length + 1) {
            // 如果 index 是 ul>li 最后一个标签的索引下标 
            // 是 原始轮播图 第一张 也就是 当前 ul>li 第二张
            // 对应的是 ol>li 第一个 焦点标签
            this.oOlLis[0].classList.add('active');

        } else if (this.index === 0) {
            // 如果 index 是 ul>li 第一个标签的索引下标
            // 是 原始轮播图 最后一张 也就是 当前 ul>li 倒数第二张
            // 对应的是 ol>li 最后一个 焦点标签
            this.oOlLis[this.oOlLis.length - 1].classList.add('active');


        } else {
            // 给 index-1 对应的 ol>li 添加 class,active
            this.oOlLis[this.index - 1].classList.add('active');
        }


    }

    // 定义函数方法4    轮播结束触发的回调函数
    loopEnd() {

        // 当前最后一个ul>li的索引下标是 原始数组长度+1
        if (this.index === this.arr.length + 1) {
            // 切换显示当前ul>li 中的 第二个 
            // 也就是 索引下标是 1 的 第二个 ul>li
            this.index = 1;

            // ul定位的切换 是 瞬间完成的 不用move()运动函数 
            this.oUl.style.left = -this.index * this.liWidth + 'px';

            // 当前第一个ul>li的索引下标是 0
        } else if (this.index === 0) {
            // 切换显示当前ul>li中的 倒数第二个
            // 也就是 索引下标是 imgArr.length 倒数第二个 ul>li
            this.index = this.arr.length;

            // ul定位的切换 是 瞬间完成的 不用move()运动函数 
            this.oUl.style.left = -this.index * this.liWidth + 'px';
        }

        // 轮播图运动结束 
        // 变量重新赋值 true 
        // 可以 再次 触发调用 move()运动函数
        this.flag = true;
    }

    // 定义函数方法5    鼠标的移入移出
    setMouse() {
        // 给 整个div 添加鼠标移入事件
        this.ele.addEventListener('mouseenter', () => {
            // 清除定时器
            clearInterval(this.time);
        })

        // 给 整个div 添加鼠标移出事件
        this.ele.addEventListener('mouseleave', () => {
            // 再次调用 自动轮播函数
            this.autoLoop();
        })
    }


    // 定义函数方法6 鼠标点击事件
    setClick() {
        // 给 父级div标签 添加点击事件 
        this.ele.addEventListener('click', (event) => {
            // 如果 点击标签 name属性值是 right 点击的是 右切换按钮
            if (event.target.getAttribute('name') === 'right') {
                // 添加判断防止点击过快
                // if( flag ){
                //     flag = false ;
                // }else{
                //     return ;
                // }

                // 添加判断防止点击过快
                if (!this.flag) return;
                this.flag = false;

                // 显示 右侧的轮播图片
                // 也就是 下一个 ul>li
                // index存储的数值需要累加 1 
                this.index++;

                // 设定 焦点按钮 css样式
                this.setFocusStyle();

                // 调用move()运动函数 实现ul定位 运动切换
                move(this.oUl, { left: -this.index * this.liWidth }, this.loopEnd.bind(this));

                // 如果 点击标签 name属性值是 left 点击的是 左切换按钮
            } else if (event.target.getAttribute('name') === 'left') {
                // 添加判断防止点击过快
                if (!this.flag) return;
                this.flag = false;

                // 显示 左侧的轮播图片
                // 也就是 上一个 ul>li
                // index存储的数值需要累减 1 
                this.index--;

                // 设定 焦点按钮 css样式
                this.setFocusStyle();

                // 调用move()运动函数 实现ul定位 运动切换
                move(this.oUl, { left: -this.index * this.liWidth }, this.loopEnd.bind(this));


                // 如果 点击标签 name属性值是 olLi 点击的是 焦点按钮
            }
            else if (event.target.getAttribute('name') === 'olLi') {
                // 添加判断防止点击过快
                if (!this.flag) return;
                this.flag = false;

                // 获取 点击的ol>li 标签 索引下标 
                // 索引下标+1 是 对应的 ul>li标签 索引下标 
                // 赋值给 index 存储
                this.index = Number(event.target.getAttribute('key')) + 1;

                // 设定 焦点按钮 css样式
                this.setFocusStyle();

                // 调用move()运动函数 实现ul定位 运动切换
                move(this.oUl, { left: -this.index * this.liWidth }, this.loopEnd.bind(this));
            }
        })

    }

    // 步骤7 防止点击过快 
    // 定义变量 存储 原始值 
    // 判断 如果是   原始值 赋值其他数值 
    // 判断 如果不是 原始值 触发执行return
    // 轮播图运动结束 变量 赋值 存储 原始 

    // 定义函数方法8 浏览器最小化
    setHidden() {
        // 视窗窗口 显示状态 改变 监听事件
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') {
                // 浏览器显示状态为 hidden 是 后台运行状态
                // 清除 自动轮播定时器
                clearInterval( this.time);

            } else if (document.visibilityState === 'visible') {
                // 浏览器显示状态为 visible 是 正常显示状态
                // 再次调用 自动轮播函数
                this.autoLoop();
            }
        })
    }

}