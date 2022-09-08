export interface GraphMain {
    color: string
}

export interface Nutrition {
    dailyCaloriesLimit: number,
    prots: number,
    carbs: number,
    fats: number,
}

export interface Calories {
    x: Date | number;
    y: {
        dailyCaloriesLimit: number,
        prots: number,
        carbs: number,
        fats: number,
    }
}

export interface Range {
    x: Date | number;
    y: number,
    y0: number
}