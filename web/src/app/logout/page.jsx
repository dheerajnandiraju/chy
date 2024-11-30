"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Simulate the logout action
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    router.push("/login"); // Redirect to login page
  }, [router]);

  return (
    <div className="container mx-auto mt-16 p-4">
      <h1 className="text-3xl font-bold text-center">Logging out...</h1>
    </div>
  );
};

export default LogoutPage;
