"use client"
import FormContainer from "@/components/FormContainer"
import FormModal from "@/components/FormModal"
import Pagination from "@/components/Pagination"
import Table from "@/components/Table"
import TableSearch from "@/components/TableSearch"
import IClass from "@/interface/IClass"
import ISubject from "@/interface/ISubject"
import ITeacher from "@/interface/ITeacher"
import { role } from "@/lib/data"
import axios from "axios"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

type SubjectList = ISubject & { teachers: ITeacher[]; classes: IClass[] }

const columns = [
    {
        header:"Subject Name", 
        accessor:"name"
    },
    {
        header:"Teachers", 
        accessor:"teachers", 
        className:"hidden md:table-cell"
    },
    {
        header:"Actions", 
        accessor:"action", 
    },
]

const SubjectListPage = () => {
    const [subjects, setSubjects] = useState([]);
    const [count, setCount] = useState(0);
    const searchParams = useSearchParams();
    const [searchValue, setSearchValue] = useState('');
    const currentPage = parseInt(searchParams.get("page") || "1");

    const fetchSubjects = async (page = 1, searchValue = '') => {
        try {
            const res = await axios.get(`http://localhost:3001/subject?page=${page}&search=${searchValue}`);
            setSubjects(res.data.subjects);
            setCount(res.data.count);
        } catch (err) {
            console.error("Error:", err);
        }
    };
  
    useEffect(() => {
        fetchSubjects(currentPage, searchValue);
    }, [currentPage, searchValue]);

    const renderRow = (item:SubjectList) => (
        <tr key={item.id} className = "border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-schoolPurpleLight">
            <td className = "flex items-center gap-4 p-4">{item.name}</td>
            <td className = "hidden md:table-cell">{item.teachers.map((t) => t.name).join(", ")}</td>
            <td>
                <div className = "flex items-center gap-2">
                    { role === "admin" && (
                        <>  
                            <FormContainer table="subject" type="update" data={item} />
                            <FormContainer table="subject" type="delete" id={item.id} />
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
                <h1 className = "hidden md:block text-lg font-semibold">All Subjects</h1>
                <div className = "flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                   <TableSearch value={searchValue} onChange={(e: any) => setSearchValue(e)} />
                    <div className = "flex items-center gap-4 self-end">
                        { role === "admin" && (          
                            <FormContainer table="subject" type="create" />
                        )}
                    </div>
                </div>
            </div>
            {/*LIST*/}
            <Table columns={columns} renderRow={renderRow} data={subjects} />
            {/*PAGES*/}
            <Pagination page={currentPage} count={count} />
        </div>
    )
}

export default SubjectListPage