import IStudent from "./IStudent";

export default interface IParent {
    id: string;
    username: string;
    name: string;
    surname: string;
    email?: string;
    phone: string;
    address: string;
    createdAt: string;
    students: IStudent[];
}