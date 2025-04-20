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
import { useDispatch, useSelector } from "react-redux";
import userType from "@/types/user.type";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { clearUser } from "@/store/authSlice";
import axiosInstance from "@/lib/axiosInstance";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export function Sidebar() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [showProfileModal, setShowProfileModal] = React.useState(false);
    const dispatch = useDispatch();
    const pathname = usePathname();
    const user = useSelector((state: { user: userType }) => state.user);

    const links = [
        {
            title: "Home",
            icon: <IconHome className="h-6 w-6" />,
            href: "/",
        },
        {
            title: "Dashboard",
            icon: <IconLayoutDashboard className="h-6 w-6" />,
            href: "/dashboard",
        },
        {
            title: "Create Link",
            icon: <IconPlaylistAdd className="h-6 w-6" />,
            href: "/dashboard/Create-link",
        },
        {
            title: "All Links",
            icon: <IconTimeline className="h-6 w-6" />,
            href: "/dashboard/All-links",
        },
        {
            title: "Active Links",
            icon: <IconHandClick className="h-6 w-6" />,
            href: "/dashboard/Active-Links",
        },
    ];

    const { toast } = useToast();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const response = await axiosInstance.get("/user/logout");
            if (response.data.statusCode === 200) {
                toast({ title: "Logout Successfully" });
                router.push("/");
                dispatch(clearUser());
            }
        } catch (error) {
            toast({
                title: "Logout Failed",
                description: axios.isAxiosError(error)
                    ? error.response?.data.message
                    : "Please try again",
                variant: "destructive"
            });
        }
    };

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex flex-col justify-between h-screen w-full border-r rounded-lg md:w-80 bg-[#09090B] shadow-xl">
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
                                            <div className="absolute left-0 w-1 h-full bg-[#c890f9] rounded-r-full" />
                                        )}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                {/* Bottom Buttons */}
                <div className="p-3 space-y-2 border-t border-gray-900 mt-auto">
                    <div className="flex items-center gap-3 px-3 py-3 rounded-lg bg-black text-white">
                        <div className="h-6 w-6 bg-blue-800 rounded-full flex items-center justify-center">
                            <h2 className="text-[10px]">{user.username.slice(0, 2)}</h2>
                        </div>
                        <span className="font-medium">{user.username}</span>
                    </div>

                    <button
                        onClick={() => setIsOpen(true)}
                        className="w-full px-2 py-2 rounded-lg bg-black border text-white font-medium hover:bg-opacity-90"
                    >
                        Logout
                    </button>
                </div>
            </aside>

            {/* Mobile Bottom Navigation */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#09090B] border-t border-gray-800 z-50">
                <div className="flex justify-around items-center p-2">
                    {links.slice(0, 4).map((link) => (
                        <Link
                            key={link.title}
                            href={link.href}
                            className={`flex flex-col items-center p-2 rounded-lg transition-all ${pathname === link.href
                                ? "text-[#c890f9]"
                                : "text-gray-400"
                                }`}
                            title={link.title}
                        >
                            {link.icon}
                            <span className="text-xs mt-1">{link.title.split(' ')[0]}</span>
                        </Link>
                    ))}
                    <button
                        onClick={() => setShowProfileModal(true)}
                        className="flex flex-col items-center p-2 rounded-lg text-gray-400"
                        title="Profile"
                    >
                        <div className="h-6 w-6 bg-blue-800 rounded-full flex items-center justify-center">
                            <span className="text-[10px] text-white">{user.username.slice(0, 2)}</span>
                        </div>
                        <span className="text-xs mt-1">Profile</span>
                    </button>
                </div>
            </div>

            {/* Logout Confirmation Dialog */}
            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to logout? You'll need to sign in again to access your account.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleLogout}>Logout</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Mobile Profile Modal */}
            {showProfileModal && (
                <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
                    <div className="w-full bg-[#09090B] rounded-t-lg p-4">
                        <div className="flex items-center gap-3 p-3 border-b border-gray-800">
                            <div className="h-10 w-10 bg-blue-800 rounded-full flex items-center justify-center">
                                <span className="text-sm">{user.username.slice(0, 2)}</span>
                            </div>
                            <div>
                                <h3 className="font-medium text-white">{user.username}</h3>
                                <p className="text-xs text-gray-400">{user.email}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                setShowProfileModal(false);
                                setIsOpen(true);
                            }}
                            className="w-full py-3 text-red-500 text-left px-3 hover:bg-[#1E293B] rounded-lg"
                        >
                            Logout
                        </button>
                        <button
                            onClick={() => setShowProfileModal(false)}
                            className="w-full py-3 text-white text-left px-3 hover:bg-[#1E293B] rounded-lg mt-2"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}