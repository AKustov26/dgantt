import { computed } from "vue";
import { addDay, getDatesInRange } from "./date.utils";
import type { ListDates } from "./date.types";

export function useBuildScale(startDate: Date, endDate: Date) {
    /**
     * Старотовая дата на шкале диаграммы Ганта
     * 
     * @description добавляем дни к стартовой дате, чтобы был пустой запас у диаграммы слева
     */
    const startDateScale = computed<Date>(() => addDay(startDate, 1));

    /**
     * Конечная дата на шкале диаграммы Ганта
     * 
     * @description добавляем дни к стартовой дате, чтобы был пустой запас у диаграммы справа
     */
    const endDateScale = computed<Date>(() => addDay(endDate, 1));

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

        let i;
        let tempYear;
        let tempMonth;

        for (i = 0; i < dateArray.value.length; i++) {
            const currentFullDate = dateArray.value[i];
            const currentYear = new Date(currentFullDate).getFullYear();
            const currentMonth = new Date(currentFullDate).getMonth() + 1;
            const currentDay = new Date(currentFullDate).getDate();

            listDates.days.push(String(currentDay).padStart(2, '0'));

            if (tempYear !== currentYear) {
                tempYear = currentYear;
                listDates.years.push(String(currentYear));
            }

            if (tempMonth !== currentMonth) {
                tempMonth = currentMonth;
                listDates.months.push(String(currentMonth).padStart(2, '0'));
            }
        }
        
        return listDates;
    })

    return {
        listDateScale,
    }
}