import ILesson from "./ILesson";
import IResult from "./IResult";

export default interface IAssignment {
    id: number;
    title: string;
    startDate: string;
    dueDate: string;
    lessonId: number;
    lesson: ILesson;
    results: IResult;
}