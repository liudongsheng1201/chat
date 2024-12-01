(async function () {
    const USER_INFO = 'userInfo'
    /**
     * 退出登录
     */
    const close = () => {
        localStorage.removeItem(API.AUTHORIZATION)
        localStorage.removeItem(USER_INFO)
        location.href = './login.html'
    }

    /**
     * 验证当前用户
     */
    const res = await API.profileApi()
    if (res.code !== 0) {
        alert(res.msg)
        close()
        return
    } else {
        localStorage.setItem(USER_INFO, JSON.stringify(res.data))
        $('#nickname').innerHTML = res.data.nickname
        $('#loginId').innerHTML = res.data.loginId
    }

    /**
     * 获取历史消息
     * @returns 
     */
    const getHis = async () => {
        const res = await API.historyApi()
        if (res.code !== 0) {
            alert(res.msg)
            location.href = './login.html'
            return
        }
        res.data.forEach(item => {
            sendMsg(item.from, item)
        })

    }

    const containerDOM = $('.chat-container')
    const formDOM = $('.msg-container')

    /**
     * 发送消息
     * @param {String | null} type 有值是用户，无值是机器人
     * @param {Object} data  消息信息
     * @param {String} data.content 消息内容
     * @param {Number} data.createdAt 发送消息的时间戳
     */
    const sendMsg = (type, data) => {
        const div = document.createElement('div')
        div.classList = `chat-item ${type ? 'me' : ''}`
        const avatar = type ? 'avatar.png' : 'robot-avatar.jpg'
        const time = new Date(data.createdAt).toLocaleString()
        div.innerHTML = `
            <img class="chat-avatar" src="./asset/${avatar}" />
            <div class="chat-content">${data.content}</div>
            <div class="chat-date">${time}</div>
        `
        containerDOM.appendChild(div)
        containerDOM.scrollTop = containerDOM.scrollHeight
        formDOM.reset()
    }

    /**
     * 提交发送的消息
     * @param {*} e 
     * @returns 
     */
    const submit = async (e) => {
        e.preventDefault()
        const formData = new FormData(formDOM)
        const data = Object.fromEntries(formData.entries())
        if (!data.content) return
        data.createdAt = new Date().getTime()
        sendMsg('me', data)
        const res = await API.chatApi(data.content)
        if (res.code !== 0) {
            alert(res.msg)
            location.href = './login.html'
            return
        }
        sendMsg(null, res.data)
    }

    /**
     * 绑定事件
     */
    const bindEvent = () => {
        formDOM.onsubmit = submit;
        $('.close').onclick = close
    }

    getHis()
    bindEvent()
})()