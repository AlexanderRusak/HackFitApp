
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
    const initArray = Array(array.length);
    for (let i = 0; i < initArray.length; i++) {
        initArray[i] = {
            x: i,
            y0: minValue,
            y: maxValue,
        }
    }

    return initArray
}


export const getLineData = ({ array, value }: AreaLineProps) => {
    const initArray = Array(array.length);

    for (let i = 0; i < initArray.length; i++) {
        initArray[i] = {
            x: i,
            y: value,
        }
    }

    return initArray
}