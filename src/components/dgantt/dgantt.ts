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
    const minDate = ref<Date>(new Date());

    /**
     * Конечная дата для шкалы
     */
    const maxDate = ref<Date>(new Date());
    
    function buildStructur() {
        let i;
        
        for (i = 0; i < tasks.data.length; i++) {
            const data = tasks.data[i];
            const sdt = data.start_date;
            const edt = new Date(sdt).setDate(new Date(sdt).getDate() + data.duration);
            
            if (i === 0) {
                minDate.value = new Date(sdt);
                maxDate.value = new Date(edt);
                continue;
            }
            
            if (minDate.value.getTime() > new Date(sdt).getTime()) {
                minDate.value = new Date(sdt);
            }

            if (maxDate.value && maxDate.value.getTime() < new Date(edt).getTime()) {
                maxDate.value = new Date(edt);
            }
        }

        console.log(minDate.value);
        console.log(maxDate.value);
    }
    
    /**
     * Записывает новое значение для минимальной даты
     * 
     * @param date новая дата
     */
    function setMinDate(date: Date): void {
        minDate.value = date;
    }

    /**
     * Записывает новое значение для максимальной даты
     * 
     * @param date новая дата
     */
    function setMaxDate(date: Date): void {
        maxDate.value = date;
    }

    return {
        buildStructur,
        setMinDate,
        setMaxDate,
        minDate,
        maxDate,
    };
}