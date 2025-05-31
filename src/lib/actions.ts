
import axios from "axios";
import { ClassSchema, SubjectSchema } from "./formValidationSchemas"

export const createSubject = async (data:SubjectSchema, setIsSuccess?: any) => {
    axios.post('http://localhost:3001/subject', data)
        .then(() => setIsSuccess(true))
        .catch((e) => {
            console.error('Error in submitting form:', e);
            if (e.response) {
                console.error('Error Response:', e.response);
            }
    });
}

export const updateSubject = async (data:SubjectSchema) => {
    axios.put('http://localhost:3001/subject', data)
        .catch((e) => {
            console.error('Error in submitting form:', e);
            if (e.response) {
                console.error('Error Response:', e.response);
            }
    });
}

export const deleteSubject = async (id:any, setIsSuccess?: any) => {
    const numId = Number(id);
    axios.delete('http://localhost:3001/subject', { data: { id: numId } })
        .then(() => setIsSuccess(true))
        .catch((e) => {
            console.error('Error in submitting form:', e);
            if (e.response) {
                console.error('Error Response:', e.response);
            }
    });
}

export const createClass = async (data:ClassSchema, setIsSuccess?: any) => {
    axios.post('http://localhost:3001/classes', data)
        .catch((e) => {
            console.error('Error in submitting form:', e);
            if (e.response) {
                console.error('Error Response:', e.response);
            }
    });
}

export const updateClass = async (data:ClassSchema) => {
    axios.put('http://localhost:3001/classes', data)
        .catch((e) => {
            console.error('Error in submitting form:', e);
            if (e.response) {
                console.error('Error Response:', e.response);
            }
    });
}

export const deleteClass = async (id:any, setIsSuccess?: any) => {
    const numId = Number(id);
    axios.delete('http://localhost:3001/classes', { data: { id:numId } })
        .catch((e) => {
            console.error('Error in submitting form:', e);
            if (e.response) {
                console.error('Error Response:', e.response);
            }
    });
}

export const getSelectTeacher = async () => {
    const data = await axios.get('http://localhost:3001/teachers/select');

    return data;
}