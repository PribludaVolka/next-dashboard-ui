"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import Pagination from "@/components/Pagination"
import Table from "@/components/Table"
import TableSearch from "@/components/TableSearch"
import ITeacher from "@/interface/ITeacher"
import ISubject from "@/interface/ISubject"
import IClass from "@/interface/IClass"
import FormModal from "@/components/FormModal"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import FormContainer from "@/components/FormContainer"

type TeacherList = ITeacher & { subjects: ISubject[]; classes: IClass[] }

const columns = [
  { header: "Info", accessor: "info" },
  { header: "Teacher ID", accessor: "teacherId", className: "hidden md:table-cell" },
  { header: "Subjects", accessor: "subjects", className: "hidden md:table-cell" },
  { header: "Classes", accessor: "classes", className: "hidden md:table-cell" },
  { header: "Phone", accessor: "phone", className: "hidden lg:table-cell" },
  { header: "Address", accessor: "address", className: "hidden lg:table-cell" },
  { header: "Actions", accessor: "action" },
];

const renderRow = (item: TeacherList) => (
  <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-schoolPurpleLight">
    <td className="flex items-center gap-4 p-4">
      <Image src={item?.img || "/noAvatar.png"} alt="" width={40} height={40} className="md:hidden xl:block w-10 h-10 rounded-full object-cover" />
      <div className="flex flex-col">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-xs text-gray-500">{item.email}</p>
      </div>
    </td>
    <td className="hidden md:table-cell">{item.username}</td>
    <td className="hidden md:table-cell">{item.subjects.map((s) => s.name).join(", ")}</td>
    <td className="hidden md:table-cell">{item.classes.map((c) => c.name).join(", ")}</td>
    <td className="hidden lg:table-cell">{item.phone}</td>
    <td className="hidden lg:table-cell">{item.address}</td>
    <td>
      <div className="flex items-center gap-2">
        <Link href={`/list/teachers/${item.id}`}>
          <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
            <Image src="/view.png" alt="" width={16} height={16} />
          </button>
        </Link>
        <FormContainer table="teacher" type="delete" id={item.id} />
      </div>
    </td>
  </tr>
);

const TeacherListPage = () => {
  const [teachers, setTeachers] = useState<TeacherList[]>([]);
  const [count, setCount] = useState(0);
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState('');

  const currentPage = parseInt(searchParams.get("page") || "1");

  const fetchTeachers = async (page = 1, searchValue = '') => {
    try {
      const res = await axios.get(`http://localhost:3001/teachers?page=${page}&search=${searchValue}`);
      setTeachers(res.data.teachers);
      setCount(res.data.count);
    } catch (err) {
      console.error("Ошибка загрузки учителей:", err);
    }
  };

  useEffect(() => {
    fetchTeachers(currentPage, searchValue);
  }, [currentPage, searchValue]);


  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Teachers</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch value={searchValue} onChange={(e: any) => setSearchValue(e)} />
          <div className="flex items-center gap-4 self-end">
             <FormContainer table="teacher" type="create" />
          </div>
        </div>
      </div>
      <Table columns={columns} renderRow={renderRow} data={teachers} />
      <Pagination page={currentPage} count={count} />
    </div>
  );
};

export default TeacherListPage;
