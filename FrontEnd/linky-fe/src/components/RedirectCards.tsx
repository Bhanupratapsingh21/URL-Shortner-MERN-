import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface Redirect {
    id: string;
    url: string;
    startTime: string;
    endTime: string;
    createdAt: string;
}

interface ActiveRedirectsProps {
    shortId: string;
    id: string;
    onUpdate: () => void;
}

// Active Redirects Component
const ActiveRedirects: React.FC<ActiveRedirectsProps> = ({ shortId, id, onUpdate }) => {
    const [redirects, setRedirects] = useState<Redirect[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();
    const fetchRedirects = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/url/redirects`, {
                params: { shortId, id },
                withCredentials: true
            });
            setRedirects(response.data);
        } catch (error) {
            //toast.error('Failed to fetch active redirects');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRedirects();
    }, [shortId, id]);

    if (loading) {
        return <div className="text-center py-4">Loading active redirects...</div>;
    }

    return (
        <Card className="mt-6 bg-black text-white border-gray-200">
            <CardHeader>
                <CardTitle>Active Redirects</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {redirects.map((redirect) => (
                        <div key={redirect.id} className="p-4 bg-[#09090B] rounded-lg">
                            <p className="text-sm font-medium text-slate-400">URL: {redirect.url}</p>
                            <div className="flex gap-4 mt-2 text-xs text-white">
                                <span>Start: {redirect.startTime}</span>
                                <span>End: {redirect.endTime}</span>
                            </div>
                            <p className="text-xs text-slate-500 mt-1">Created: {new Date(redirect.createdAt).toLocaleString()}</p>
                        </div>
                    ))}
                    {redirects.length === 0 && (
                        <p className="text-center text-slate-400">No active redirects found</p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};
export default ActiveRedirects;