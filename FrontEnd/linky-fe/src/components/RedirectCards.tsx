import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Redirect from '@/types/redirect.type';
import Link from 'next/link';

interface ActiveRedirectsProps {
    loading: boolean;
    shortId: string | null;
    Id: string | null;
    redirects: Redirect[] | [];
}

const ActiveRedirects: React.FC<ActiveRedirectsProps> = ({ redirects, shortId, Id, loading }) => {

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
                        <div key={redirect.id} className="p-4 h-max bg-[#09090B] rounded-lg">
                            <p className="text-sm font-medium text-slate-400">URL: {redirect.url}</p>
                            <div className="flex gap-4 mt-2 text-xs text-white">
                                <span>Start: {redirect.startTime}</span>
                                <span>End: {redirect.endTime}</span>
                            </div>
                            <div className="flex gap-4 mt-2 text-xs text-white">
                                <Link href={`/dashboard/Link/edit-redirect?id=${Id}&shortId=${shortId}&redirectId=${redirect.id}`} className=" text-white text-sm border-gray-200 text-center bg-[#9333EA] hover:bg-accent-700 rounded-lg transition-colors px-4 py-2 mt-4">
                                    Edit Redirect
                                </Link>
                            </div>
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