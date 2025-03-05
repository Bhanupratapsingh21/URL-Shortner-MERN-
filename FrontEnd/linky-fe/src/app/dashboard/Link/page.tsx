"use client";
import React, { useState, useEffect } from 'react';
import { redirect, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import ActiveRedirects from '@/components/RedirectCards';
import axiosInstance from '@/lib/axiosInstance';
import Redirect from '@/types/redirect.type';

const Page: React.FC = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const shortId = searchParams.get('shortId');
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const [redirect, setRedirect] = useState<Redirect[] | []>([]);

    const fetchredirects = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/dashboard/getLinkStats/${shortId}`);
            if (response.data.data) {
                setRedirect(response.data.data.redirects);
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
            <Card className="bg-black text-white border-gray-200">
                <CardHeader>
                    <CardTitle>Create Redirect</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-white mb-1">Short ID</label>
                        <input
                            type="text"
                            value={shortId || ''}
                            className="w-full px-4 bg-[#09090B] py-3 border border-gray-300 rounded-lg text-slate-400"
                            disabled
                        />
                    </div>
                </CardContent>
            </Card>


        </div>
    );
};

export default Page;