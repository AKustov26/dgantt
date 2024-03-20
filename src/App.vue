<template>
    <DGannt v-if="!isLoading && tasks" :tasks="tasks" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DGannt from './components/dgantt/DGantt.vue'
import type { Tasks } from './components/dgantt/dgantt.types';

const isLoading = ref<boolean>(true) ;

const tasks = ref<Tasks | null>(null);

const response = {
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
            start_date: '2025-01-01',
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
            start_date: '2025-01-30',
            duration: 1,
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

setTimeout(() => {
    isLoading.value = true;
    tasks.value = response;
    isLoading.value = false;
}, 1000);
</script>
