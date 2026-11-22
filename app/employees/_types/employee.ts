import type { Employee } from "@/lib/_types/hr";
import type { FormEvent } from "react";
import type { Pagination } from "@/lib/_types/api";

export type EmployeeForm = {
  name: string;
  email: string;
  password: string;
  photo?: string;
  phoneNumber?: string;
  role?: string;
};

export const EMPTY_EMPLOYEE: EmployeeForm = {
  name: "",
  email: "",
  password: "",
  phoneNumber: "",
  role: "employee",
};

export type EmployeeHeaderProps = {
  onAdd: () => void;
};

export type EmployeeSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export type EmployeeTableProps = {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
};

export type EmployeeDialogProps = {
  open: boolean;
  editing: Employee | null;
  form: EmployeeForm;
  onClose: () => void;
  onChange: (form: EmployeeForm) => void;
  onSubmit: (event: FormEvent) => void;
};

export type EmployeeListResponse = {
  success: boolean;
  message: string;
  data: Employee[];
  pagination: Pagination;
};

export type CreateEmployeeResponse = {
  success: boolean;
  message: string;
  data: Employee;
};
