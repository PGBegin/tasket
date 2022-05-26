export interface Task {
    id: number;
    title: string;
    date: Date | null;
    shortDescription: string;
    longDescription: string;
}