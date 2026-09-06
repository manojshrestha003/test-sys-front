
export interface ActiveExamCardProps {
  title: string;
  questionSet: string;
  duration: string;
  activeStudents?: number;
  startTime?: string;
  status: "live" | "scheduled";
  onMonitorClick?: () => void;
}

export interface CategoryBarProps {
  label: string;
  count: number;
  percentage: number;
  colorClass?: string;
}

export interface MetricCardProps {
  title: string;
  value: string;
  subtext: string;
  icon: React.ReactNode;
  iconBgColor?: string;
}


export interface SubmissionData {
  studentName: string;
  studentId: string;
  examTitle: string;
  score: string;
  passed: boolean;
  onActionClick?: () => void;
}

export interface SystemAlertProps {
  variant?: "warning" | "info" | "neutral";
  title: string;
  message: string;
}