<!-- // const saved = ref<SaveData[]>(_getData()); -->

// TODO: Как строить левый блок с задачами ?
// TODO: Как строить блоки задач на диаграмме ?
// TODO: watch на startDate/endDate ?
// TODO: функции оставляем в composobles ?
// TODO: добавить построение массива с датами, месяцами, годами
// TODO: работу с датами вынести в отдельный composables ? передавать туда startDate/endDate

```
// Первый вариант - записывать даты в виде дерева
// плюсы - легко мапить массив по значениям, есть понимание какой день к какому месяцу относиться
// минусы - при отрисовки только дней, придется пробегаться по массиву годов, затем месяцев, и только потом дней - плохо для производительсности
const map = new Map();
const mount = new Map();
const days = ['29', '30'];

const da = {
    fullDate: '22-12-12',
    startDate: '22-12-12',
    endDate: '23-12-12',
    duration: 1,
}

map.set('2025', mount);
mount.set('Nov', days);
mount.set('Dec', days);

// Второй вариант - записывать данные в разные массивы
const ar2 = ['2025', '2026'];
const arM2 = ['Nov', 'Dec', 'Jan', 'Feb'];
const arD2 = ['29', '30'];
```

// Третий вариант - записывать развернутые данные в разные массивы
const ar2 = [{value: '2025', numberMonths: '2'}, {value: '2026', numberMonths: '1'}];
const arM2 = [{value: 'Dec', numberDays: '2', currentYear: '2025'}, {value: 'Jan', numberDays: '30', currentYear: '2026'}, {value: 'Feb', numberDays: '10', currentYear: '2026'}];
const arD2 = [{value: '30', currentMonth: 'Dec', currentYear: '2025'}, {value: '31', currentMonth: 'Dec', currentYear: '2025'}];

```

Как отрисовывать блоки диаграммы относительно шкалы времени?
1. Брать исходные данные, вытаскивать start_date, искать текущую дату в массиве дат/месяцев/годов, получать ее индекс в массиве, данный индекс нужно умножать на ширину 1 ячейки даты, получаем начало блока, затем либо умножаем на duration, либо находим вторую дату таким же образом.

Пример: start_date = '2025-01-02'

Массивы с датами по годам/месяцам/дням:
const ar2 = [{value: '2025', numberMonths: '2'}, {value: '2026', numberMonths: '1'}];
const arM2 = [{value: 'Dec', numberDays: '2', currentYear: '2025'}, {value: 'Jan', numberDays: '30', currentYear: '2026'}, {value: 'Feb', numberDays: '10', currentYear: '2026'}];
const arD2 = [{value: '30', currentMonth: 'Dec', currentYear: '2025'}, {value: '31', currentMonth: 'Dec', currentYear: '2025'}];

Если график настроен по дням:

- Получаем день из '2025-01-02' = 02
- Получаем месяц из '2025-01-02' = 01
- Получаем год из '2025-01-02' = 2025
- Производим Поиск по массиву arD2, value === 02, currentMonth === 01, currentYear === 2025
- Получаем индекс 1
- Получаем ширину ячейки из compsables с построением шкалы
- Умножаем индекс на ширину ячейки (индекс * ширина) и получаем начало отрисовки блока
- Получаем duration = 2
- Умножаем ширину ячейки на duration (ширина * duration) и получаем конец отрисовки блока

2.
```
