import { Inter } from "next/font/google";
import "./globals.css";
import SidebarComponent from "@/components/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dashboard with Minimal Sidebar",
  description: "A minimal dashboard layout with a custom sidebar",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex">
         <SidebarComponent/>
          <main className="flex-1 p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}

