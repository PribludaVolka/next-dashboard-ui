"use client"

import FormModal from "@/components/FormModal"
import Pagination from "@/components/Pagination"
import Table from "@/components/Table"
import TableSearch from "@/components/TableSearch"
import IAssignment from "@/interface/IAssignment"
import IAttendance from "@/interface/IAttendance"
import IClass from "@/interface/IClass"
import IExam from "@/interface/IExam"
import ILesson from "@/interface/ILesson"
import ISubject from "@/interface/ISubject"
import ITeacher from "@/interface/ITeacher"
import { classesData, lessonsData, parentsData, role, studentsData, subjectsData, teachersData } from "@/lib/data"
import axios from "axios"
import { headers } from "next/headers"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

type LessonList = ILesson & {assignments: IAssignment[]; attendances: IAttendance[]; exams: IExam[]; class: IClass; subject: ISubject; teacher: ITeacher};

const columns = [
    {
        header:"Subject Name", 
        accessor:"name"
    },
    {
        header:"Class", 
        accessor:"class", 
    },
    {
        header:"Teacher",
        accessor:"Teacher",
        className:"hidden md:table-cell"
    },
    {
        header:"Actions", 
        accessor:"action", 
    },
]

const LessonListPage = () => {
    const [lessons, setLessons] = useState([]);
    const [count, setCount] = useState(0);
    const searchParams = useSearchParams();
    const [searchValue, setSearchValue] = useState('');
    const currentPage = parseInt(searchParams.get("page") || "1");

    const fetchLessons = async (page = 1, searchValue = '') => {
        try {
            const res = await axios.get(`http://localhost:3001/lesson?page=${page}&search=${searchValue}`);
            setLessons(res.data.lessons);
            setCount(res.data.count);
        } catch (err) {
            console.error("Error:", err);
        }
    };
  
    useEffect(() => {
        fetchLessons(currentPage, searchValue);
    }, [currentPage, searchValue]);

    const renderRow = (item:LessonList) => (
        <tr key={item.id} className = "border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-schoolPurpleLight">
            <td className = "flex items-center gap-4 p-4">{item.subject.name}</td>
            <td>{item.class.name}</td>
            <td className = "hidden md:table-cell">{item.teacher.surname}</td>
            <td>
                <div className = "flex items-center gap-2">
                    { role === "admin" && (
                        <>
                            <FormModal table={"lesson"} type={"update"} data={item} />
                            <FormModal table={"lesson"} type={"delete"} id={item.id} />
                        </>
                    )}
                </div>
            </td>
        </tr>
    );

    return (
        <div className = "bg-white p-4 rounded-md flex-1 m-4 mt-0">
            {/*TOP*/}
            <div className = "flex items-center justify-between">
                <h1 className = "hidden md:block text-lg font-semibold">All Lessons</h1>
                <div className = "flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <TableSearch value={searchValue} onChange={(e: any) => setSearchValue(e)} />
                    <div className = "flex items-center gap-4 self-end">
                        { role === "admin" && (
                            <FormModal table={"lesson"} type={"create"} />
                        )}
                    </div>
                </div>
            </div>
            {/*LIST*/}
            <Table columns={columns} renderRow={renderRow} data={lessons} />
            {/*PAGES*/}
            <Pagination page={currentPage} count={count} />
        </div>
    )
}

export default LessonListPage