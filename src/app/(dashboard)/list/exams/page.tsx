"use client"

import FormModal from "@/components/FormModal"
import Pagination from "@/components/Pagination"
import Table from "@/components/Table"
import TableSearch from "@/components/TableSearch"
import IClass from "@/interface/IClass"
import IExam from "@/interface/IExam"
import IResult from "@/interface/IResult"
import ISubject from "@/interface/ISubject"
import ITeacher from "@/interface/ITeacher"
import { classesData, examsData, lessonsData, parentsData, role, studentsData, subjectsData, teachersData } from "@/lib/data"
import axios from "axios"
import { headers } from "next/headers"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

type ExamList = IExam & {results: IResult[]; lesson: {subject: ISubject; teacher: ITeacher; class: IClass}};

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
        header:"Date",
        accessor:"date",
        className:"hidden md:table-cell"
    },
    {
        header:"Actions", 
        accessor:"action", 
    },
]

const ExamListPage = () => {
    const [exams, setExams] = useState([]);
    const [count, setCount] = useState(0);
    const searchParams = useSearchParams();
    const [searchValue, setSearchValue] = useState('');
    const currentPage = parseInt(searchParams.get("page") || "1");

    const fetchExams = async (page = 1, searchValue = '') => {
        try {
            const res = await axios.get(`http://localhost:3001/exam?page=${page}&search=${searchValue}`);
            setExams(res.data.exams);
            setCount(res.data.count);
        } catch (err) {
            console.error("Error:", err);
        }
    };
  
    useEffect(() => {
        fetchExams(currentPage, searchValue);
    }, [currentPage, searchValue]);

    const renderRow = (item:ExamList) => (
        <tr key={item.id} className = "border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-schoolPurpleLight">
            <td className = "flex items-center gap-4 p-4">{item.lesson.subject.name}</td>
            <td>{item.lesson.class.name}</td>
            <td className = "hidden md:table-cell">{item.lesson.teacher.name + " " + item.lesson.teacher.surname}</td>
            <td className = "hidden md:table-cell">
                {new Intl.DateTimeFormat("en-US").format(new Date(item.startTime))};
            </td>
            <td>
                <div className = "flex items-center gap-2">
                    { role === "admin" && (
                        <>
                            <FormModal table={"exam"} type={"update"} data={item} />
                            <FormModal table={"exam"} type={"delete"} id={item.id} />
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
                <h1 className = "hidden md:block text-lg font-semibold">All Exams</h1>
                <div className = "flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <TableSearch value={searchValue} onChange={(e: any) => setSearchValue(e)} />
                    <div className = "flex items-center gap-4 self-end">
                        { role === "admin" && (
                            <FormModal table={"exam"} type={"create"} />
                        )}
                    </div>
                </div>
            </div>
            {/*LIST*/}
            <Table columns={columns} renderRow={renderRow} data={exams} />
            {/*PAGES*/}
            <Pagination page={currentPage} count={count} />
        </div>
    )
}

export default ExamListPage