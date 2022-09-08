
import { NutritionNames } from "../../components/ui/Graph/helpers";
import { Calories, Nutrition } from "../../constants/interfaces/GraphMain";

enum NutritionValues {
    carbs = 4,
    prots = 4,
    fats = 9
}

export enum DefaultCaroliesValues {
    carbs = 0.5,
    prots = 0.3,
    fats = 0.2,
}



export const converceNutritionToCalories = (data: Nutrition): { [key in NutritionNames]: number } => {

    const { carbs, fats, prots } = data;

    return {
        'carbs': carbs * NutritionValues.carbs,
        'fats': fats * NutritionValues.fats,
        'prots': prots * NutritionValues.prots
    }
}

export const getDefaultNutririonValues = (dailyCaloriesLimit: number): { [key in NutritionNames]: number } => {
    return {
        'carbs': dailyCaloriesLimit * DefaultCaroliesValues.carbs,
        'fats': dailyCaloriesLimit * DefaultCaroliesValues.fats,
        'prots': dailyCaloriesLimit * DefaultCaroliesValues.prots
    }
}

export const getFloorValue = (prevValue: number, currentValue: number, defaultValue: number, actuallycalories: number, defaultCalories: number, type: NutritionNames, duration: number) => {
    return +((prevValue + currentValue / defaultValue * DefaultCaroliesValues[type] * (defaultCalories / actuallycalories) / duration) * 100).toPrecision(3)
}
