"use client"
import axios from "axios";
import { useEffect, useState } from "react";

const EventList = ({ dateParam }: { dateParam: string | undefined }) => {
    const date = dateParam ? new Date(dateParam) : new Date();
    const [events, setEvents] = useState<any>();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:3001/events?date=${date.toISOString()}`
                );
                setEvents(res.data);

            } catch (err) {
                console.error("Ошибка загрузки событий:", err);
            }
        };

        fetchEvents();
    }, [dateParam]);

    return events?.map((event: any) => (
        <div
            className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-lamaSky even:border-t-lamaPurple"
            key={event.id}
        >
            <div className="flex items-center justify-between">
                <h1 className="font-semibold text-gray-600">{event.title}</h1>
                <span className="text-gray-300 text-xs">
                   {new Date(event.startTime).toLocaleTimeString("en-UK", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                    })}
                </span>
            </div>
            <p className="mt-2 text-gray-400 text-sm">{event.description}</p>
        </div>
    ));
};

export default EventList;