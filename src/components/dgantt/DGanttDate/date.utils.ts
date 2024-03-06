/**
 * Добавление дней к дате
 * 
 * @param date дата
 * @param countDay кол-во дней
 * @returns
 */
export function addDay(date: Date, countDay: number): Date {
    return new Date(date.setDate(date.getDate() + countDay));
}

/**
 * Возвращает массив дат между двумя датами
 * 
 * @param startDate - начальная дата
 * @param endDate - конечная дата
 * @returns
 */
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
 * Возвращает результат проверки на минимальную дату
 * 
 * @param currentMinDate - текущая минимальная дата
 * @param date - новая дата
 * @returns 
 */
export function isMinDate(currentMinDate: Date, date: Date): boolean {
    return currentMinDate.getTime() > date.getTime();
}

/**
 * Возвращает результат проверки на масимальную дату
 * 
 * @param currentMaxDate - текущая максимальная дата
 * @param date - новая дата
 * @returns 
 */
export function isMaxDate(currentMaxDate: Date, date: Date): boolean {
    return currentMaxDate.getTime() < date.getTime();
}

