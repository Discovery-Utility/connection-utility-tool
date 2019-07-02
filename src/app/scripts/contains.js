export const contains = function () {
    let flag = false;
    for (let i = 1; i < arguments.length; i++) {
        flag = flag || arguments[0].includes(arguments[i]);
    }
    return flag;
};
