"use client"
import axios from "axios";
import Image from "next/image"
import { useEffect, useState } from "react"

const UserCard = ({type} : {type: "admin" | "teacher" | "student" | "parent"}) => {
    const [teachers, setTeachers] = useState<any>([]);
    const [parents, setParents] = useState<any>([]);
    const [students, setStudents] = useState<any>([]);

    const fetchTeachers = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/teachers/all`);
            setTeachers(res.data);
        } catch (err) {
            console.error("Ошибка загрузки учителей:", err);
        }
    };

    const fetchStudents = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/students/all`);
            setStudents(res.data);
        } catch (err) {
            console.error("Ошибка загрузки учителей:", err);
        }
    };

    const fetchParents = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/parents/all`);
            setParents(res.data);
        } catch (err) {
            console.error("Ошибка загрузки учителей:", err);
        }
    };

    useEffect(() => {
        fetchTeachers();
        fetchStudents();
        fetchParents();
    }, []);

    const modelMap: Record<typeof type, any>= {
        admin: 1,
        teacher: teachers.length,
        parent: parents.length,
        student: students.length
    }

    const data = modelMap[type];

    return (
        <div className="rounded-2xl odd:bg-lamaPurple even:bg-lamaYellow p-4 flex-1 min-w-[130px]">
            <div className="flex justify-between items-center">
                <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">
                    2024/25
                </span>
                <Image src="/more.png" alt="" width={20} height={20} />
            </div>
            <h1 className="text-2xl font-semibold my-4">{data}</h1>
            <h2 className="capitalize text-sm font-medium text-gray-500">{type}s</h2>
        </div>
    );
} 

export default UserCard