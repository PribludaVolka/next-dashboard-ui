import axios from "axios";
import FormModal from "./FormModal";
import { getSelectTeacher } from "@/lib/actions";
import { useEffect, useState } from "react";

export type FormContainerProps = {
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number | string;
};

const FormContainer =  ({ table, type, data, id }: FormContainerProps) => {
    const [relatedData, setRelatedData] = useState({});

    const fetchTeachers = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/teachers/select`);
            setRelatedData(res);
        } catch (err) {
            console.error("Ошибка загрузки учителей:", err);
        }
    };

    const fetchClasses = async () => {
        const classGrades = await axios.get(`http://localhost:3001/grade/select`);
        const classTeachers = await axios.get(`http://localhost:3001/teachers/select`);
        const relatedData = { teachers: classTeachers.data, grades: classGrades.data };
        setRelatedData(relatedData);
    };

    const fetchSubjects = async () => {
        const subjects = await axios.get(`http://localhost:3001/subject/select`);
        const relatedData = { subjects: subjects.data };
        setRelatedData(relatedData);
    };

    const fetchGrades = async () => {
        const grades = await axios.get(`http://localhost:3001/grade/select`);
        const classes = await axios.get(`http://localhost:3001/classes/select`);
        const relatedData = { classes: classes.data, grades: grades.data };
        setRelatedData(relatedData);
    };


    useEffect(() => {
        if (type !== "delete") {
            switch (table) {
                case "subject":
                  fetchTeachers();
                  break;
                case "class":
                  fetchClasses();
                  break;
                case "teacher":
                  fetchSubjects();
                  break;
                case "student":
                  fetchGrades();
                default:
                    break;
            }
        }
    }, []);

  return (
    <div className="">
      <FormModal
        table={table}
        type={type}
        data={data}
        id={id}
        relatedData={relatedData}
      />
    </div>
  );
};

export default FormContainer;