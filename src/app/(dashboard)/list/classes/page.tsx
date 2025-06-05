"use client"

import FormContainer from "@/components/FormContainer"
import FormModal from "@/components/FormModal"
import Pagination from "@/components/Pagination"
import Table from "@/components/Table"
import TableSearch from "@/components/TableSearch"
import IAnnouncement from "@/interface/IAnnouncement"
import IClass from "@/interface/IClass"
import IEvent from "@/interface/IEvent"
import ILesson from "@/interface/ILesson"
import IStudent from "@/interface/IStudent"
import ITeacher from "@/interface/ITeacher"
import { classesData, parentsData, role, studentsData, subjectsData, teachersData } from "@/lib/data"
import axios from "axios"
import { headers } from "next/headers"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

type ClassList = IClass & {announcements: IAnnouncement[]; events: IEvent[]; lessons: ILesson[]; students: IStudent[]; supervisor: ITeacher};

const columns = [
    {
        header:"Class Name", 
        accessor:"name"
    },
    {
        header:"Capacity", 
        accessor:"capacity", 
        className:"hidden md:table-cell"
    },
    {
        header:"Grade",
        accessor:"grade",
        className:"hidden md:table-cell"
    },
    {
        header:"Supervisor",
        accessor:"supervisor",
        className:"hidden md:table-cell"
    },
    {
        header:"Actions", 
        accessor:"action", 
    },
]

const ClassListPage = () => {
    const [classes, setClasses] = useState([]);
    const [count, setCount] = useState(0);
    const searchParams = useSearchParams();
    const [searchValue, setSearchValue] = useState('');
    const currentPage = parseInt(searchParams.get("page") || "1");

    const fetchClasses = async (page = 1, searchValue = '') => {
        try {
            const res = await axios.get(`http://localhost:3001/classes?page=${page}&search=${searchValue}`);
            setClasses(res.data.classes);
            setCount(res.data.count);
        } catch (err) {
            console.error("Error:", err);
        }
    };
  
    useEffect(() => {
        fetchClasses(currentPage, searchValue);
    }, [currentPage, searchValue]);

    const renderRow = (item:ClassList) => (
        <tr key={item.id} className = "border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-schoolPurpleLight">
            <td className = "flex items-center gap-4 p-4">{item.name}</td>
            <td className = "hidden md:table-cell">{item.capacity}</td>
            <td className = "hidden md:table-cell">{item.name[0]}</td>
            <td className = "hidden md:table-cell">{item.supervisor.name}</td>
            <td>
            <div className = "flex items-center gap-2">
                    { role === "admin" && (
                        <>
                            <FormContainer table="class" type="update" data={item} />
                            <FormContainer table="class" type="delete" id={item.id} />
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
                <h1 className = "hidden md:block text-lg font-semibold">All Classes</h1>
                <div className = "flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <TableSearch value={searchValue} onChange={(e: any) => setSearchValue(e)} />
                    <div className = "flex items-center gap-4 self-end">
                        { role === "admin" && (
                            <FormContainer table="class" type="create" />
                        )}
                    </div>
                </div>
            </div>
            {/*LIST*/}
            <Table columns={columns} renderRow={renderRow} data={classes} />
            {/*PAGES*/}
            <Pagination page={currentPage} count={count} />
        </div>
    )
}

export default ClassListPage