import { computed } from "vue";
import { addDay, getDatesInRange } from "./date.utils";
import type { ListDates } from "./date.types";
import type { Ref } from "vue";

/**
 * Построение данных для шкалы диаграммы Ганта
 * 
 * @param startDate начальная дата
 * @param endDate конечная дата
 * @returns 
 */
export function useBuildScale(startDate: Ref<Date>, endDate: Ref<Date>) {
    /**
     * Старотовая дата на шкале диаграммы Ганта
     * 
     * @description добавляем дни к стартовой дате, чтобы был пустой запас у диаграммы слева
     */
    const startDateScale = computed<Date>(() => addDay(startDate.value, 1));

    /**
     * Конечная дата на шкале диаграммы Ганта
     * 
     * @description добавляем дни к стартовой дате, чтобы был пустой запас у диаграммы справа
     */
    const endDateScale = computed<Date>(() => addDay(endDate.value, 1));

    /**
     * Массив всех дат межну стартовой и конечно датой
     */
    const dateArray = computed<Date[]>(() => getDatesInRange(startDateScale.value, endDateScale.value));

    /**
     * Список всех дат для шкалы диаграммы Ганта с разбивкой на года/месяца/дни
     */
    const listDateScale = computed<ListDates>(() => {
        const listDates: ListDates = {
            years: [],
            months: [],
            days: [],
        }

        const listDates2: any = {
            years: [],
            months: [],
            days: [],
        }

        const dates = dateArray.value;

        let i;
        let tempYear;
        let tempMonth;
        let count = 0;
        let countMonths = 0;

        // for (i = 0; i < dateArray.value.length; i++) {
        //     const currentFullDate = dateArray.value[i];
        //     const currentYear = new Date(currentFullDate).getFullYear();
        //     const currentMonth = new Date(currentFullDate).getMonth() + 1;
        //     const currentDay = new Date(currentFullDate).getDate();

        //     const test = {
        //         value: String(currentDay).padStart(2, '0'),
        //         currentMonth,
        //         currentYear,
        //     }

        //     listDates.days.push(String(currentDay).padStart(2, '0'));

        //     count ++; 
            
        //     // Последняя итерация в массиве
        //     if (i === dateArray.value.length - 1) {
        //         // в текущий месяц записываем кол-во дней
        //         const lastMonth = listDates2.months[listDates2.months.length - 1];
        //         lastMonth.numberDays = count;
        //     }

        //     if (tempMonth !== currentMonth) {
        //         tempMonth = currentMonth;
        //         countMonths ++;

        //         if (listDates2.months.length !== 0) {
        //             // если массив с месяцами уже заполнен, то при смени месяца возвращаемся на -1 и записываем туда кол-во дней
        //             // При переходе на след месяц считаетс count + 1 
        //             listDates2.months[listDates2.months.length - 1].numberDays = count - 1 ? count - 1 : count;
        //         }
        //         // TODO: Добавить сюда кол-во дней в текущем месяце?
        //         const re = {
        //             value: String(currentMonth).padStart(2, '0'),
        //             numberDays: null,
        //             currentYear,
        //         }

        //         listDates2.months.push(re);
        //         listDates.months.push(String(currentMonth).padStart(2, '0'));
        //         count = 1;
        //     }

        //     if (tempYear !== currentYear) {
        //         tempYear = currentYear;
        //         // TODO: Добавить сюда кол-во месяцев в текущем году?
        //         const tee = {
        //             value: String(currentYear),
        //             numberMonths: countMonths - 1 ? countMonths - 1 : countMonths,
        //         }
        //         // console.log(tee);
        //         listDates.years.push(String(currentYear));
        //         countMonths = 1;
        //     }
        // }

        // TODO: разнести тело цикла на функции
        // возможно, для поднятия производительности, нужно будет записывать в каждый элемент массива years/months/days дату в формате мс (getTime)
        // это позволит применить алгоритм бинарного поиска по массиву, где целевым значением будет дата в мс
        for (i = 0; i < dates.length; i++) {
            const currentFullDate = dates[i];
            const currentYear = new Date(currentFullDate).getFullYear();
            const currentMonth = new Date(currentFullDate).getMonth() + 1;
            const currentDay = new Date(currentFullDate).getDate();

            if (tempYear !== currentYear) {
                tempYear = currentYear;

                if (listDates2.years.length !== 0) {
                    // если массив с месяцами уже заполнен, то при смени месяца возвращаемся на -1 и записываем туда кол-во дней
                    // При переходе на след месяц считаетс count + 1 
                    listDates2.years[listDates2.years.length - 1].numberMonths = countMonths;
                }

                // TODO: Добавить сюда кол-во месяцев в текущем году?
                const tee = {
                    value: String(currentYear),
                    numberMonths: null,
                }
                // console.log(tee);
                listDates2.years.push(tee);
                countMonths = 0;
            }

            if (tempMonth !== currentMonth) {
                tempMonth = currentMonth;
                countMonths ++;

                // OK - требуется небольшой рефакторинг
                if (listDates2.months.length !== 0) {
                    // если массив с месяцами уже заполнен, то при смени месяца возвращаемся на -1 и записываем туда кол-во дней
                    // При переходе на след месяц считаетс count + 1 
                    listDates2.months[listDates2.months.length - 1].numberDays = count;
                }

                // Вынести в отдельную функцию createMonthData
                const re = {
                    value: String(currentMonth).padStart(2, '0'),
                    numberDays: null,
                    currentYear,
                }

                listDates2.months.push(re);
                count = 0;
            }

            count ++; 
            
            // Последняя итерация в массиве
            if (i === dates.length - 1) {
                // в текущий месяц записываем кол-во дней
                const lastMonth = listDates2.months[listDates2.months.length - 1];
                lastMonth.numberDays = count;

                const lastYear = listDates2.years[listDates2.years.length - 1];
                lastYear.numberMonths = countMonths;
            }

            const test = {
                value: String(currentDay).padStart(2, '0'),
                currentMonth,
                currentYear,
            }

            listDates2.days.push(test);
        }
        
        console.log(listDates2);
        return listDates;
    })

    return {
        listDateScale,
    }
}