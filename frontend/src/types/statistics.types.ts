export interface DailyStatistic {
    date: string
    totalSessions: number
    totalFocusTime: number
}

export interface WeeklyStatistic {
    weekStart: string
    weekEnd: string
    totalSessions: number
    totalFocusTime: number
    averageSessionsPerDay: number
    dailyBreakdown: DailyStatistic[]
}

export interface StatisticsResponse {
    daily: DailyStatistic
    weekly: WeeklyStatistic
}
