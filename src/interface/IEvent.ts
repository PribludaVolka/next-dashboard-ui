import IClass from "./IClass";

export default interface IEvent {
    id: number;
    title: string;
    description: string;
    startTime: string;
    endTime: string;
    classId?: number;
    class?: IClass;
}