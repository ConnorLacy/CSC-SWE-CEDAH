export const formatName = (fullName) => {
    let arr = fullName.split(' ')
    let newArr = arr.map(el => 
        el.replace(el.charAt(0), el.charAt(0).toUpperCase())
    )
    return newArr.join(' ');
}
