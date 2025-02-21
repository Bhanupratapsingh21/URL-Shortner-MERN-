"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/authSlice";
import { useToast } from "@/hooks/use-toast";
import axiosInstance from "@/lib/axiosInstance";
import { MultiStepLoader as Loader } from "@/components/ui/multi-step-loader";

interface UserRequest {
    id: string;
    username: string;
    email: string;
    accessToken: string;
    refreshToken: string;
}

const loadingStates = [
    { text: "Validating Session" },
    { text: "Checking User" },
    { text: "Loading Data" },
    { text: "Welcome to Linky" },
];

const MIN_LOADING_TIME = 4000; // 4 seconds

export default function AppWrapper({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch();
    const router = useRouter();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
            router.push("/");
            return;
        }

        const fetchUser = async () => {
            const startTime = Date.now();
            try {
                setLoading(true);
                const { data } = await axiosInstance.post<{ data: UserRequest }>("/user/refreshAccessToken", { refreshToken });

                if (data) {
                    dispatch(setUser({ ...data.data, status: true }));
                    localStorage.setItem("refreshToken", data.data.refreshToken);
                    toast({ title: "Welcome Back!", description: "Redirecting to dashboard" });
                    router.push("/dashboard");
                }
            } catch (error) {
                toast({ title: "Session Expired", description: "Please login again", variant: "destructive" });
                localStorage.removeItem("refreshToken");
                router.push("/auth/signin");
            } finally {
                const elapsedTime = Date.now() - startTime;
                const remainingTime = MIN_LOADING_TIME - elapsedTime;
                setTimeout(() => setLoading(false), remainingTime > 0 ? remainingTime : 0);

            }
        };

        fetchUser();
    }, [router, dispatch]);

    return loading ? (
        <div className="flex items-center justify-center h-screen">
            <Loader loadingStates={loadingStates} duration={1000} loop={false} loading={loading} />
        </div>
    ) : (
        children
    );
}
