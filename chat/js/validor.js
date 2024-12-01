class FieldValidator {
    /**
     * 验证
     * @param {String} selector 
     * @param {Function} validatFn 
     */
    constructor(selector, validatFn) {
        this.targetDOM = document.querySelector(selector)
        this.errDOM = this.targetDOM.nextElementSibling
        this.validatFn = validatFn
        this.targetDOM.onblur = () => this.validator()
    }

    /**
     * 验证信息
     */
    async validator() {
        const errMessage = await this.validatFn(this.targetDOM.value)
        if (!errMessage) {
            this.errDOM.innerText = '';
            return true
        }
        else {
            this.errDOM.innerText = errMessage;
            return false
        }
    }

    /**
     * 统一验证
     * @param {Array} validators 
     */
    static async validatorForm(validators) {
        return Promise.all(validators.map(v => v.validator())).then(results => results.every(j => j))
    }
}