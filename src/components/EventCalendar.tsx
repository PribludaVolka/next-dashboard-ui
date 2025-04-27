"use client"

import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import Image from "next/image";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const events = [
    {
        id: 1,
        title: "1",
        time: "12:00 PM - 2:00 PM",
        descriprion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
        id: 2,
        title: "2",
        time: "12:00 PM - 2:00 PM",
        descriprion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
        id: 3,
        title: "3",
        time: "12:00 PM - 2:00 PM",
        descriprion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
];

const EventCalendar = () => {
    const [value, setValue] = useState<Value>(null);

    useEffect(() => {
        setValue(new Date());
    }, []);

    return (
        <div className="bg-white p-4 rounded-md">
            {value && <Calendar onChange={setValue} value={value} />}
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold my-4">Events</h1>
                <Image src="/moreDark.png" alt="" width={20} height={20} />
            </div>
            <div className="flex flex-col gap-4">
                {events.map(event => (
                    <div className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-schoolSky even:border-t-schoolPurple"
                        key={event.id}>
                        <div className="flex items-center justify-between">
                            <h1 className="font-semibold text-gray-600">{event.title}</h1>
                            <span className="text-gray-300 text-xs">{event.time}</span>
                        </div>
                        <p className="mt-2 text-gray-400 text-sm">{event.descriprion}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default EventCalendar;