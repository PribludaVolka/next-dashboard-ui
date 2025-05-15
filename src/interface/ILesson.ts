import IAssignment from "./IAssignment";
import IAttendance from "./IAttendance";
import IClass from "./IClass";
import { Day } from "./IDay";
import IExam from "./IExam";
import ISubject from "./ISubject";
import ITeacher from "./ITeacher";

export default interface ILesson {
    id: number;
    name: string;
    day: Day;
    startTime: string;
    endTime: string;
    subjectId: number;
    subject: ISubject;
    classId: number;
    class: IClass;
    teacherId: string;
    teacher: ITeacher;
    exams: IExam;
    assignments: IAssignment;
    attendances: IAttendance;
}