
import axios from "axios";
import { SubjectSchema } from "./formValidationSchemas"

export const createSubject = async (data:SubjectSchema) => {
    axios.post('http://localhost:3001/subject', data)
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

export const deleteSubject = async (id:number) => {
    axios.delete('http://localhost:3001/subject', { data: { id } })
        .catch((e) => {
            console.error('Error in submitting form:', e);
            if (e.response) {
                console.error('Error Response:', e.response);
            }
    });
}