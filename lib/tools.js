module.exports.checkDevPkg = (paramArr) => {
    for (let i = 0; i < paramArr.length; i++) {
        console.log(paramArr[i].match(/(-dev)|(-D)/g))
        if (paramArr[i].match(/(-dev)|(-D)/g)) {
            return true;
        }
    }
    return false;
}