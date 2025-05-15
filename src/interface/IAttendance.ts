import ILesson from "./ILesson";
import IStudent from "./IStudent";

export default interface IAttendance {
    id: number;
    date: string;
    present: boolean;
    studentId: string;
    student: IStudent;
    lessonId: number;
    lesson: ILesson;
}