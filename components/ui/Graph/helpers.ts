import { DomainTuple } from "victory-core";
import { Calories, Nutrition, Range } from "../../../constants/interfaces/GraphMain";
import { converceNutritionToCalories, DefaultCaroliesValues, getDefaultNutririonValues, getFloorValue } from "../../../logic/measure/measure.helper";
import { BrushDomain } from "../../graphs/GlucoseGraphs/Glucose";
import { BrushComponentData } from "../../graphs/GraphsComponent/BrushComponent";

export type NutritionNames = 'carbs' | 'prots' | 'fats';
interface DataProps {
    array: any[],
}
interface DataCaloriesProps {
    array: Calories[],
}

interface AreaLineProps extends DataProps {
    value: DomainTuple
}

interface AreaDataProps extends DataProps {
    minValue: number,
    maxValue: number,
}

interface PieData {
    y: number;
}

interface PieDataProteins extends PieData {
    x: 'Proteins'
}

interface PieDataFats extends PieData {
    x: 'Fats'
}

interface PieDataCarbs extends PieData {
    x: 'Carbs'
}
export type PieDataType = [
    PieDataCarbs,
    PieDataFats,
    PieDataProteins
]


export const dayInMs = 86400000;


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
};

export const getSingleLineData = (data: Calories[]): { x: Date, y: number }[] => {
    const lineDate = data.reduce((prevValue, { x, y }, index, arr) => {
        return [
            ...prevValue,
            {
                x,
                y: y.dailyCaloriesLimit
            },
        ]
    }, [] as any[]);
    const { day, month, year } = getFormattedDate(new Date())


    return [ ...lineDate, { x: new Date(year, month, day + 1), y: lineDate[lineDate.length - 1].y }]
}

export const getCaloriesAreaData = ({ array }: DataCaloriesProps): [Range[], Range[], Range[]] => {
    const [carbs, fats, prots] = array.reduce((prev, { x, y: nutritionData }) => {
        const { carbs: carbsMax, fats: fatsMax, prots: protsMax } = converceNutritionToCalories(nutritionData);
        return [
            [...prev[0], { x, y: carbsMax, y0: 0 }],
            [...prev[1], { x, y: carbsMax + fatsMax, y0: carbsMax }],
            [...prev[2], { x, y: carbsMax + fatsMax + protsMax, y0: carbsMax + fatsMax }]]
    }, [[] as Range[], [] as Range[], [] as Range[]]);

    const { day, month, year } = getFormattedDate(new Date());

    const additionalCarb: Range = {
        x: new Date(year, month, day + 1),
        y: carbs[carbs.length - 1].y,
        y0: carbs[carbs.length - 1].y0,
    };
    const additionalFat: Range = {
        x: new Date(year, month, day + 1),
        y: fats[fats.length - 1].y,
        y0: fats[fats.length - 1].y0,
    };
    const additionalProt: Range = {
        x: new Date(year, month, day + 1),
        y: prots[prots.length - 1].y,
        y0: prots[prots.length - 1].y0,
    };
    const caloriesToupleData = [[...carbs, additionalCarb], [...fats, additionalFat], [...prots, additionalProt]];
    return caloriesToupleData as [Range[], Range[], Range[]]
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
};

export const getPieData = (data: Calories[], duration: number = 1): PieDataType => {

    const initData: PieDataType = [
        {
            x: 'Carbs',
            y: 0,
        },
        {
            x: 'Fats',
            y: 0,
        },
        {
            x: 'Proteins',
            y: 0,
        }]



    return data.slice(-duration).reduce((prev, { y: nutritionData }): PieDataType => {
        const { carbs, fats, prots } = converceNutritionToCalories(nutritionData);
        const caloriesSum = nutritionData.dailyCaloriesLimit;
        const { carbs: carbsDefault, fats: fatsDefault, prots: protsDefault } = getDefaultNutririonValues(caloriesSum);
        const actuallycalories = carbs + fats + prots;
        return [
            {
                x: 'Carbs',
                y: getFloorValue((prev[0].y / 100), carbs, carbsDefault, actuallycalories, nutritionData.dailyCaloriesLimit, 'carbs', duration),
            },
            {
                x: 'Fats',
                y: getFloorValue((prev[1].y / 100), fats, fatsDefault, actuallycalories, nutritionData.dailyCaloriesLimit, 'fats', duration),
            },
            {
                x: 'Proteins',
                y: getFloorValue((prev[2].y / 100), prots, protsDefault, actuallycalories, nutritionData.dailyCaloriesLimit, 'prots', duration),
            }
        ]
    }, initData);
}

export const getSummaryData = (data: Calories[]): BrushComponentData[] => {
    const summaryData = data.reduce((prev, { x, y }) => {
        const { carbs, fats, prots }: Nutrition = y;
        const { carbs: carbsCalories, fats: fatsCalories, prots: protsCalories } = converceNutritionToCalories({ carbs, fats, prots } as Nutrition)

        const dailySum: BrushComponentData = {
            x,
            y: carbsCalories + fatsCalories + protsCalories
        }

        return [...prev, dailySum]
    }, [] as BrushComponentData[]);
    const { day, month, year } = getFormattedDate(new Date())

    return [...summaryData, {
        x: new Date(year, month, day + 1),
        y: summaryData[summaryData.length - 1].y
    }]
}
export const getRangeDays = (domain: DomainTuple | BrushDomain) =>
    //@ts-ignore
    new Date(new Date(domain.x[1]).getTime() -
        //@ts-ignore
        new Date(domain.x[0]).getTime()).getDate()
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
