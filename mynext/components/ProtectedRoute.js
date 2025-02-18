"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

    if (!token) {
      router.push("/admin/login"); // Token yo‘q bo‘lsa, login sahifasiga yuborish
    } else {
      setIsAuth(true);
    }
  }, []);

  if (!isAuth) return null; // Token tekshirilayotgan paytda hech narsa ko‘rsatmaydi

  return <>{children}</>;
};

export default ProtectedRoute;
