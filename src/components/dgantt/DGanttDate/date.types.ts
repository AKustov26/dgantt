/**
 * Период дат
 */
export interface DatePeriod {
    /**
     * Начальная дата
     */
    startDate: Date,
    /**
     * Конечная дата
     */
    endDate: Date
}

export interface ListDates {
    years: string[],
    months: string[],
    days: string[],
}