"use client";
import ProtectedRoute from "@/components/ProtectedRoute";

const AdminLayout = ({ children }) => {
  return (
    <ProtectedRoute>
      <div className="admin-container">
        {/* Bu yerda sidebar va navbar bo‘lishi mumkin */}
        {children}
      </div>
    </ProtectedRoute>
  );
};

export default AdminLayout;
