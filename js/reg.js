(function () {
    /**
     * 验证账号
     */
    const txtLoginIdValidor = new FieldValidator('#txtLoginId', async (value) => {
        if (!value) return '账号是必填！'
        const res = await API.existsApi(value)
        if (res.code === 0) {
            return res.msg
        }
    })

    /**
     * 验证昵称
     */
    const txtNicknameValidor = new FieldValidator('#txtNickname', (value) => {
        if (!value) return '昵称是必填！'
    })

    /**
    * 验证密码
    */
    const txtLoginPwdValidor = new FieldValidator('#txtLoginPwd', (value) => {
        if (!value) return '密码是必填！'
    })


    /**
    * 验证二次密码
    */
    const txtLoginPwdConfirmValidor = new FieldValidator('#txtLoginPwdConfirm', (value) => {
        if (!value) return '必填！'
        if (value !== txtLoginPwdValidor.targetDOM.value) return '两次输入的密码不一致！'
    })

    /**
     * 表单提交
     */
    const formDOM = $('.user-form')
    formDOM.onsubmit = async (e) => {
        e.preventDefault()
        const form = [
            txtLoginIdValidor,
            txtNicknameValidor,
            txtLoginPwdValidor,
            txtLoginPwdConfirmValidor
        ]
        const validate = await FieldValidator.validatorForm(form)
        if (!validate) return
        const formData = new FormData(formDOM)
        const data = Object.fromEntries(formData.entries())
        const res = await API.regApi(data)
        if (res.code === 0) {
            alert('注册成功！点击确定跳转登录。')
            location.href = './login.html'
        } else {
            alert('注册失败！')
            txtLoginIdValidor.errDOM.innerText = res.msg
        }

    }
})()