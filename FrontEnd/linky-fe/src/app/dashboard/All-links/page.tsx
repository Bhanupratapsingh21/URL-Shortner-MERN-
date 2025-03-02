'use client';
import * as React from "react"
import {
    IconLink,
    IconDeviceMobile,
    IconDeviceDesktop,
    IconDeviceTablet,
    IconLoadBalancer,
    IconClock,
    IconHandFinger,
} from "@tabler/icons-react";
import formatClickCount from "@/utils/formatcount";
import { useSelector } from "react-redux";
import userType from "@/types/user.type";
import axiosInstance from "@/lib/axiosInstance";
import link from "@/types/links.types";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import FormatDevices from "@/utils/formatdevices";

interface AnalyticsData {
    date: string;
    desktop: number;
    mobile: number;
}

interface DeviceStats {
    device: string;
    percentage: number;
    count: number;
    icon: React.ReactNode;
}

interface DashboardProps {
    analyticsData: AnalyticsData[];
    totalClicks: number;
    clicksGrowth: number;
    deviceStats: DeviceStats[];
    title?: string;
    description?: string;
}


export default function Dashboard() {

    const { toast } = useToast();
    const [Links, setLinks] = React.useState<Array<link>>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);
    const [totalLinks, setTotalLinks] = React.useState<number>(0);
    const [topDevices, setTopDevices] = React.useState<Array<{ device: string; count: number; percentage: number; icon: React.ReactNode }>>([]);
    const [peakVisitTime, setPeakVisitTime] = React.useState<{ time: string; count: number }>({ time: "N/A", count: 0 });
    const [totalVisits, setTotalVisits] = React.useState<number>(0);
    const [totalRedirects, settotalRedirects] = React.useState<number>(0);

    const user = useSelector((state: { user: userType }) => state.user);
    const fetchdata = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get("/dashboard/getallLinks");
            if (response.status === 200) {
                setLinks(response.data.data.links);
                setTotalLinks(response.data.data.totalLinks);
                setTopDevices(FormatDevices(response.data.data.topDevices));
                setPeakVisitTime(response.data.data.peakVisitTime);
                setTotalVisits(response.data.data.totalVisits);
                settotalRedirects(response.data.data.totalRedirects);
            } else {
                throw new Error("An error occurred");
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast({
                    title: error.response?.data.message,
                    variant: "destructive"
                });
            }
            console.log(error);
            toast({
                title: "An error occurred",
                description: "Something went wrong. Please try again later.",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };


    React.useEffect(() => {
        fetchdata()
    }, []);

    return (
        <>
            {
                loading ? /* From Uiverse.io by devAaus */
                    <div className="flex-col h-screen w-full gap-4  flex items-center justify-center">
                        <div
                            className="w-20 h-20 border-4 border-transparent text-blue-700 text-4xl animate-spin flex items-center justify-center border-t-blue-700 rounded-full"
                        >
                            <div
                                className="w-16 h-16 border-4 border-transparent text-[#c890f9] text-2xl animate-spin flex items-center justify-center border-t-[#c890f9] rounded-full"
                            ></div>
                        </div>
                    </div>
                    :

                    <div className="bg-[#09090B] h-max w-full text-white">
                        <section className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-6 p-6">
                            <div className="bg-black rounded-xl border border-gray-200 p-6">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-sm text-gray-600">Total  Links</p>
                                        <h3 className="text-2xl font-bold mt-2">{totalLinks}</h3>
                                    </div>
                                    <div className="w-8 h-8  rounded-full flex items-center justify-center">
                                        <IconLink className="h-full text-green-400 w-full" />
                                    </div>
                                </div>
                            </div>
                            <div className="bg-black rounded-xl border border-gray-200 p-6">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-sm text-gray-600">Total Clicks</p>
                                        <h3 className="text-2xl font-bold mt-2">
                                            {formatClickCount(totalVisits)}
                                        </h3>
                                    </div>
                                    <div className="w-8 h-8  rounded-full flex items-center justify-center">
                                        <IconHandFinger className="h-full text-green-400 w-full" />
                                    </div>
                                </div>
                            </div>
                            <div className="bg-black rounded-xl border border-gray-200 p-6">
                                <h4 className="text-base text-gray-600 font-semibold mb-4">
                                    Peak Visit Time
                                </h4>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-2xl font-bold">
                                            {peakVisitTime.time}
                                        </h3>
                                        <p className="text-gray-500">Total Visits</p>
                                    </div>
                                    <div className="w-8 h-8  rounded-full flex items-center justify-center">
                                        <IconClock className="h-full text-white w-full" />
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6  px-6">
                            <div className="bg-black rounded-xl border border-gray-200 p-6">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-sm text-gray-600">Total Active Redirects</p>
                                        <h3 className="text-2xl font-bold mt-2">{totalRedirects}</h3>
                                    </div>
                                    <div className="w-8 h-8  rounded-full flex items-center justify-center">
                                        <IconLink className="h-full text-[#c890f9] w-full" />
                                    </div>
                                </div>
                            </div>


                            <div className="bg-black rounded-xl border border-gray-200 p-6">
                                <div className="w-full h-max mb-4 flex items-center justify-between">
                                    <h4 className="text-base text-gray-600 font-semibold mb-4">Device Distribution</h4>
                                    <IconLoadBalancer className="h-8 text-green-400 w-8" />
                                </div>

                                <div className="space-y-4">
                                    {topDevices?.map((stat) => (
                                        <div
                                            key={stat.device}
                                            className="flex items-center justify-between"
                                        >
                                            <div className="flex items-center">
                                                {stat.icon}
                                                <span className="ml-3  text-gray-600">{stat.device}</span>
                                            </div>
                                            <div className="flex text-gray-600 items-center">
                                                <span className="font-medium">{stat.percentage}%</span>
                                                <span className="ml-2 text-sm text-gray-500">
                                                    ({formatClickCount(stat.count)})
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6  px-6">
                            {
                                Links?.map((link) => (
                                    <div className="group relative flex w-80 flex-col rounded-xl bg-slate-950 p-4 shadow-2xl transition-all duration-300 hover:scale-[1.02] ">
                                        <div className="relative">
                                            <div className="mb-4 flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <div
                                                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500"
                                                    >
                                                        <svg
                                                            className="h-4 w-4 text-white"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                stroke-width="2"
                                                                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                                            ></path>
                                                        </svg>
                                                    </div>
                                                    <h3 className="text-sm font-semibold text-white">Performance Analytics</h3>
                                                </div>

                                                <span
                                                    className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-500"
                                                >
                                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                                                    Live
                                                </span>
                                            </div>

                                            <div className="mb-4 grid grid-cols-2 gap-4">
                                                <div className="rounded-lg bg-slate-900/50 p-3">
                                                    <p className="text-xs font-medium text-slate-400">Total Views</p>
                                                    <p className="text-lg font-semibold text-white">24.5K</p>
                                                    <span className="text-xs font-medium text-emerald-500">+12.3%</span>
                                                </div>

                                                <div className="rounded-lg bg-slate-900/50 p-3">
                                                    <p className="text-xs font-medium text-slate-400">Conversions</p>
                                                    <p className="text-lg font-semibold text-white">1.2K</p>
                                                    <span className="text-xs font-medium text-emerald-500">+8.1%</span>
                                                </div>
                                            </div>

                                            <div
                                                className="mb-4 h-24 w-full overflow-hidden rounded-lg bg-slate-900/50 p-3"
                                            >
                                                <div className="flex h-full w-full items-end justify-between gap-1">
                                                    <div className="h-[40%] w-3 rounded-sm bg-indigo-500/30">
                                                        <div
                                                            className="h-[60%] w-full rounded-sm bg-indigo-500 transition-all duration-300"
                                                        ></div>
                                                    </div>
                                                    <div className="h-[60%] w-3 rounded-sm bg-indigo-500/30">
                                                        <div
                                                            className="h-[40%] w-full rounded-sm bg-indigo-500 transition-all duration-300"
                                                        ></div>
                                                    </div>
                                                    <div className="h-[75%] w-3 rounded-sm bg-indigo-500/30">
                                                        <div
                                                            className="h-[80%] w-full rounded-sm bg-indigo-500 transition-all duration-300"
                                                        ></div>
                                                    </div>
                                                    <div className="h-[45%] w-3 rounded-sm bg-indigo-500/30">
                                                        <div
                                                            className="h-[50%] w-full rounded-sm bg-indigo-500 transition-all duration-300"
                                                        ></div>
                                                    </div>
                                                    <div className="h-[85%] w-3 rounded-sm bg-indigo-500/30">
                                                        <div
                                                            className="h-[90%] w-full rounded-sm bg-indigo-500 transition-all duration-300"
                                                        ></div>
                                                    </div>
                                                    <div className="h-[65%] w-3 rounded-sm bg-indigo-500/30">
                                                        <div
                                                            className="h-[70%] w-full rounded-sm bg-indigo-500 transition-all duration-300"
                                                        ></div>
                                                    </div>
                                                    <div className="h-[95%] w-3 rounded-sm bg-indigo-500/30">
                                                        <div
                                                            className="h-[85%] w-full rounded-sm bg-indigo-500 transition-all duration-300"
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs font-medium text-slate-400">Last 7 days</span>
                                                    <svg
                                                        className="h-4 w-4 text-slate-400"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M19 9l-7 7-7-7"
                                                        ></path>
                                                    </svg>
                                                </div>

                                                <button
                                                    className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 px-3 py-1 text-xs font-medium text-white transition-all duration-300 hover:from-indigo-600 hover:to-purple-600"
                                                >
                                                    View Details
                                                    <svg
                                                        className="h-3 w-3"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M9 5l7 7-7 7"
                                                        ></path>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
            }
        </>
    );
}
