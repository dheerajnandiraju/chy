import { Sidebar } from "lucide-react";
import Dashboard from "./dashboard/page";

export default function Home() {
  return (
    <div className="flex">
      {/* Sidebar Component */}
      <div className="w-64 h-screen bg-white text-white">
        <Sidebar className="m-4" />
        {/* You can place your other sidebar items here */}
      </div>

      {/* Dashboard Component */}
      <div className="flex-1 h-screen">
        <Dashboard />
      </div>
    </div>
  );
}
