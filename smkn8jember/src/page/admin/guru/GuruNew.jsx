import React from "react";
import StaffManagement from "../staff/StaffManagement";

const Guru = () => {
  return (
    <StaffManagement
      role="teacher"
      title="Data Staff"
      description="Kelola data staff"
      addButtonText="Tambah Staff"
      addRoute="/admin/staff/add/teacher"
    />
  );
};

export default Guru;