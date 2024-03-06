import { ref } from "vue";
import type { Tasks } from "./dgantt.types";

/**
 * Построение структуры данных для диаграммы Ганнта
 * 
 * @param tasks список задач
 */
export function useBuildGannt(tasks: Tasks) {
    /**
     * Начальная дата для шкалы
     */
    const startDate = ref<Date>(new Date());

    /**
     * Конечная дата для шкалы
     */
    const endDate = ref<Date>(new Date());

    function buildStructur() {
        let i;
        
        for (i = 0; i < tasks.data.length; i++) {
            const data = tasks.data[i];
            const sdt = data.start_date;
            const edt = new Date(sdt).setDate(new Date(sdt).getDate() + data.duration);
            
            if (i === 0) {
                startDate.value = new Date(sdt);
                endDate.value = new Date(edt);
                continue;
            }
            
            if (startDate.value.getTime() > new Date(sdt).getTime()) {
                startDate.value = new Date(sdt);
            }

            if (endDate.value && endDate.value.getTime() < new Date(edt).getTime()) {
                endDate.value = new Date(edt);
            }
        }
    }
    
    function setStartDate(date: Date) {
        startDate.value = date;
    }

    function setEndDate(date: Date) {
        endDate.value = date;
    }

    // function getStartDate(countDay: number) {
    //     return startDate.value = new Date(addDay(startDate.value, countDay));
    // }

    // function getEndDate(countDay: number) {
    //     return endDate.value = new Date(addDay(endDate.value, countDay));
    // }

    function isMinDate(date: Date): boolean {
        return startDate.value.getTime() > date.getTime();
    }

    function isMaxDate(date: Date): boolean {
        return endDate.value.getTime() < date.getTime();
    }

    // TODO: watch на startDate/endDate ?
    // TODO: функции оставляем в composobles ?
    // TODO: добавить построение массива с датами, месяцами, годами
    // TODO: работу с датами вынести в отдельный composables ? передавать туда startDate/endDate

    return {
        buildStructur,
        setStartDate,
        setEndDate,
        // getStartDate,
        // getEndDate,
        isMaxDate,
        isMinDate,
    };
}