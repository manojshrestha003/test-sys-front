import { Users, FileText, HelpCircle, GraduationCap, Plus } from "lucide-react";
import { AdminLayout } from "@/app/lauouts/AdminLayout";
import { Card } from "@/common/components/ui/Card";
import { Button } from "@/common/components/ui/Button";

// Import custom dashboard components
import { MetricCard } from "../components/MetricCard";
import { ActiveExamCard } from "../components/ActiveExamCard";
import { RecentSubmissionRow } from "../components/RecentSubmissionRow";
import { CategoryProgressBar } from "../components/CategoryProgressBar";
import { SystemAlert } from "../components/SystemAlert";

export function DashboardPage() {
  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            System Overview
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Monitor ongoing exams, manage question banks, and review student results.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 bg-white border-slate-200">
            <Plus className="w-4 h-4" /> Add Question
          </Button>
          <Button className="gap-2 bg-indigo-600 text-white hover:bg-indigo-700">
            <Plus className="w-4 h-4" /> Create Exam
          </Button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <MetricCard
          title="Total Registered Students"
          value="2,845"
          subtext="+12% from last month"
          icon={<Users className="w-5 h-5 text-blue-600" />}
          iconBgColor="bg-blue-50"
        />
        <MetricCard
          title="Active Question Sets"
          value="142"
          subtext="12 categories available"
          icon={<FileText className="w-5 h-5 text-indigo-600" />}
          iconBgColor="bg-indigo-50"
        />
        <MetricCard
          title="Total Questions Bank"
          value="18,500+"
          subtext="MCQ, Essay & Code tests"
          icon={<HelpCircle className="w-5 h-5 text-amber-600" />}
          iconBgColor="bg-amber-50"
        />
        <MetricCard
          title="Average Pass Rate"
          value="78.4%"
          subtext="+3.2% vs previous term"
          icon={<GraduationCap className="w-5 h-5 text-emerald-600" />}
          iconBgColor="bg-emerald-50"
        />
      </div>

      {/* Content Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          
          {/* Active Exams */}
          <Card className="p-6 bg-white border-slate-200 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900 mb-4">Live & Upcoming Exams</h2>
            <div className="space-y-4">
              <ActiveExamCard
                title="CS301: Data Structures Midterm"
                questionSet="DS-2026-v2 (50 Questions)"
                duration="90 Mins"
                activeStudents={148}
                status="live"
              />
              <ActiveExamCard
                title="ENG201: Technical Writing Assessment"
                questionSet="TW-Final-2026"
                duration="60 Mins"
                startTime="Starts at 02:00 PM"
                status="scheduled"
              />
            </div>
          </Card>

          {/* Recent Submissions */}
          <Card className="p-6 bg-white border-slate-200 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900 mb-4">Recent Submissions</h2>
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-semibold text-slate-400 uppercase">
                  <th className="pb-3">Student</th>
                  <th className="pb-3">Exam</th>
                  <th className="pb-3">Score</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <RecentSubmissionRow
                  studentName="Alex Morgan"
                  studentId="STU-9042"
                  examTitle="CS301 Midterm"
                  score="92/100"
                  passed={true}
                />
                <RecentSubmissionRow
                  studentName="David Chen"
                  studentId="STU-8812"
                  examTitle="CS301 Midterm"
                  score="48/100"
                  passed={false}
                />
              </tbody>
            </table>
          </Card>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-8">
          <Card className="p-6 bg-white border-slate-200 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900 mb-4">Question Bank Distribution</h2>
            <div className="space-y-4">
              <CategoryProgressBar label="Computer Science" count={6420} percentage={35} colorClass="bg-indigo-600" />
              <CategoryProgressBar label="Mathematics" count={4100} percentage={22} colorClass="bg-blue-500" />
            </div>
          </Card>

          <Card className="p-6 bg-white border-slate-200 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900 mb-4">System Alerts</h2>
            <div className="space-y-3">
              <SystemAlert
                variant="warning"
                title="Pending Evaluation"
                message="14 essay questions require manual grading for ENG201."
              />
              <SystemAlert
                variant="info"
                title="Scheduled Maintenance"
                message="Database backup scheduled at midnight."
              />
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}

export default DashboardPage;