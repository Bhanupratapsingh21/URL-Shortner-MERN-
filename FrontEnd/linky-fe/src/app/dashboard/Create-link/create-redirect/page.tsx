"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import ActiveRedirects from '@/components/RedirectCards';



const CreateRedirectPage: React.FC = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const shortId = searchParams.get('shortId');

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
            await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/url/createRedirect`, {
                id,
                shortId,
                ...formData
            }, {
                withCredentials: true
            });

            // toast.success('Redirect created successfully');
            setFormData({ ...formData, url: '' }); // Reset URL field
            // onUpdate(); // Trigger refresh of active redirects
        } catch (error) {
            //  toast.error('Failed to create redirect');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

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

                        <div className="grid grid-cols-2 gap-4">
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
                            {loading ? 'Creating...' : 'Create Redirect'}
                        </button>
                    </form>
                </CardContent>
            </Card>

            <ActiveRedirects shortId={shortId || ''} id={id || ''} onUpdate={() => { }} />
        </div>
    );
};

export default CreateRedirectPage;