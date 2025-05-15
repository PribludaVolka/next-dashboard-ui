import { StringValidation } from "zod";
import ITeacher from "./ITeacher";
import ILesson from "./ILesson";
import IStudent from "./IStudent";
import IEvent from "./IEvent";
import IAnnouncement from "./IAnnouncement";
import IGrade from "./IGrade";

export default interface IClass {
    id: number;
    name: string;
    capacity: number;
    supervisorId?: number;
    supervisor?: ITeacher;
    lessons: ILesson[];
    students: IStudent[];
    gradeId: number;
    grade: IGrade;
    events: IEvent[];
    announcements: IAnnouncement[];
}