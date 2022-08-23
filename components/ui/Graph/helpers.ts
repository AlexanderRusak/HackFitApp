
interface DataProps {
    array: any[],
}

interface AreaLineProps extends DataProps {
    value: number
}

interface AreaDataProps extends DataProps {
    minValue: number,
    maxValue: number,
}


export const getAreaData = ({ array, minValue, maxValue }: AreaDataProps) => {
    const initArray = Array(array.length)
    initArray.forEach((arr: any, index: number) => arr = {
        y: maxValue,
        y0: minValue,
        x: index
    });
    return initArray
}


export const getLineData = ({ array, value }: AreaLineProps) => {
    const initArray = Array(array.length)
    initArray.forEach((arr: any, index: number) => arr = {
        y: value,
        x: index
    });
    return initArray
}