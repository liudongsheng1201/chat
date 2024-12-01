const API = (function () {
    const HTTP = 'https://study.duyiedu.com'
    const AUTHORIZATION = 'authorization'

    const get = (url) => {
        const headers = {}
        const authorization = localStorage.getItem(AUTHORIZATION)
        if (authorization) {
            headers[AUTHORIZATION] = 'Bearer' + ' ' + authorization
        }
        return fetchHttp(HTTP + url, { headers })
    }

    const post = async (url, body) => {
        const headers = {
            'Content-type': 'application/json'
        }
        const authorization = localStorage.getItem(AUTHORIZATION)
        if (authorization) {
            headers[AUTHORIZATION] = 'Bearer' + ' ' + authorization
        }
        return await fetch(HTTP + url, { headers, body: JSON.stringify(body), method: 'POST' })
    }

    /**
     * 注册
     * @param {*} userInfo 
     * @returns 
     */
    const regApi = async userInfo => {
        const headers = await post(`/api/user/reg`, userInfo)
        return headers.json()
    }

    /**
     * 登录
     */
    const loginApi = async loginInfo => {
        const headers = await post(`/api/user/login`, loginInfo)
        const result = await headers.json()
        if (result.code === 0) {
            const token = headers.headers.get(AUTHORIZATION)
            localStorage.setItem(AUTHORIZATION, token)
        }
        return result
    }

    /**
     * 验证账号
     */
    const existsApi = loginId => get(`/api/user/exists?loginId=${loginId}`)

    /**
     * 当前登录的用户信息
     */
    const profileApi = () => get(`/api/user/profile`)

    /**
     * 发送聊天消息
     */
    const chatApi = async content => {
        const headers = await post(`/api/chat`, { content })
        return headers.json()
    }

    /**
     * 获取聊天记录
     */
    const historyApi = () => get(`/api/chat/history`)


    return {
        regApi,
        loginApi,
        existsApi,
        profileApi,
        chatApi,
        historyApi,
        AUTHORIZATION
    }
})()