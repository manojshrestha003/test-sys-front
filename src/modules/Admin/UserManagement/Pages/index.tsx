import { ArrowUpDown, MoreVertical } from "lucide-react";
import { AdminLayout } from "@/app/lauouts/AdminLayout";
import { DataTable } from "@/common/components/DataTable";
import { OverlayLoader } from "@/common/components/OverlayLoader";
import { useGetUsersQuery, type User } from "../api/userApi";

export type Student = {
  id: string;
  name: string;
  email: string;
  enrolledCourse: string;
  examsTaken: number;
  status: "active" | "suspended";
};

export default function StudentsPage() {
  const { data: usersResponse, isLoading, isError } = useGetUsersQuery();

  const students: Student[] = (usersResponse?.data?.users ?? []).map((user: User) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    enrolledCourse: user.role === "ADMIN" ? "Administration" : "General Studies",
    examsTaken: user.emailVerified ? 1 : 0,
    status: user.status === "ACTIVE" ? "active" : "suspended",
  }));

  const columns = [
    {
      id: "name",
      accessorKey: "name",
      header: () => (
        <span className="inline-flex items-center gap-1">
          Student
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
        </span>
      ),
      cell: ({ row }: { row: { original: Student } }) => (
        <div>
          <p className="font-medium text-slate-900">{row.original.name}</p>
          <p className="text-xs text-slate-400">{row.original.email}</p>
        </div>
      ),
    },
    {
      accessorKey: "enrolledCourse",
      header: "Enrolled Course",
      cell: ({ row }: { row: { original: Student } }) => row.original.enrolledCourse,
    },
    {
      id: "examsTaken",
      accessorKey: "examsTaken",
      header: () => (
        <span className="inline-flex items-center gap-1">
          Exams Taken
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
        </span>
      ),
      cell: ({ row }: { row: { original: Student } }) => (
        <span className="font-semibold text-slate-900">{row.original.examsTaken}</span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: { row: { original: Student } }) => {
        const isActive = row.original.status === "active";
        return (
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
              isActive
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-emerald-600" : "bg-red-600"}`} />
            {isActive ? "Active" : "Suspended"}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: () => <div className="text-right">Actions</div>,
      cell: () => (
        <div className="text-right">
          <button className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Student Directory</h1>
          <p className="text-sm text-slate-500">
            Manage enrolled students, view exam history, and configure access roles.
          </p>
        </div>

        {isLoading ? (
          <div className="relative min-h-55 rounded-xl border border-slate-200 bg-white">
            <OverlayLoader isLoading={true} mode="full" text="Loading users..." />
          </div>
        ) : isError ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            Unable to load users right now.
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={students}
            searchPlaceholder="Search students by name or course..."
            searchColumnKey="name"
          />
        )}
      </div>
    </AdminLayout>
  );
}