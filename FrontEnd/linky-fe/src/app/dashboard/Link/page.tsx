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
    const [redirect, setRedirect] = useState<Redirect[] | []>([]);
    const [topDevices, settopDevices] = React.useState<Array<{ device: string; count: number; percentage: number; icon: React.ReactNode }>>([]);
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
            console.error('Delete failed:', error);
            toast({
                title: 'Error deleting Link',
                description: error.response?.data?.message || 'Failed to delete redirect',
                variant: 'destructive'
            });
        } finally {

        }
    }
    const fetchRedirects = async () => {
        setLoading(true);

        try {
            const { data } = await axiosInstance.get(`/dashboard/getLinkStats/${shortId}`);

            // Handle 404 or missing data
            if (data.statusCode === 404 || !data.data) {
                toast({
                    title: 'No Redirects Found',
                });
                router.push(`/dashboard/Create-link/create-redirect?id=${id}&shortId=${shortId}`);
                return;
            }

            // Extract and transform data
            const { link, topDevices, totalVisits, peakVisitTime } = data.data;

            setRedirect(link.redirects);
            settopDevices(transformDeviceData(topDevices));
            setTotalVisits(totalVisits);
            setPeakVisitTime(peakVisitTime.time);

        } catch (error: any) {
            console.error('Failed to fetch redirects:', error);

            // More specific error messages based on error type
            const toastTitle = error.response?.status === 404
                ? 'No Redirects Found'
                : 'Error While Fetching Redirects';

            // Handle 404 or missing data
            if (error.response?.status === 404 || !error.response?.data) {
                toast({
                    title: 'No Redirects Found',
                });
                router.push(`/dashboard/Create-link/create-redirect?id=${id}&shortId=${shortId}`);
                return;
            }

            toast({
                title: toastTitle,
                description: error.message || 'Please try again later',
            });

            // Re-throw error if you need to handle it further up the chain
            throw error;

        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchRedirects();
    }, []);

    return (
        <div className="p-6 bg-[#09090B] w-full h-full mx-auto">
            <section className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-6 p-6">
                <div className="bg-black rounded-xl border border-gray-200 p-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-600">Total Visits</p>
                            <h3 className="text-2xl font-bold mt-2">{totalVisits}</h3>
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
                                {totalVisits}
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
                                {peakVisitTime}
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
                            <p className="text-sm text-gray-600">Total Redirects</p>
                            <h3 className="text-2xl font-bold mt-2">{redirect.length}</h3>
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
            <section className='mt-6 px-6'>
                <Link href={`/dashboard/Create-link/create-redirect?id=${id}&shortId=${shortId}`} className="text-blue-500 hover:underline mt-2 block">
                    Create New Redirect
                </Link>
                <button onClick={handleLinkdelete} className="text-blue-500 hover:underline mt-2 block">
                    Delete This Link
                </button>
            </section>
            <section className="px-6">
                <ActiveRedirects shortId={shortId} Id={id} redirects={redirect} loading={loading} />
            </section>
        </div>
    );
};

export default Page;