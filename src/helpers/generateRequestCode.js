import { CIPHER_KEY_DEV, PLAIN_REQUEST_CODE } from "./constants"
import { getFormattedDateTime } from "./getFormattedDateTime"
import aes from 'crypto-js/aes';



export const generateRequestCode = (mobile_number) => {
    let PLAIN_TEXT_REQUEST_CODE = `${PLAIN_REQUEST_CODE}|${getFormattedDateTime(new Date())}|${mobile_number}`
    console.log(PLAIN_TEXT_REQUEST_CODE);
    return generateCipher(PLAIN_TEXT_REQUEST_CODE)
}

const generateCipher = (message) => {
    return aes.encrypt(message, CIPHER_KEY_DEV).toString()
}