import React from "react";
import StaffManagement from "../staff/StaffManagement";

const Guru = () => {
  return (
    <StaffManagement
      role="teacher"
      title="Data Guru"
      description="Kelola data guru"
      addButtonText="Tambah Guru"
      addRoute="/admin/staff/add/teacher"
    />
  );
};

export default Guru;