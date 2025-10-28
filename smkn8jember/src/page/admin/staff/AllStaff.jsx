import React from "react";
import StaffManagement from "./StaffManagement";

const AllStaff = () => {
  return (
    <StaffManagement
      role={null}
      title="Data Staff"
      description="Kelola semua data staff"
      addButtonText="Tambah Staff"
      addRoute="/admin/staff/add"
    />
  );
};

export default AllStaff;