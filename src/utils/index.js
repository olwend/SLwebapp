export const querystring = (name, url) => {
    name = name.replace(/[[]]/g, "\\$&")
    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i")
    const results = regex.exec(url)
    if (!results) return null
    if (!results[2]) return ''
    return decodeURIComponent(results[2].replace(/\+/g, " "))
}

export const apiFnc = async (fnc, header, msg, setApiError, setShowError) => {
    try {
        await fnc
    } catch (error) {
        setApiError({ header: header, message: msg, data: error})
        console.error(error)
        setShowError(true)
    }
}

export const arrayFormatter = (cell) => {
    if (cell !== undefined ) {
        try {
            return cell.map(a => a.value).sort().join(',')
        } catch (error) {
            console.log(error)
        }
    }
}

export const surroundWithProgressTrackingPromise = (initial, maximum, interval, step = 1, setCurrent, promise, exitOnReachingMaximum = false) => new Promise((resolve, reject) => {
    let progress = initial
    const intervalID = setInterval(() => {
        if (progress < maximum) {
            progress = progress + step
            if (progress > maximum)
                progress = maximum
            setCurrent(progress)
        } else {
            clearInterval(intervalID)
            if (exitOnReachingMaximum)
                reject(new Error('Timeout reached with the promise/s unsolved'))
        }
    }, interval)
    promise
        .then(value => resolve(value))
        .catch(reason => reject(reason))
        .finally(async () => {
            clearInterval(intervalID)
        })
})
