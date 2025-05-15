"use client"

import { useRouter, useSearchParams, usePathname } from "next/navigation"

interface PaginationProps {
  page: number
  count: number
  pageSize?: number
}

const Pagination = ({ page, count, pageSize = 10 }: PaginationProps) => {
  const totalPages = Math.ceil(count / pageSize)
  const hasPrev = page > 1
  const hasNext = page < totalPages

  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const changePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", newPage.toString())
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="p-4 flex justify-between items-center text-gray-500">
      <button
        onClick={() => changePage(page - 1)}
        disabled={!hasPrev}
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Prev
      </button>
      <div className="flex items-center gap-2 text-sm">
        {Array.from({ length: totalPages }, (_, i) => {
          const pageIndex = i + 1
          return (
            <button
              key={pageIndex}
              className={`px-2 rounded-sm ${page === pageIndex ? "bg-schoolSky" : ""}`}
              onClick={() => changePage(pageIndex)}
            >
              {pageIndex}
            </button>
          )
        })}
      </div>
      <button
        onClick={() => changePage(page + 1)}
        disabled={!hasNext}
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  )
}

export default Pagination
