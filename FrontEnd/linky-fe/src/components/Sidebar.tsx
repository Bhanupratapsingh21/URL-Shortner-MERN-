"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    IconLayoutDashboard,
    IconUser,
    IconPlaylistAdd,
    IconHome,
    IconHandClick,
    IconTimeline,
} from "@tabler/icons-react";
import logo from "../../public/logo.png";
import { useSelector } from "react-redux";
import userType from "@/types/user.type";
import { useToast } from "@/hooks/use-toast";

export function Sidebar() {
    const pathname = usePathname(); // Get the current route
    const user = useSelector((state: { user: userType }) => state.user);
    const links = [
        {
            title: "Home",
            icon: <IconHome className="h-full w-full" />,
            href: "/",
        },
        {
            title: "Dashboard",
            icon: <IconLayoutDashboard className="h-full w-full" />,
            href: "/dashboard",
        },
        {
            title: "Create A Link",
            icon: <IconPlaylistAdd className="h-full w-full" />,
            href: "/dashboard/Create-link",
        },
        {
            title: "All Links",
            icon: <IconTimeline className="h-full w-full" />,
            href: "/dashboard/All-links",
        },
        {
            title: "Active Links",
            icon: <IconHandClick className="h-full w-full" />,
            href: "/components",
        },

        {
            title: "Profile",
            icon: <IconUser className="h-full w-full" />,
            href: "https://twitter.com",
        },
    ];

    const { toast } = useToast();

    function calltoast() {
        toast({
            title: "Logout",
            description: "You have been logged out",
        });
    }

    return (
        <aside className="inset-y-0 lg:flex hidden flex-col justify-between h-screen w-full  md:w-80 bg-[#09090B] shadow-xl transition-all duration-300 ease-in-out">
            {/* Header */}
            <div>
                <div className="p-6 border-b border-gray-800">
                    <div className="flex items-center gap-3">
                        <Image
                            src={logo}
                            alt="Logo"
                            width={50}
                            height={50}
                            className="transition-transform duration-300 hover:scale-110"
                        />
                        <h1 className="text-xl font-bold text-white">Linky Dashboard</h1>
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="mt-6 px-3">
                    <ul className="space-y-2">
                        {links.map((link) => (
                            <li key={link.title}>
                                <Link
                                    href={link.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group hover:bg-[#1E293B] relative ${pathname === link.href
                                        ? "text-[#c890f9] bg-[#1E293B]"
                                        : "text-gray-400"
                                        }`}
                                >
                                    <div className="w-6 h-6 transition-colors duration-200 group-hover:text-[#c890f9]">
                                        {link.icon}
                                    </div>
                                    <span className="font-medium">{link.title}</span>
                                    {pathname === link.href && (
                                        <div className="absolute left-0 w-1 h-full bg-[#c890f9] rounded-r-full transition-all duration-300 ease-in-out" />
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            {/* Bottom Buttons */}
            <div className="p-3 space-y-2 border-t border-gray-900 mt-auto">
                <div
                    onClick={calltoast}
                    className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${pathname === "/dashboard" ? "bg-black border text-white" : "bg-black text-white hover:bg-opacity-90 hover:transform hover:scale-[1.02] active:scale-[0.98]"
                        }`}
                >
                    <div className="h-6 w-6 bg-blue-800  rounded-full flex items-center justify-center">
                        <h2 className="text-[10px]">{user.username.slice(0, 2)}</h2>
                    </div>
                    <span className="font-medium">{user.username}</span>
                </div>

                <button className="w-full px-2 py-2 rounded-lg bg-black border text-white font-medium transition-all duration-200 hover:bg-opacity-90 hover:transform hover:scale-[1.02] active:scale-[0.98]">
                    Logout
                </button>
            </div>
        </aside>
    );
}
