// 给 form标签 添加 submit 事件
$('form').submit(() => {
    // 应该是 获取数据 验证 账号 密码 格式 
    // 验证通过 触发执行 async封装的函数程序
    login();

    // 阻止默认事件 
    return false;
})

// async 封装的登录 请求 
async function login() {
    // 通过 await 调用 promise封装的函数
    let res = await myPromiseAjax({
        url: './server/goods_login.php',
        type: 'post',
        data: {
            userName: $('[type="text"]').val(),
            userPwd: $('[type="password"]').val(),
        },
    });

    // 结果是 json 字符串 转化为 对应的数据结构
    res = JSON.parse(res);

    console.log(res);

    // 根据 res 数据 动态渲染生成页面
    if (res.code === 0) {
        // 如果登录失败写入提示信息
        $('p').html('<p style="color:red">您登录失败 请检查账号密码</p>');

    } else if (res.code === 1) {
        // 登录成功 

        // 设定 cookie 登录信息 
        mySetCookie({
            key: 'login',
            val: 1,
            path: '/',
            time: 7 * 24 * 60 * 60,
        })

        // 定义变量 存储 倒计时 
        let num = 10;

        // 设定跳转页面
        // $('h2').html(`<span style="color:blue">恭喜您登录成功 ${num}秒 后 跳转 首页面</span>`);

        // 设定定时器
        //     let time = setInterval(() => {
        //         num--;
        //         $('h2').html(`<span style="color:blue">恭喜您登录成功 ${num}秒 后 跳转 首页面</span>`);
        //         if (num === 1) {
        //             clearInterval(time);
        //             window.location.href = './index.html';
        //         }

        //     }, 1000)
        // }
    }


}
