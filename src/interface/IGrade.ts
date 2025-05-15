import IClass from "./IClass";
import IStudent from "./IStudent";

export default interface IGrade {
    id: number;
    level: number;
    students: IStudent[];
    classes: IClass[];
}