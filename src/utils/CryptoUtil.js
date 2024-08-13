import CryptoJS from 'crypto-js'

const defaultKeyStr = 'jad962iut286dbaa'
const aesEncrypt = (text, keyStr) => {
    if (!keyStr) {
        keyStr = defaultKeyStr
    }
    const key = CryptoJS.enc.Utf8.parse(keyStr)
    const cipher = CryptoJS.AES.encrypt(text, key, {
        iv: key,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
    }).toString();
    return cipher
}

const aesDecrypt = (cipherText, keyStr) => {
    if (!keyStr) {
        keyStr = defaultKeyStr
    }
    const key = CryptoJS.enc.Utf8.parse(keyStr)
    const bytes = CryptoJS.AES.decrypt(cipherText, key, {
        iv: key,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
    });
    return bytes.toString(CryptoJS.enc.Utf8);

}

export default {
    aesEncrypt,
    aesDecrypt
}
