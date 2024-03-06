import type { DatePeriod } from './date.types';

/**
 * Добавление дней к дате
 * 
 * @param date дата
 * @param countDay кол-во дней
 */
export function addDayStrings(date: string, countDay: number): number {
    return new Date(date).getDate() + countDay;
}

export function addDay(date: Date, countDay: number): Date {
    return new Date(date.setDate(date.getDate() + countDay));
}

export function getDatesInRange(startDate: Date, endDate: Date): Date[] {
    const dateArray = [];
    const currentDate = startDate;
  
    while (currentDate <= endDate) {
      dateArray.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
  
    return dateArray;
}

/**
 * Возвращает сконвертированный период дат в формате Date
 * 
 * @param sdt Начальная дата
 * @param duration Продолжительность в днях
 */
export function getConvertDatePeriod(sdt: string, duration: number): DatePeriod {
    return {
        startDate: new Date(sdt),
        endDate: new Date(new Date(sdt).setDate(addDayStrings(sdt, duration))),
    }
}

/**
 * Возвращает наибольшую дату из массива
 * 
 * @param arrDates Массив дат
 */
export function getMaxDate(arrDates: DatePeriod[]) {
    return new Date(
        Math.max(
            ...arrDates.map((date) => {
                return new Date(date.endDate).getTime();
            }),
        ),
    );
}

/**
 * Возвращает наименьшую дату из массива
 * 
 * @param arrDates Массив дат
 */
export function getMinDate(arrDates: DatePeriod[]) {
    return new Date(
        Math.min(
            ...arrDates.map((date) => {
                return new Date(date.startDate).getTime();
            }),
        ),
    );
}

