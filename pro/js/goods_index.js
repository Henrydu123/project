// 退出登录 按钮 点击事件 
$('[name="logout"]').click(() => {
    // 获取 cookie 数据信息 
    const cookieObj = myGetCookie();
    console.log(cookieObj);

    // 使用 登录信息键名 login 
    // 从 cookie对象中 调动数据 
    if (cookieObj.login === undefined) {
        // 没有登录 信息  弹出确认框 点击确定跳转 登录页 
        if (window.confirm('您还是没有登录 点击确定 跳转登录页')) {
            window.location.href = './login.html';

        }


    } else {
        // 有登录信息 执行 退出登录操作 
        // 设定 login cookie 相同的键名 相同的路径 键值随便写 时效是负数/0
        mySetCookie({
            key: 'login',
            path: '/',
            val: 100,
            time: -1,
        })

        // 弹出提示框 
        window.alert('您已经退出登录');
    }
})

// 购物车 按钮 点击事件
$('[name="cart"]').click(() => {
    // 获取 cookie 数据 
    const cookieObj = myGetCookie();

    // 使用 login 调用 数据  
    if (cookieObj.login === undefined) {

        // 没有登录 信息  弹出确认框 点击确定跳转 登录页 
        if (window.confirm('您还是没有登录 点击确定 跳转登录页')) {
            window.location.href = './login.html';

        }

    } else {
        // 有登录信息 跳转 购物车页面
        window.location.href = './cart.html';
    }

})


/*
    首页面 

        1,  退出登录

            获取 cookie 数据信息 

            有 登录信息 退出登录 

            没有登录信息 弹出 确认框 
                用户点击确认 跳转 登录页

        2,  购物车 

            获取 cookie 数据信息 

            有 登录信息 跳转购物车 页面  

            没有登录信息 弹出 确认框 
                用户点击确认 跳转 登录页

        3,  分类菜单 

            点击 分类菜单 
            跳转 列表页 
            传参点击的标签 分类名称

            分类名称 是根据数据库 一级分类 二级分类 ..... 
            这样的 无限极 菜单数据库 生成的内容

            目前我们就使用 固定的标签 传参数据

*/