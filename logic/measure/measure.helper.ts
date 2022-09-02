import { Nutrition } from "../../components/ui/Graph/helpers";

enum NutritionValues {
    carbs = 4,
    prots = 4,
    fats = 9
}

export const converceNutritionToCalories = (name: Nutrition, value: number) => {
    return NutritionValues[name] * value;
}