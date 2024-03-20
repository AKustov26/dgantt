<template>
    <div class="dgantt-scale" ref="scale">
		<div class="group">
			<div v-for="year in dates.years" :key="year" :style="{ width: `${widthYaer}px` }" class="dates">
				{{ year }}
			</div>
		</div>
		<div class="group">
			<div v-for="months in dates.months" :key="months" :style="{ width: `${widthMonth}px` }" class="dates">
				{{ months }}
			</div>
		</div>
		<div class="group">
			<div v-for="days in dates.days" :key="days" :style="{ width: `${widthDay}px` }" class="dates">
				{{ days }}
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { ListDates } from './date.types';

interface PropsGanttDate {
	dates: ListDates
}

const props = withDefaults(defineProps<PropsGanttDate>(), {});

/**
 * HTML элемент шкалы
 */
const scale = ref<HTMLElement | null>(null);

/**
 * Ширина шкалы с датами
 */
const widthScale = computed(() => scale.value?.offsetWidth);

/**
 * Дефолтное значение ширины одной ячейки дня
 */
const DEFAULT_WIDTH_DAY = 60;

/**
 * Ширина ячейки одного дня
 */
 const widthDay = computed(() => {
	if (widthScale.value) {
		const numberDates = props.dates.days.length;

		if (numberDates === 0) {
			return 0;
		}

		if (numberDates * DEFAULT_WIDTH_DAY > widthScale.value) {
			return DEFAULT_WIDTH_DAY;
		}

		return widthScale.value / numberDates;
	}

	return 0;
});

const widthMonth = computed(() => {
	if (widthScale.value) {
		const numberDates = props.dates.days.length;
		const numberMonths = props.dates.months.length;
		
		// TODO: неизвестно сколько дат в текущем месяце
		
		if (props.dates.months.length === 0) {
			return 0;
		}

		return widthScale.value / props.dates.months.length;
	}

	return 0;
});

const widthYaer = computed(() => {
	if (widthScale.value) {

		if (props.dates.years.length === 0) {
			return 0;
		}

		return widthScale.value / props.dates.years.length;
	}

	return 0;
});



// Изменение даты (месяца, дни, часы) - приходит в props
// 
// eachDayOfInterval -> date fns
</script>

<style lang="scss">
.dgantt-scale {
	> .group {
		display: flex;
		align-items: center;

		> .dates {
			flex-shrink: 0;
		}
	}
}
</style>