import React from "react";
import StaffManagement from "../staff/StaffManagement";

const Karyawan = () => {
  return (
    <StaffManagement
      role="employee"
      title="Data Karyawan"
      description="Kelola data karyawan"
      addButtonText="Tambah Karyawan"
      addRoute="/admin/staff/add/employee"
    />
  );
};

export default Karyawan;