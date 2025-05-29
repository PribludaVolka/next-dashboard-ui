// components/BigCalendarContainer.tsx
import BigCalendar from './BigCalendar';

const BigCalendarContainer = async ({
  type,
  id,
}: {
  type: 'teacherId' | 'classId';
  id: string | number;
}) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/lesson/by?type=${type}&id=${id}`,
    {
      next: { revalidate: 0 }, // отключает кеширование
    }
  );

  const data = await res.json();

  // Преобразуем строки в Date, если нужно
  const schedule = data.map((lesson: any) => ({
    ...lesson,
    start: new Date(lesson.start),
    end: new Date(lesson.end),
  }));

  return (
    <div className="h-screen p-4">
      <BigCalendar data={schedule} />
    </div>
  );
};

export default BigCalendarContainer;
