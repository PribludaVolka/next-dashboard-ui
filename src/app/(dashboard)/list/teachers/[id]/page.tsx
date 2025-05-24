"use client"
import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/BigCalendar";
import FormModal from "@/components/FormModal";
import Performance from "@/components/Performance";
import Image from "next/image";
import Link from "next/link";
'use client'

const SingleTeacherPage = () => {
    return (
        <div className = "flex-1 p-4 flex flex-col xl:flex-row gap-4">
            {/*LEFT*/}
            <div className = "w-full xl:w-2/3">
                {/* TOP */}
                <div className = "flex flex-col lg:flex-row gap-4">
                    {/* USER INFO CARD */}
                    <div className = "bg-schoolSky py-6 px-4 rounded-md flex-1 flex gap-4">
                        <div className = "w-1/3">
                            <Image src = "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1200" alt = "" width={144} height={144} className = "rounded-full w-36 h-36 object-cover"/>
                        </div>
                        <div className = "w-2/3 flex-col justify-between gap-4">
                            <div className = "flex items-center gap-4">
                                <h1 className = "text-xl font-semibold">Stepan Pan</h1>
                                    <FormModal table = "teacher" type = "update" data={
                                    {
                                        id: 1,
                                        username: "wasd",
                                        email: "test@gmail.com",
                                        password: "password",
                                        firstName: "Stepan",
                                        lastName: "Pan",
                                        phone: "+1 234 567 89",
                                        address: "1234 Ukr asd9",
                                        bloodType: "A+",
                                        dateOfBirth: "2003-10-20",
                                        sex: "male",
                                        img: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1200",
                                    }
                                }/>
                            </div>  
                            <p className = "text-sm text-gray-500">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non, ab!</p>
                            <div className = "flex items-center justify-between gap-2 flex-wrap text-xs font-medium mt-5">
                                <div className = "w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                                    <Image src = "/blood.png" alt = "" width={14} height={14}/>
                                    <span>A+</span>
                                </div>
                                <div className = "w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                                    <Image src = "/date.png" alt = "" width={14} height={14}/>
                                    <span>April 2025</span>
                                </div>
                                <div className = "w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                                    <Image src = "/mail.png" alt = "" width={14} height={14}/>
                                    <span>example@gmail.com</span>
                                </div>
                                <div className = "w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                                    <Image src = "/phone.png" alt = "" width={14} height={14}/>
                                    <span>+1 234 567</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* SMALL CARDS */}
                    <div className = "flex-1 flex gap-4 justify-between flex-wrap">
                        {/* CARD */}
                        <div className = "bg-white w-full p-4 rounded-md flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
                            <Image src = "/singleAttendance.png" alt = "" width={24} height={24} className = "w-6 h-6" />
                            <div className = "">
                                <h1 className = "text-xl font-semibold">90%</h1>
                                <span className = "text-sm text-gray-400">Attendance</span>
                            </div>
                        </div>
                        {/* CARD */}
                        <div className = "bg-white w-full p-4 rounded-md flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
                            <Image src = "/singleBranch.png" alt = "" width={24} height={24} className = "w-6 h-6" />
                            <div className = "">
                                <h1 className = "text-xl font-semibold">2</h1>
                                <span className = "text-sm text-gray-400">Branches</span>
                            </div>
                        </div>
                        {/* CARD */}
                        <div className = "bg-white w-full p-4 rounded-md flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
                            <Image src = "/singleLesson.png" alt = "" width={24} height={24} className = "w-6 h-6" />
                            <div className = "">
                                <h1 className = "text-xl font-semibold">6</h1>
                                <span className = "text-sm text-gray-400">Lessons</span>
                            </div>
                        </div>
                        {/* CARD */}
                        <div className = "bg-white w-full p-4 rounded-md flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
                            <Image src = "/singleClass.png" alt = "" width={24} height={24} className = "w-6 h-6" />
                            <div className = "">
                                <h1 className = "text-xl font-semibold">6</h1>
                                <span className = "text-sm text-gray-400">Classes</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* BOTTOM */}
                <div className = "mt-4 bg-white rounded-md p-4 h-[800px]">
                    <h1>Teacher&apos;s Schedule</h1>
                    <BigCalendar />
                </div>
            </div>
            {/*RIGHT*/}
            <div className = "w-full xl:w-1/3 flex flex-col gap-4">
                <div className = "bg-white p-4 rounded-md">
                    <h1 className = "text-xl font-semibold">Shortcuts</h1>
                    <div className = "mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
                        <Link className = "p-3 rounded-md bg-schoolSkyLight" href = {"/list/classes?teacherId=${teacher.id"}>Teacher&apos;s Classes</Link>
                        <Link className = "p-3 rounded-md bg-schoolPurpleLight" href = {"/list/students?teacherId=${teacher.id"}>Teacher&apos;s Students</Link>
                        <Link className = "p-3 rounded-md bg-schoolYellowLight" href = {"/list/lessons?teacherId=${teacher.id"}>Teacher&apos;s Lessons</Link>
                        <Link className = "p-3 rounded-md bg-pink-50" href = {"/list/exams?teacherId=${teacher.id"}>Teacher&apos;s Exams</Link>
                        <Link className = "p-3 rounded-md bg-green-50" href = {"/list/assignments?teacherId=${teacher.id"}>Teacher&apos;s Assignment</Link>
                    </div>
                </div>
                <Performance />
                <Announcements />
            </div>
        </div>
    );
};

export default SingleTeacherPage;