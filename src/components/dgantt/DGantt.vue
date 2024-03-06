<template>
    <div class="wrap">
        <div class="control"></div>
        <DGanttDate></DGanttDate>
        <div class="diagram"></div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import DGanttDate from './DGanttDate/DGanttDate.vue';
import type { DatePeriod } from './DGanttDate/date.types';
import { getConvertDatePeriod, getMaxDate, getMinDate } from './DGanttDate/date.utils';
import { useBuildGannt } from './dgantt';

const tasks = {
    data: [
        {
            id: 10,
            text: 'Project #1',
            start_date: '2025-01-01',
            duration: 3,
            order: 10,
            progress: 0.4,
            open: true
        },
        {
            id: 1,
            text: 'Task #1',
            start_date: '2025-12-30',
            duration: 2,
            order: 10,
            progress: 0.6,
            parent: 10
        },
        {
            id: 2,
            text: 'Task #2',
            start_date: '2025-01-01',
            duration: 2,
            order: 20,
            progress: 0.6,
            parent: 10
        },
        {
            id: 20,
            text: 'Project #2',
            start_date: '2025-01-14',
            duration: 3,
            order: 10,
            progress: 0.4,
            type: 'project',
            open: true
        },
        {
            id: 3,
            text: 'Task #3',
            start_date: '2025-01-01',
            duration: 2,
            order: 10,
            progress: 0.6,
            parent: 20
        },
        {
            id: 4,
            text: 'Task #4',
            start_date: '2025-01-01',
            duration: 2,
            order: 20,
            progress: 0.6,
            parent: 20
        }
    ],
    links: [
        { id: 1, source: 1, target: 2, type: 0 },
        { id: 2, source: 2, target: 3, type: 0 },
        { id: 3, source: 3, target: 4, type: 0 },
        { id: 4, source: 2, target: 5, type: 0 }
    ]
}

const {
    buildStructur,
    isMaxDate,
    setEndDate,
} = useBuildGannt(tasks);

/**
 * Сконвертированный период дат в формате Date
 */
const arrDates: DatePeriod[] = tasks.data.map((task) => {
    return getConvertDatePeriod(task.start_date, task.duration);
});

/**
 * Наибольшая дата из массива
 */
const maxDate = getMaxDate(arrDates);

/**
 * Наименьшая дата из массива
 */
const minDate = getMinDate(arrDates);

console.log(minDate);
console.log(maxDate);

onMounted(() => {
    
    buildStructur();
   
    if (isMaxDate(new Date('02.02.2027'))) {
        setEndDate(new Date('02.02.2027'));
    }
});
</script>