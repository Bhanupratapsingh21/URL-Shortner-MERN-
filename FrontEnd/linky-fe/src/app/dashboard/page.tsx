"use client";
//export const dynamic = 'force-dynamic';

import * as React from "react";
import Chart from "@/components/ClickChart";
import {
    IconLink,
    IconDeviceMobile,
    IconDeviceDesktop,
    IconDeviceTablet,
    IconLoadBalancer,
    IconClock,
    IconHandFinger,
} from "@tabler/icons-react";
import { useSelector } from "react-redux";
import userType from "@/types/user.type";
import axiosInstance from "@/lib/axiosInstance";
import link from "@/types/links.types";
import formatClickCount from "@/utils/formatcount";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
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
    tablet?: number;
}

interface DeviceStats {
    device: string;
    percentage: number;
    count: number;
    icon: React.ReactNode;
}

interface ChartData {
    analyticsData: AnalyticsData[];
    totalClicks: number;
    clicksGrowth: number;
    deviceStats: DeviceStats[];
    title?: string;
    description?: string;
}

export default function Dashboard() {
    const { toast } = useToast();
    const [links, setLinks] = React.useState<ExtendedLink[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [stats, setStats] = React.useState({
        totalLinks: 0,
        totalVisits: 0,
        totalRedirects: 0,
        peakVisitTime: { time: "N/A", count: 0 },
        topDevices: [] as Array<{ device: string; count: number; percentage: number; icon: React.ReactNode }>
    });
    const [chartData, setChartData] = React.useState<ChartData | null>(null);

    const user = useSelector((state: { user: userType }) => state.user);

    const getDeviceIcon = (device: string) => {
        switch (device.toLowerCase()) {
            case 'mobile': return <IconDeviceMobile className="h-5 w-5 sm:h-6 sm:w-6" />;
            case 'desktop': return <IconDeviceDesktop className="h-5 w-5 sm:h-6 sm:w-6" />;
            case 'tablet': return <IconDeviceTablet className="h-5 w-5 sm:h-6 sm:w-6" />;
            default: return <IconDeviceDesktop className="h-5 w-5 sm:h-6 sm:w-6" />;
        }
    };

    const formatDevices = (devices: Array<{ device: string; count: number }>) => {
        const total = devices.reduce((sum, d) => sum + d.count, 0);
        return devices.map(d => ({
            ...d,
            percentage: total > 0 ? Math.round((d.count / total) * 100) : 0,
            icon: getDeviceIcon(d.device)
        }));
    };

    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            const [linksRes, chartRes] = await Promise.all([
                axiosInstance.get("/dashboard/getallLinks"),
                axiosInstance.get("/dashboard/chart-main-data")
            ]);

            if (linksRes.status === 200) {
                const { links, totalLinks, totalVisits, totalRedirects, peakVisitTime, topDevices } = linksRes.data.data;
                setLinks(links);
                setStats({
                    totalLinks,
                    totalVisits,
                    totalRedirects,
                    peakVisitTime,
                    topDevices: formatDevices(topDevices)
                });
            }

            if (chartRes.status === 200) {
                setChartData({
                    ...chartRes.data.data,
                    deviceStats: chartRes.data.data.deviceStats.map((stat: any) => ({
                        ...stat,
                        icon: getDeviceIcon(stat.device)
                    }))
                });
            }
        } catch (error) {
            console.error("Dashboard data error:", error);
            toast({
                title: "Error loading data",
                description: axios.isAxiosError(error)
                    ? error.response?.data.message
                    : "Please try again later",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchDashboardData();
    }, []);

    if (loading) {
        return (
            <div className="flex-col h-screen w-full gap-4 flex items-center justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-transparent text-blue-700 text-4xl animate-spin flex items-center justify-center border-t-blue-700 rounded-full">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-transparent text-[#c890f9] text-2xl animate-spin flex items-center justify-center border-t-[#c890f9] rounded-full"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#09090B] min-h-screen w-full text-white pb-20 sm:pb-0">
            {/* Stats Overview Section */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 sm:gap-6 sm:p-6">
                <StatCard
                    title="Total Links"
                    value={stats.totalLinks}
                    icon={<IconLink className="text-green-400 h-5 w-5 sm:h-6 sm:w-6" />}
                />
                <StatCard
                    title="Total Clicks"
                    value={formatClickCount(stats.totalVisits)}
                    icon={<IconHandFinger className="text-green-400 h-5 w-5 sm:h-6 sm:w-6" />}
                />
                <PeakTimeCard
                    peakTime={stats.peakVisitTime.time}
                    count={stats.peakVisitTime.count}
                />
            </section>

            {/* Secondary Stats Section */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-4 sm:gap-6 sm:px-6">
                <StatCard
                    title="Active Redirects"
                    value={stats.totalRedirects}
                    icon={<IconLink className="text-[#c890f9] h-5 w-5 sm:h-6 sm:w-6" />}
                />
                <DeviceDistributionCard devices={stats.topDevices} />
            </section>

            {/* Analytics Chart */}
            {chartData && (
                <div className="p-4 sm:p-6 overflow-x-auto">
                    <div className="min-w-[600px]">
                        <Chart {...chartData} title="All Links Analytics" />
                    </div>
                </div>
            )}

            {/* Links List Section */}
            <div className="py-6 px-4 sm:py-8 sm:px-6">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-sans">All Links</h2>
                <div className="mt-4 sm:mt-6 w-full">
                    <LinksCards links={links} />
                </div>
            </div>
        </div>
    );
}

// Reusable Stat Card Component
const StatCard = ({ title, value, icon }: { title: string; value: string | number; icon: React.ReactNode }) => (
    <div className="bg-black rounded-xl border border-gray-200 p-4 sm:p-6">
        <div className="flex justify-between items-center">
            <div>
                <p className="text-xs sm:text-sm text-gray-600">{title}</p>
                <h3 className="text-xl sm:text-2xl font-bold mt-1 sm:mt-2">{value}</h3>
            </div>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center">
                {icon}
            </div>
        </div>
    </div>
);

// Peak Time Card Component
const PeakTimeCard = ({ peakTime, count }: { peakTime: string; count: number }) => (
    <div className="bg-black rounded-xl border border-gray-200 p-4 sm:p-6">
        <h4 className="text-sm sm:text-base text-gray-600 font-semibold mb-2 sm:mb-4">Peak Visit Time</h4>
        <div className="flex items-center justify-between">
            <div>
                <h3 className="text-xl sm:text-2xl font-bold">{peakTime}</h3>
                <p className="text-xs sm:text-sm text-gray-500">Total Visits: {count}</p>
            </div>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center">
                <IconClock className="text-white h-5 w-5 sm:h-6 sm:w-6" />
            </div>
        </div>
    </div>
);

// Device Distribution Card Component
const DeviceDistributionCard = ({ devices }: { devices: Array<{ device: string; count: number; percentage: number; icon: React.ReactNode }> }) => (
    <div className="bg-black rounded-xl border border-gray-200 p-4 sm:p-6">
        <div className="flex justify-between items-center mb-3 sm:mb-4">
            <h4 className="text-sm sm:text-base text-gray-600 font-semibold">Device Distribution</h4>
            <IconLoadBalancer className="text-green-400 h-6 w-6 sm:h-8 sm:w-8" />
        </div>
        <div className="space-y-3 sm:space-y-4">
            {devices.map((stat) => (
                <div key={stat.device} className="flex items-center justify-between">
                    <div className="flex items-center">
                        {stat.icon}
                        <span className="ml-2 sm:ml-3 text-xs sm:text-sm text-gray-600">{stat.device}</span>
                    </div>
                    <div className="flex text-gray-600 items-center">
                        <span className="text-xs sm:text-sm font-medium">{stat.percentage}%</span>
                        <span className="ml-1 sm:ml-2 text-xs text-gray-500">
                            ({formatClickCount(stat.count)})
                        </span>
                    </div>
                </div>
            ))}
        </div>
    </div>
);