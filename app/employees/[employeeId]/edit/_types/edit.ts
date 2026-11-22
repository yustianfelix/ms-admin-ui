import type { Employee } from "@/lib/_types/hr";

export type EditEmployeeForm = {
  currentPassword: string;
  phoneNumber: string;
  photo: string;
  newPassword: string;
};

export type EmployeeProfileResponse = {
  success: boolean;
  message: string;
  data: Employee;
};

export type EditEmployeeProps = {
  employeeId: string;
};
