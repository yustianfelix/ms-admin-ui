export type Employee = {
  employeeId: string;
  name: string;
  email: string;
  photo: string | null;
  role: string;
  phoneNumber: string | null;
  updatedAt?: string;
};

export type AttendanceRecord = {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  date: string;
  clockIn: string;
  clockOut: string | null;
};
