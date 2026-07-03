export function parseFasta(text: string): string[] {
    let arr: string[] = text.split(">")

    arr = arr.map(str => ">" + str);
    arr.shift();

    // console.log(arr);
    return arr;
}