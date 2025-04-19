"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import ActiveRedirects from '@/components/RedirectCards';
import axiosInstance from '@/lib/axiosInstance';
import Redirect from '@/types/redirect.type';
import { IconClock, IconHandFinger, IconLink, IconLoadBalancer } from '@tabler/icons-react';
import formatClickCount from '@/utils/formatcount';
import transformDeviceData from "@/utils/formatdevices";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Page: React.FC = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const shortId = searchParams.get('shortId');
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const router = useRouter();
    const [redirect, setRedirect] = useState<Redirect[]>([]);
    const [topDevices, setTopDevices] = useState<Array<{ device: string; count: number; percentage: number; icon: React.ReactNode }>>([]);
    const [totalVisits, setTotalVisits] = useState<number>(0);
    const [peakVisitTime, setPeakVisitTime] = useState<string>("Loading...");

    const handleLinkdelete = async () => {
        try {
            await axiosInstance.delete(`/url/deletelink?shortId=${shortId}`, { withCredentials: true });

            toast({
                title: 'Redirect deleted successfully',
                description: 'The redirect has been deleted successfully.',
            });
            router.push(`/dashboard`);
        } catch (error: any) {
            toast({
                title: 'Error deleting link',
                description: error.response?.data?.message || 'Failed to delete redirect',
                variant: 'destructive'
            });
        }
    };

    const fetchRedirects = async () => {
        setLoading(true);
        try {
            const { data } = await axiosInstance.get(`/dashboard/getLinkStats/${shortId}`);

            if (data.statusCode === 404 || !data.data) {
                toast({ title: 'No Redirects Found' });
                router.push(`/dashboard/Create-link/create-redirect?id=${id}&shortId=${shortId}`);
                return;
            }

            const { link, topDevices, totalVisits, peakVisitTime } = data.data;

            setRedirect(link.redirects);
            setTopDevices(transformDeviceData(topDevices));
            setTotalVisits(totalVisits);
            setPeakVisitTime(peakVisitTime.time);

        } catch (error: any) {
            const toastTitle = error.response?.status === 404
                ? 'No Redirects Found'
                : 'Error While Fetching Redirects';

            toast({
                title: toastTitle,
                description: error.message || 'Please try again later',
            });

            if (error.response?.status === 404 || !error.response?.data) {
                router.push(`/dashboard/Create-link/create-redirect?id=${id}&shortId=${shortId}`);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRedirects();
    }, []);

    return (
        <div className="px-4 sm:px-6 lg:px-12 py-8 bg-[#09090B] min-h-screen w-full space-y-10">
            {/* Stats Section */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    {
                        label: "Total Visits",
                        value: totalVisits,
                        icon: <IconLink className="h-full w-full text-green-400" />
                    },
                    {
                        label: "Total Clicks",
                        value: totalVisits,
                        icon: <IconHandFinger className="h-full w-full text-green-400" />
                    },
                    {
                        label: "Peak Visit Time",
                        value: peakVisitTime,
                        icon: <IconClock className="h-full w-full text-white" />,
                        subLabel: "Total Visits"
                    }
                ].map((stat, idx) => (
                    <div key={idx} className="bg-black rounded-xl border border-gray-800 p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-400">{stat.label}</p>
                                <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
                                {stat.subLabel && (
                                    <p className="text-sm text-gray-500">{stat.subLabel}</p>
                                )}
                            </div>
                            <div className="w-8 h-8 rounded-full flex items-center justify-center">
                                {stat.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </section>

            {/* Redirect Count & Device Distribution */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-black rounded-xl border border-gray-800 p-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-400">Total Redirects</p>
                            <h3 className="text-2xl font-bold mt-2">{redirect.length}</h3>
                        </div>
                        <div className="w-8 h-8 rounded-full flex items-center justify-center">
                            <IconLink className="h-full w-full text-[#c890f9]" />
                        </div>
                    </div>
                </div>

                <div className="bg-black rounded-xl border border-gray-800 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="text-base text-gray-400 font-semibold">Device Distribution</h4>
                        <IconLoadBalancer className="w-8 h-8 text-green-400" />
                    </div>
                    <div className="space-y-4">
                        {topDevices.map((stat) => (
                            <div key={stat.device} className="flex items-center justify-between">
                                <div className="flex items-center">
                                    {stat.icon}
                                    <span className="ml-3 text-gray-300">{stat.device}</span>
                                </div>
                                <div className="flex items-center text-gray-400">
                                    <span className="font-medium">{stat.percentage}%</span>
                                    <span className="ml-2 text-sm text-gray-500">({formatClickCount(stat.count)})</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Actions */}
            <section className="flex flex-col sm:flex-row items-center justify-between w-full gap-4 px-1">
                <Link className="text-white text-center bg-[#9333EA] hover:bg-[#7e2bcb] px-5 w-1/2 py-2 rounded-lg transition-all" href={`/dashboard/Create-link/create-redirect?id=${id}&shortId=${shortId}`}>

                    Create New Redirect

                </Link>
                <button
                    onClick={handleLinkdelete}
                    className="text-white bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg w-1/2 transition-all"
                >
                    Delete This Link
                </button>
            </section>

            {/* Redirect List */}
            <section>
                <ActiveRedirects shortId={shortId} Id={id} redirects={redirect} loading={loading} />
            </section>
        </div>
    );
};

export default Page;
