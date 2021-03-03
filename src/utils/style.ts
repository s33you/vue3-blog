export function getStyle(style: any, filter?: Array<string>) {
    const needUnit = [
        'fontSize',
        'width',
        'height',
        'top',
        'left',
        'borderWidth',
        'letterSpacing',
        'borderRadius',
    ]

    const result: any = {}
    Object.keys(style).forEach(key => {

        if (filter) {
            if (filter.includes(key)) {
                return
            }
        }
        if (key != 'rotate') {
            result[key] = style[key]

            if (needUnit.includes(key)) {
                result[key] += 'px'
            }
        } else {
            result.transform = key + '(' + style[key] + 'deg)'
        }
    })
    return result
}