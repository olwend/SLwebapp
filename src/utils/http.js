import axios from 'axios'

export const isStatusAServerError = statusCode => (statusCode && statusCode >= 500) ? true : false

export const isUrlAvailable = async url => {
    let result
    try {
        let response = await axios.get(url)
        response && !isStatusAServerError(response.status) ? result = true : result = false
    } catch(e) {
        !isStatusAServerError(e.request.status) ? result = true : result = false
    }
    return result
}

export const isUrl200 = async url => {
    let result = false
    try {
        let response = await axios.get(url)
        response && response.status === 200 ? result = true : result = false
    } catch(e) {}
    return result
}

export const checkUntilUrlIsAvailable = url => new Promise(resolve => {
    const intervalID = setInterval(async () => {
        if (await isUrl200(url)) {
            clearInterval(intervalID)
            resolve(true)
        }
    }, 10000)
})
