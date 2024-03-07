import { computed } from "vue";
import type { StructurGantt, Tasks } from "./dgantt.types";
import type { Ref } from "vue";

/**
 * Построение структуры данных для диаграммы Ганнта
 * 
 * @param tasks список задач
 */
export function useBuildGannt(tasks: Ref<Tasks>) {
    /**
     * Парсинг данных из обекта tasks в структуру для диграммы Ганта
     */
    const structurGantt = computed<StructurGantt>(() => {
        let i;
        let minDate = new Date();
        let maxDate = new Date();
        
        for (i = 0; i < tasks.value.data.length; i++) {
            const data = tasks.value.data[i];
            const sdt = data.start_date;
            const edt = new Date(sdt).setDate(new Date(sdt).getDate() + data.duration);
            
            if (i === 0) {
                minDate = new Date(sdt);
                maxDate = new Date(edt);
                continue;
            }
            
            if (minDate.getTime() > new Date(sdt).getTime()) {
                minDate = new Date(sdt);
            }

            if (maxDate && maxDate.getTime() < new Date(edt).getTime()) {
                maxDate = new Date(edt);
            }
        }

        return {
            minDate,
            maxDate,
        }
    })
    
    return {
        structurGantt,
    };
}