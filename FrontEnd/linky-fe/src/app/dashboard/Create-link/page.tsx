"use client";
//export const dynamic = 'force-dynamic';

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface CreateRedirectResponse {
    statusCode: number;
    data: {
        id: string;
        shortId: string;
        createdAt: string;
        createdById: string;
    };
    message: string;
    success: boolean;
}

const CreateRedirectPage = () => {
    const { toast } = useToast();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const ShortIdfromhomepage = searchParams.get("shortId")
    const [shortId, setShortId] = useState(ShortIdfromhomepage || "");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post<CreateRedirectResponse>(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/url/createUrl`,
                shortId ? { shortIdfromuser: shortId } : {},
                {
                    withCredentials: true
                }
            );

            const data = response.data.data;

            toast({
                title: "Success",
                description: "Redirect created successfully!"
            });

            router.push(`${pathname}/create-redirect?id=${data.id}&shortId=${data.shortId}`);
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to create redirect. Please try again."
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center px-4 sm:px-6 md:px-12 lg:px-24 xl:px-48 py-12 min-h-screen">
            <div className="w-full ">
                <Card>
                    <CardHeader>
                        <CardTitle>Create Redirect</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                placeholder="Enter custom name (optional)"
                                value={shortId}
                                onChange={(e) => setShortId(e.target.value)}
                                disabled={isLoading}
                            />
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? "Creating..." : "Create Redirect"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default CreateRedirectPage;