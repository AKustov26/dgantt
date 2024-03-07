<template>
    <div class="wrap">
        <div class="control"></div>
        <DGanttDate></DGanttDate>
        <div class="diagram"></div>
        {{ structurGantt }}
        {{ listDateScale }}
    </div>
</template>

<script setup lang="ts">
import { toRefs, computed } from 'vue';
import DGanttDate from './DGanttDate/DGanttDate.vue';
import { useBuildGannt } from './dgantt';
import { useBuildScale } from './DGanttDate/date';
import type { Tasks } from './dgantt.types';


interface PropsDGantt {
    /**
     * Загрузка информации
     */
    tasks: Tasks;
}

const props = withDefaults(defineProps<PropsDGantt>(), {});

const { tasks } = toRefs(props);

const { structurGantt } = useBuildGannt(tasks);

const startDate = computed(() => structurGantt.value.minDate);
const endDate = computed(() => structurGantt.value.maxDate);

const { listDateScale } = useBuildScale(startDate, endDate);

setTimeout(() => {
    tasks.value.data.push({
            id: 53,
            text: 'Task #54',
            start_date: '2023-01-01',
            duration: 2,
            order: 20,
            progress: 0.6,
            parent: 20
        })
}, 2000);
</script>