"use client"
import Image from "next/image";
import CountChart from "./CountChart";
import { useEffect, useState } from "react";
import axios from "axios";

const CountChartContainer = () => {
    const [students, setStudents] = useState<any>([]);
    const [boys, setBoys] = useState<any>();
    const [girls, setGirls] = useState<any>();

    const fetchStudents = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/students/all`);
            setStudents(res.data);

            const boys = res.data.filter((d: any) => d.sex === "MALE")?.length || 0;
            const girls = res.data.filter((d: any) => d.sex === "FEMALE")?.length || 0;
            setBoys(boys);
            setGirls(girls);
        } catch (err) {
            console.error("Ошибка загрузки учителей:", err);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);


    return (
        <div className="bg-white rounded-xl w-full h-full p-4">
        {/* TITLE */}
        <div className="flex justify-between items-center">
            <h1 className="text-lg font-semibold">Students</h1>
            <Image src="/moreDark.png" alt="" width={20} height={20} />
        </div>
        {/* CHART */}
        <CountChart boys={boys} girls={girls} />
        {/* BOTTOM */}
        <div className="flex justify-center gap-16">
            <div className="flex flex-col gap-1">
            <div className="w-5 h-5 bg-lamaSky rounded-full" />
            <h1 className="font-bold">{boys}</h1>
            <h2 className="text-xs text-gray-300">
                Boys ({Math.round((boys / (boys + girls)) * 100)}%)
            </h2>
            </div>
            <div className="flex flex-col gap-1">
            <div className="w-5 h-5 bg-lamaYellow rounded-full" />
            <h1 className="font-bold">{girls}</h1>
            <h2 className="text-xs text-gray-300">
                Girls ({Math.round((girls / (boys + girls)) * 100)}%)
            </h2>
            </div>
        </div>
        </div>
    );
};

export default CountChartContainer;