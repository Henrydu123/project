$(function () {
    // 1, 在 id是sc的a标签中 写入验证码 
    $('#sc').html(setVC({ bool: false })).click(function () { $('#sc').html(setVC({ bool: false })) })

    // 2, 给 账号input 添加 失去焦点并且数据改变事件
    $('[name="usename"]').change(function () {
        // 调用使用 async 和 await 定义的异步程序 
        selectName();
    })

    // 3, 给 注册button 添加点击事件 
    $('button').click(function () {
        let name = $('[name="usename"]').val();
        let pwd1 = $('[name="pass1"]').val();
        let pwd2 = $('[name="pass2"]').val();

        let vc1 = $('[name="yz"]').val();
        let vc2 = $('#sc').html()


        register();

    })
})
selectName()
async function selectName() {
    // 通过 await 向 PHP程序 发送请求
    let res = await myPromiseAjax({
        // 向PHP程序发送请求
        url: './server/goods_select_name.php',
        // 请求方式是PHP设定的post方式
        type: 'post',

        data: { userName: $('[name="usename"]').val() },

    });

    // 将 json字符串 结果 还原为 对应的数据类型
    res = JSON.parse(res);
    console.log(res);

    // 根据 res 的结果 向 页面 写入内容 
    if ($('[name="usename"]').val() == '') {
        $('.use').html(`<p></p>`)
    } else if (res.code === 1) {
        // 账号可以使用 写入提示信息
        $('.use').html(`<p></p>`)
    } else if (res.code === 0) {
        // 账号不能使用 写入提示信息
        $('.use').html(`<p>${res.msg}</p>`)
        7
    }
}

// 使用 async 封装函数  注册操作 
async function register() {

    let userName = $('[name="usename"]').val();
    let pwd1 = $('[name="pass1"]').val();

    // 使用 await 调用 函数 
    let res = await myPromiseAjax({
        url: './server/goods_register.php',
        type: 'post',
        data: {
            userName: userName,
            userPwd: pwd1,
        },

    });

    // res = JSON.parse(res);
    // console.log(res);

    // 根据res结果 执行不同程序 
    if (res.code === 0) {
        // 写入注册失败的提示信息
        window.alert('对不起,您注册失败')

        // 重置 验证码 
        $('#sc').html(setVC({ bool: false }));

    } else if (res.code === 1) {
        // 定义变量 存储 倒计时 
        //  let num = 10;

        window.alert('恭喜您注册成功')

        // let time = setInterval(() => {
        //     num--;

        //     if (num === 1) {
        //         clearInterval(time);
        //         window.location.href = './index.html';
        //     }
        // }, 1000);
    }
}
