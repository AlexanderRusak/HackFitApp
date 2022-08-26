
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
            x: array[i].x,
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
            x: array[i].x,
            y: value,
        }
    }

    return initArray
}


export const getFormattedDate = (time: number | Date, dateSeparator = '/', timeSeparator = ':'): {
    day: number,
    month: number,
    year: number,
    hours: number,
    minutes: number,
    seconds: number,
    formattedDate: string,
    formattedTime: string
} => {
    const date = new Date(time);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const sepData = dateSeparator.length ? dateSeparator : '/';
    const sepTime = timeSeparator.length ? timeSeparator : '';
    return {
        day,
        month,
        year,
        hours,
        minutes,
        seconds,
        formattedDate: `${addZero(day)}${sepData}${addZero(month)}${sepData}${year}`,
        formattedTime: `${addZero(hours)}${sepTime}${addZero(minutes)}${sepTime}${addZero(seconds)}`,
    };
}

export const addZero = (value: number) => value >= 10 ? value : `0${value}`;
