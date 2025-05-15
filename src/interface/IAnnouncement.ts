import IClass from "./IClass";

export default interface IAnnouncement {
    id: number;
    title: string;
    description: string;
    date: string;
    classId?: number;
    class?: IClass;
}