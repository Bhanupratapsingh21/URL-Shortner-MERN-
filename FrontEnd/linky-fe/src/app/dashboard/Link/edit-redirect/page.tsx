"use client";
// export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import ActiveRedirects from '@/components/RedirectCards';
import axiosInstance from '@/lib/axiosInstance';
import Redirect from '@/types/redirect.type';
import Link from 'next/link';

const EditRedirectPage: React.FC = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const shortId = searchParams.get('shortId');
    const redirectId = searchParams.get('redirectId');
    const [redirectloading, setRedirectLoading] = useState(false);
    const { toast } = useToast();
    const [redirects, setRedirects] = useState<Redirect[] | []>([]);
    const [linkData, setLinkData] = useState<any>(null);
    const [formData, setFormData] = useState({
        url: '',
        startTime: '09:00',
        endTime: '18:00'
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axiosInstance.patch(`/url/editRedirect`, {
                redirectId,
                originalUrl: formData.url,
                startTime: formData.startTime,
                endTime: formData.endTime
            }, { withCredentials: true });

            toast({
                title: 'Redirect updated successfully',
                description: 'The redirect has been updated successfully.',
            });
            fetchRedirects();
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                toast({
                    title: 'Error updating redirect',
                    description: error.response?.data?.message || 'An error occurred while updating redirect',
                    variant: 'destructive'
                });
            }
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const fetchRedirects = async () => {
        setRedirectLoading(true);
        try {
            const { data } = await axiosInstance.get(`/dashboard/getLinkRedirects/${shortId}`);

            if (data.statusCode === 404 || !data.data) {
                toast({ title: 'No Redirects Found', variant: 'destructive' });
                return;
            }

            setRedirects(data.data.redirects);

            if (redirectId) {
                const redirectToEdit = data.data.redirects.find((r: Redirect) => r.id === redirectId);
                if (redirectToEdit) {
                    setFormData({
                        url: redirectToEdit.url,
                        startTime: redirectToEdit.startTime,
                        endTime: redirectToEdit.endTime
                    });
                }
            }
        } catch (error: any) {
            toast({
                title: error.response?.status === 404 ? 'No Redirects Found' : 'Error While Fetching Redirects',
                description: error.message || 'Please try again later',
                variant: 'destructive'
            });
        } finally {
            setRedirectLoading(false);
        }
    };

    const fetchLink = async () => {
        try {
            const { data } = await axiosInstance.get(`/url/getLink?id=${id}&shortId=${shortId}`);
            setLinkData(data.data.link);
        } catch (error: any) {
            toast({
                title: 'Error fetching link data',
                description: error.message || 'Failed to load link information',
                variant: 'destructive'
            });
        }
    };

    useEffect(() => {
        fetchLink();
        fetchRedirects();
    }, [id, shortId, redirectId]);

    return (
        <div className="px-4 md:px-6 py-6 bg-[#09090B] min-h-screen w-full">
            <div className=" mx-auto">
                <Card className="bg-black text-white border-gray-200">
                    <CardHeader>
                        <CardTitle>
                            {redirectId ? 'Edit Redirect' : 'Create New Redirect'}
                        </CardTitle>
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

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-white mb-1">URL</label>
                                <input
                                    type="url"
                                    name="url"
                                    value={formData.url}
                                    onChange={handleInputChange}
                                    placeholder="Enter destination URL"
                                    className="w-full px-4 bg-[#09090B] py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-white mb-1">Start Time</label>
                                    <input
                                        type="time"
                                        name="startTime"
                                        value={formData.startTime}
                                        onChange={handleInputChange}
                                        className="w-full px-4 bg-[#09090B] py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-white mb-1">End Time</label>
                                    <input
                                        type="time"
                                        name="endTime"
                                        value={formData.endTime}
                                        onChange={handleInputChange}
                                        className="w-full px-4 bg-[#09090B] py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full px-6 bg-[#9333EA] py-3 hover:bg-accent-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
                            >
                                {loading ? (redirectId ? 'Updating...' : 'Creating...') : (redirectId ? 'Update Redirect' : 'Create Redirect')}
                            </button>
                        </form>
                    </CardContent>
                </Card>

                <div className="mt-4 flex flex-col sm:flex-row gap-4">
                    <Link
                        href={`/dashboard/Link?id=${id}&shortId=${shortId}`}
                        className="text-white text-md text-center bg-[#9333EA] rounded-lg px-4 py-2"
                    >
                        Show Redirect Data
                    </Link>
                    {redirectId && (
                        <Link
                            href={`/dashboard/Create-link/create-redirect-?id=${id}&shortId=${shortId}`}
                            className="text-white text-md text-center bg-[#9333EA] rounded-lg px-4 py-2"
                        >
                            Create New Redirect
                        </Link>
                    )}
                </div>
            </div>

            <div className=" mx-auto mt-6">
                <ActiveRedirects
                    shortId={shortId}
                    Id={id}
                    redirects={redirects}
                    loading={redirectloading}
                />
            </div>
        </div>
    );
};

export default EditRedirectPage;
