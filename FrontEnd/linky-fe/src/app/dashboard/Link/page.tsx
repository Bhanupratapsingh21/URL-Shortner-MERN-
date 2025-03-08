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

const Page: React.FC = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const shortId = searchParams.get('shortId');
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const [redirect, setRedirect] = useState<Redirect[] | []>([]);
    const [topDevices, settopDevices] = React.useState<Array<{ device: string; count: number; percentage: number; icon: React.ReactNode }>>([]);
    const [totalVisits, setTotalVisits] = useState<number>(0);
    const [peakVisitTime, setPeakVisitTime] = useState<string>("Loading...");

    const fetchredirects = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/dashboard/getLinkStats/${shortId}`);
            if (response.data.data) {
                setRedirect(response.data.data.link.redirects);
                settopDevices(transformDeviceData(response.data.data.topDevices));
                setTotalVisits(response.data.data.totalVisits);
                setPeakVisitTime(response.data.data.peakVisitTime.time);
            } else {
                toast({
                    title: 'Error While Fetching Redirects',
                })
                throw new Error('No data found');
            }
        } catch (error) {
            console.error(error);
            toast({
                title: 'Error While Fetching Redirects',
            })
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchredirects();
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
            <section className="px-6">
                <ActiveRedirects redirects={redirect} loading={loading} />
            </section>
        </div>
    );
};

export default Page;