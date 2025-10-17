import React from "react";
import StaffManagement from "../staff/StaffManagement";

const Principal = () => {
  return (
    <StaffManagement
      role="principal"
      title="Data Kepala Sekolah"
      description="Kelola data kepala sekolah"
      addButtonText="Tambah Kepala Sekolah"
      addRoute="/admin/staff/add/principal"
    />
  );
};

export default Principal;