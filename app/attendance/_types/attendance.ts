import type { Employee } from "@/lib/_types/hr";
import type { Pagination } from "@/lib/_types/api";

export type AttendanceRecord = {
  uuid: string;
  employeeId: string;
  date: string;
  status: string;
  clockIn: string;
  clockOut: string | null;
};

export type AttendanceFilters = {
  employees: Employee[];
  from: string;
  to: string;
  employeeId: string;
};

export type AttendanceListProps = {
  records: AttendanceRecord[];
};

export type AttendanceListResponse = {
  code: string;
  message: string;
  data: {
    attendances: AttendanceRecord[];
    pagination: Pagination;
  };
};

export type AttendanceSummaryResponse = {
  code: string;
  message: string;
  data: {
    employee_id: string;
    start_date: string;
    end_date: string;
    total_days: number;
    attendances: AttendanceRecord[];
  };
};

export type AttendanceFiltersProps = AttendanceFilters & {
  onFromChange: (value: string) => void;
  onToChange: (value: string) => void;
  onEmployeeChange: (value: string) => void;
};
