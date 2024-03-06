/**
 * Интерфейс для данных по задаче
 */
export interface TasksData {
    id: number,
    text: string,
    start_date: string,
    duration: number,
    order: number,
    progress: number,
    open?: boolean,
    parent?: number,
    type?: string,
}

/**
 * Интерфейс для ссылок к задаче
 */
export interface TasksLinks {
    id: number,
    source: number,
    target: number,
    type: number
}

/**
 * Интерфейс задач
 */
export interface Tasks {
    data: TasksData[],
    links: TasksLinks[],
}