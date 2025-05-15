import ILesson from "./ILesson";
import ITeacher from "./ITeacher";


export default interface IUserSex {
    id: number;
    name: string;
    teachers: ITeacher;
    lessons: ILesson;
}