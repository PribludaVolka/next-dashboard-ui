import IAttendance from "./IAttendance";
import IClass from "./IClass";
import IGrade from "./IGrade";
import IParent from "./IParent";
import IResult from "./IResult";
import IUserSex from "./ISubject";

export default interface IStudent {
    id: string;
    username: string;
    name: string;
    surname: string;
    email?: string;
    phone?: string;
    address: string;
    img?: string;
    bloodType: string;
    sex: IUserSex;
    createdAt: string;
    parentId: string;
    parent: IParent;
    classId: number;
    class: IClass;
    gradeId: number;
    grade: IGrade;
    attendances: IAttendance[];
    results: IResult[];
    birthday: string;
}