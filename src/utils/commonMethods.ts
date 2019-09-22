export function gridStringFromArrayOfObjects(
    arr: Array<{ [key: string]: string | number }>
): string {
    if (!arr.length) {
        return ''
    }
    const keys = Object.keys(arr[0])
    return (
        keys.join('  ') +
        arr.reduce(
            (acc, cur) => acc + '\n' + keys.map(key => cur[key]).join('    '),
            ''
        )
    )
}
