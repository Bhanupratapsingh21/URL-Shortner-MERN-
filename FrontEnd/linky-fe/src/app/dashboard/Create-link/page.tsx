"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
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

    const [shortId, setShortId] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post<CreateRedirectResponse>(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/url/createUrl`,
                shortId ? { shortIdfromuser : shortId } : {},
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
        <div className="flex justify-center items-center px-48 h-full">
            <div className="w-full mx-auto p-6">
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
//localhost:3000/dashboard/Create-link/create-redirect?id=9856790f-9dd5-41ee-9e44-2b98c5c38fa7&shortId=6ii8e