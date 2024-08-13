import http from './index'
import CryptoUtil from "@/utils/CryptoUtil.js";
const getCaptchaImage = () => {
    return http.get('upm/common/captcha/image')
}

const checkCaptchaCode = (uuid, code) => {
    const params = {
        uuid,
        code
    }
    return http.get('upm/common/captcha/check', {params})
}

const sendSmsCode = (mobile) => {
    return http.post(`smart-sms/code?mobile=${mobile}`)
}

const userRegister = (data) => {
    return http.post('upm/common/user/register', data)
}

const loginUsername = (loginname, loginpass, uuid, code) => {
    const username = window.btoa(CryptoUtil.aesEncrypt(loginname))
    const password = window.btoa(CryptoUtil.aesEncrypt(loginpass))
    return http.post(`login/username?username=${username}&password=${password}&uuid=${uuid}&code=${code}`)
}

const loginMobile = (mobile, smsCode) => {
    return http.post(`login/mobile?mobile=${mobile}&smsCode=${smsCode}`)
}

const logout = () => {
    return http.post(`login/userLogout`)
}

const getCurrentUserInfo = () => {
    return http.get('/upm/smart-user/current/info')
}

const resetCurrentUserPassword = (oldPassword, newPassword) => {
    return http.put(`/upm/smart-user/current/password/reset?oldPassword=${oldPassword}&newPassword=${newPassword}`)
}

export default {
    getCaptchaImage,
    checkCaptchaCode,
    sendSmsCode,
    userRegister,
    loginUsername,
    loginMobile,
    getCurrentUserInfo,
    resetCurrentUserPassword,
    logout
}
