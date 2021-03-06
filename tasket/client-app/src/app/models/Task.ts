export interface Task {
    id: number;
    title: string;

    startDatetimeScheduled: Date | null;
    startDatetimeActual: Date | null;
    endDatetimeScheduled: Date | null;
    endDatetimeActual: Date | null;

    status: number;
    status_title: string;
    
    shortDescription: string;
    longDescription: string;

    /*
    createUser: string;
    createDatetime: Date | null;
    latestUpdateUser: string;
    latestUpdateDatetime: Date | null;
    */

}