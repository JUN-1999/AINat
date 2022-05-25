export function arrToStr(arr) {
    let str = arr.reduce((text, item) => {
        text += item + ",";
        return text;
    }, "");

    str = str.slice(0, str.length - 1);
    return str
}