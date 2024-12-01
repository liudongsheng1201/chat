(function () {
    const txtLoginId = new FieldValidator('#txtLoginId', (value) => {
        if (!value) return '账号是必填'
    })

    const txtLoginPwd = new FieldValidator('#txtLoginPwd', (value) => {
        if (!value) return '密码是必填'
    })


    const formDOM = $('.user-form')
    formDOM.onsubmit = async (e) => {
        e.preventDefault()

        const valid = await FieldValidator.validatorForm([txtLoginId, txtLoginPwd])
        if (!valid) return
        const formData = new FormData(formDOM)
        const data  = Object.fromEntries(formData.entries())
        
        const res = await API.loginApi(data)
        if(res.code !== 0) {
            txtLoginId.errDOM.innerHTML = res.msg
            return
        }
        location.href = './index.html'
    }

})()