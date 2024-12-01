function $(selected, multiple = false) {
    return multiple ? document.querySelectorAll(selected) : document.querySelector(selected)
}

/**
 * 创建动画
 * @param {Object} options  
 * @param {Number} options.form  动画起始位置
 * @param {Number} options.to  动画结束位置
 * @param {Number} options.totalMS  动画执行完成的时间,默认值 1000
 * @param {Number} options.duration  动画执行的频率，默认值 15
 * @param {Function} options.onMove  动画执行的时的触发，参数当前变化完成的值
 * @param {Function} options.onEnd  动画执行完成时触发
 * @example createAnimation({
    form: 500,
    to: 99,
    totalMS: 1000,
    duration: 15,
    onMove(n) {},
    onEnd() { }
})
 */
function createAnimation(options) {
    let form = options.form;
    let to = options.to;
    let totalMS = options.totalMS || 1000;
    let duration = options.duration || 10;
    let times = Math.floor(totalMS / duration);
    let changeNum = (to - form) / times;
    let curIndex = 0;

    const timerId = setInterval(handleSetIntervalCallback, duration)

    function handleSetIntervalCallback() {
        form += changeNum;
        curIndex++;
        options.onMove && options.onMove(form)
        if (curIndex === times) {
            curIndex = 0
            form = to;
            options.onEnd && options.onEnd()
            clearInterval(timerId);
        }
    }
}

/**
 * 得到一个指定范围内的随机整数
 * @param {number} min 范围的最小值
 * @param {number} max 范围的最大值（无法取到最大值）
 * @return {number} 范围内的随机整数
 */
function getRandom(min, max) {
    // Math.random()                        [0 , 1)
    // Math.random() * (max - min)          [0 , max- min)
    // Math.random() * (max - min) + min    [min, max)
    return Math.floor(Math.random() * (max - min) + min)
}


/**
 * 补0函数，如果数字小于10，则会补充0
 * @param {Number} num 
 * @returns {String} num
 */
function patchZero(num) {
    return num < 10 ? `0${num}` : num.toString()
}

/**
 * 防抖函数
 * @param {Function}
 */
function debounce(callback, delay = 200) {
    let timer;
    return function () {
        if (timer) return
        timer = setTimeout(() => {
            clearTimeout(timer)
            timer = null
            callback()
        }, delay)
    }
}

const XHR = new XMLHttpRequest()  // 创建发送请求对象
/**
 * XHR请求方法
 * @param {Object} options 配置项
 * @param {String} options.methods 请求方法，默认GET
 * @param {String} options.url 请求地址
 * @param {Object} options.headers 请求头配置项
 * @param {*} options.request 请求体
 * @param {Function} callback 相应成功后的回调函数
 */
const XHRHttp = ({ methods = 'GET', url = '', headers = {}, request } = {}, callback) => {
    XHR.onreadystatechange = () => {
        // 0: 刚刚创建好了请求对象，但还未配置请求（未调用open方法）
        // 1. open方法已被调用
        // 2. send方法已被调用
        // 3. 正在接收服务器的响应消息体
        // 4. 服务器响应的所有内容均已接收完毕
        XHR.readyState === 1 && console.log('open方法已被调用:', XHR.readyState);
        XHR.readyState === 2 && console.log('send方法已被调用:', XHR.readyState);
        XHR.readyState === 3 && console.log('正在接收服务器的响应消息体:', XHR.readyState);
        XHR.readyState === 4 && console.log('服务器响应的所有内容均已接收完毕:', XHR.readyState);

        if (XHR.readyState === 3) {
            console.log('响应头', XHR.getAllResponseHeaders());
        }
        if (XHR.readyState === 4) {
            callback(XHR.response)
        }
    }


    XHR.open(methods, url)
    for (const key in headers) {
        XHR.setRequestHeader(key, headers[key])
    }
    XHR.send(request)
}


/**
 * fetch请求方法
 * @param {String} url 请求地址
 * @param {Object} options fetch函数配置项
 * @param {*} options.body 请求体
 * @returns {Promise} 响应体
 */
const fetchHttp = async (url = '', options = {}) => {
    const responseHeaders = await fetch(url, options)
    for (const item of responseHeaders.headers) {
        console.log('响应头', item);
    }
    return await responseHeaders.json()
}