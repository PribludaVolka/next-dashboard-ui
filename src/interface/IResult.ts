import IAssignment from "./IAssignment";
import IExam from "./IExam";
import IStudent from "./IStudent";

export default interface IResult {
    id: number;
    score: number;
    examId?: number;
    exam?: IExam;
    assignmentId?: number;
    assignment?: IAssignment
    studentId: string;
    student: IStudent;
}