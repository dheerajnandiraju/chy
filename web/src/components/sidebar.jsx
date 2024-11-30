"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Home, BarChart2, Users, FileText, Settings, HelpCircle, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SidebarComponent = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Define the navigation items
  const navItems = [
    { name: "Dashboard", icon: <Home className="h-5 w-5" />, path: "/" },
    { name: "Volunteers", icon: <BarChart2 className="h-5 w-5" />, path: "/volunteers" },
    { name: "NGOs", icon: <Users className="h-5 w-5" />, path: "/ngos" },
    { name: "Farmers", icon: <FileText className="h-5 w-5" />, path: "/farmers" },
    { name: "Restaurants", icon: <Settings className="h-5 w-5" />, path: "/restaurants" },
    { name: "Food Tracking", icon: <Settings className="h-5 w-5" />, path: "/food-tracking" },
    { name: "Feedback", icon: <Settings className="h-5 w-5" />, path: "/feedback" },
    { name: "Emergency Alerts", icon: <Settings className="h-5 w-5" />, path: "/emergency-alerts" },
  ];

  const bottomItems = [
    { name: "Help", icon: <HelpCircle className="h-5 w-5" />, path: "/help" },
  ];

  // Effect to check localStorage for login state on page load
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  // Handle logout action
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    router.push("/login"); // Redirect to login page
  };

  // Handle login action
  const handleLogin = () => {
    router.push("/login"); // Redirect to login page
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r bg-black">
      <div className="flex h-full flex-col">
        {/* Title */}
        <div className="p-4 text-white font-bold text-xl flex items-center justify-center">
          <span>FOOD CENTER</span>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-4 p-4">
          {navItems.map((item) => (
            <Link key={item.name} href={item.path} passHref>
              <motion.button
                className="group relative flex w-full items-center rounded-lg px-4 py-2 bg-white text-black hover:bg-gray-100"
                whileHover={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.95 }}
              >
                {item.icon}
                <span className="ml-4">{item.name}</span>
              </motion.button>
            </Link>
          ))}
        </nav>

        {/* Bottom Items */}
        <div className="space-y-2 p-4">
          {bottomItems.map((item) => (
            <motion.button
              key={item.name}
              className="group relative flex w-full items-center rounded-lg px-4 py-3 bg-white text-black hover:bg-gray-100"
              whileHover={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              {item.icon}
              <span className="ml-4">{item.name}</span>
            </motion.button>
          ))}
          
          {/* Logout or Login button */}
          {isLoggedIn ? (
            <motion.button
              onClick={handleLogout}
              className="group relative flex w-full items-center rounded-lg px-4 py-3 bg-white text-black hover:bg-gray-100"
              whileHover={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <LogOut className="h-5 w-5" />
              <span className="ml-4">Logout</span>
            </motion.button>
          ) : (
            <motion.button
              onClick={handleLogin}
              className="group relative flex w-full items-center rounded-lg px-4 py-3 bg-white text-black hover:bg-gray-100"
              whileHover={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <LogOut className="h-5 w-5" />
              <span className="ml-4">Login</span>
            </motion.button>
          )}
        </div>
      </div>
    </aside>
  );
};

export default SidebarComponent;
