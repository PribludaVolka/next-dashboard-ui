import IClass from "./IClass";
import ILesson from "./ILesson";
import ISubject from "./ISubject";
import { UserSex } from "./IUserSex";


export default interface ITeacher {
    id: string;   
    username: string;
    name: string;
    surname: string;
    email?: string;
    phone?: string; 
    address: string;
    img?: string;
    bloodType: string;
    sex: UserSex;
    createdAt: string;
    subjects: ISubject[];
    lessons: ILesson;
    class: IClass[];
    birthday: string;
}