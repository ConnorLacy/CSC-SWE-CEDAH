export const formatName = (fullName) => {
    let arr = fullName.split(' ')
    let newArr = arr.map(el => 
        el.replace(el.charAt(0), el.charAt(0).toUpperCase())
    )
    return newArr.join(' ');
}

export const validateEntry = (entry) => {
    if(typeof(entry) === 'undefined') return false
    if(entry === null) return false
    if(entry.length === 0) return false 
    if(!(/^([a-z]|[A-Z]|\s*|[0-9]){4,100}$/.test(entry))) return false
    return true
}

export const formatTime = (time) => {
    let hour = time.slice(0,2)
    let min = time.slice(2,5)
    var dayHalf = ''
    if(hour > 12){
        hour = hour-12
        dayHalf = 'pm'
    } else{
        dayHalf = 'am'
    }
    let trimmed = hour.toString().concat(min.concat(dayHalf))
    return trimmed
}