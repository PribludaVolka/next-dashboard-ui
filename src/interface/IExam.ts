import ILesson from "./ILesson";
import IResult from "./IResult";

export default interface IExam {
    id: number;
    title: string;
    startTime: string;
    EndTime: string;
    lessonId: number;
    lesson: ILesson;
    results: IResult
}