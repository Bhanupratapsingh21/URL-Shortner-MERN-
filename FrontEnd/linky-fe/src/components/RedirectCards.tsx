import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Redirect from '@/types/redirect.type';

interface ActiveRedirectsProps {
    loading: boolean;
    redirects: Redirect[] | [];
}

const ActiveRedirects: React.FC<ActiveRedirectsProps> = ({ redirects, loading }) => {

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