// throttle-debounce
const throttle = (callback, time = 100, ...options) => {
    let activated = true
    return function () {
        if (activated) {
            callback(...options)
            activated = false
            setTimeout(function () {
                activated = true
            }, time)
        }
    }
}

const throttleHelper = (time) => {
    let activated = true
    return function () {
        console.log("call")
        if (activated) {
            console.log("pass")
            activated = false
            setTimeout(function () {
                activated = true
            }, time)
            return true
        }
        return false
    }
}

const debounce = (callback, time = 100, options) => {
    let timeoutId
    return function () {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(callback(...options), time)
    }
}

export { throttle, debounce, throttleHelper }
