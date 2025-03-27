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
import Link from "next/link";
import LinksCards from "@/components/linksCard";

interface ExtendedLink extends link {
    totalVisits: number;
    activeRedirectsCount: number;
    createdAt: string;
}

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
    const [Links, setLinks] = React.useState<Array<ExtendedLink>>([]);
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
                        <div className="py-8 px-6 rounded-2xl font-bold font-sans w-max text-5xl">
                            <h2>All Links</h2>
                        </div>
                        <div className="w-full h-full px-16">
                            {
                                <LinksCards links={Links} />
                            }
                        </div>
                    </div>
            }
        </>
    );
}
