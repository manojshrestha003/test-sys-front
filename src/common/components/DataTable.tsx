import * as React from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

import { Input } from "./ui/input";
import { Button } from "./ui/Button";

interface DataTableColumn<TData, TValue = unknown> {
  id?: string;
  accessorKey?: keyof TData | string;
  header?: React.ReactNode | ((context: { column: { id?: string } }) => React.ReactNode);
  cell?: (context: { row: { original: TData }; getValue: () => TValue }) => React.ReactNode;
}

interface DataTableProps<TData> {
  columns: DataTableColumn<TData>[];
  data: TData[];
  searchPlaceholder?: string;
  searchColumnKey?: string;
}

export function DataTable<TData extends Record<string, unknown>>({
  columns,
  data,
  searchPlaceholder = "Search records...",
  searchColumnKey,
}: DataTableProps<TData>) {
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [pageIndex, setPageIndex] = React.useState(0);
  const pageSize = 5;

  const filteredData = React.useMemo(() => {
    const keyword = globalFilter.trim().toLowerCase();

    if (!keyword) {
      return data;
    }

    return data.filter((row) => {
      if (searchColumnKey) {
        const cellValue = row[searchColumnKey as keyof TData];
        return String(cellValue ?? "").toLowerCase().includes(keyword);
      }

      return Object.values(row).some((value) =>
        String(value ?? "").toLowerCase().includes(keyword)
      );
    });
  }, [data, globalFilter, searchColumnKey]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));

  React.useEffect(() => {
    if (pageIndex >= totalPages) {
      setPageIndex(totalPages - 1);
    }
  }, [pageIndex, totalPages]);

  const paginatedData = React.useMemo(() => {
    const start = pageIndex * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, pageIndex]);

  const renderCellValue = (row: TData, column: DataTableColumn<TData>) => {
    const key = column.id ?? column.accessorKey ?? "";
    const value = key ? row[key as keyof TData] : undefined;

    if (column.cell) {
      return column.cell({
        row: { original: row },
        getValue: () => value as never,
      });
    }

    if (value === null || value === undefined) {
      return "";
    }

    return String(value);
  };

  const renderHeaderValue = (column: DataTableColumn<TData>, index: number) => {
    const key = column.id ?? column.accessorKey ?? `column-${index}`;

    if (typeof column.header === "function") {
      return column.header({ column: { id: String(key) } });
    }

    if (column.header !== undefined) {
      return column.header;
    }

    return String(key);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            placeholder={searchPlaceholder}
            value={globalFilter}
            onChange={(e) => {
              setGlobalFilter(e.target.value);
              setPageIndex(0);
            }}
            className="pl-9 h-9 border-slate-200 focus:border-indigo-600 focus:ring-indigo-600/20 text-sm"
          />
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <tr>
                {columns.map((column, index) => (
                  <th key={String(column.id ?? column.accessorKey ?? `column-${index}`)} className="px-4 py-3">
                    {renderHeaderValue(column, index)}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {paginatedData.length ? (
                paginatedData.map((row, rowIndex) => (
                  <tr key={rowIndex} className="hover:bg-slate-50/80 transition-colors">
                    {columns.map((column, colIndex) => (
                      <td key={`${rowIndex}-${String(column.id ?? column.accessorKey ?? colIndex)}`} className="px-4 py-3 text-slate-700">
                        {renderCellValue(row, column)}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="h-24 text-center text-slate-500 text-sm">
                    No matching records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200 bg-slate-50/50">
          <div className="text-xs text-slate-500">
            Page <span className="font-semibold text-slate-900">{Math.min(pageIndex + 1, totalPages)}</span> of{" "}
            <span className="font-semibold text-slate-900">{totalPages}</span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))}
              disabled={pageIndex === 0}
              className="border-slate-200 bg-white"
            >
              <ChevronLeft className="w-4 h-4 mr-1" /> Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPageIndex((prev) => Math.min(prev + 1, totalPages - 1))}
              disabled={pageIndex >= totalPages - 1}
              className="border-slate-200 bg-white"
            >
              Next <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}