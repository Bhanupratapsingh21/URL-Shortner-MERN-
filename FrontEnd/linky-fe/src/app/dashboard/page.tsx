'use client';
import * as React from "react"
import Chart from "@/components/ClickChart";
import {
    IconLink,
    IconDeviceMobile,
    IconDeviceDesktop,
    IconDeviceTablet,
} from "@tabler/icons-react";
import { useSelector } from "react-redux";
import userType from "@/types/user.type";
import axiosInstance from "@/lib/axiosInstance";
import link from "@/types/links.types";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

const exampleData = {
    analyticsData: [
        { date: "2024-04-01", desktop: 222, mobile: 150 },
        { date: "2024-04-02", desktop: 97, mobile: 180 },
        { date: "2024-04-03", desktop: 167, mobile: 120 },
        { date: "2024-04-04", desktop: 242, mobile: 260 },
        { date: "2024-04-05", desktop: 373, mobile: 290 },
        { date: "2024-04-06", desktop: 301, mobile: 340 },
        { date: "2024-04-07", desktop: 245, mobile: 180 },
        { date: "2024-04-08", desktop: 409, mobile: 320 },
        { date: "2024-04-09", desktop: 59, mobile: 110 },
        { date: "2024-04-10", desktop: 261, mobile: 190 },
        { date: "2024-04-11", desktop: 327, mobile: 350 },
        { date: "2024-04-12", desktop: 292, mobile: 210 },
        { date: "2024-04-13", desktop: 342, mobile: 380 },
        { date: "2024-04-14", desktop: 137, mobile: 220 },
        { date: "2024-04-15", desktop: 120, mobile: 170 },
        { date: "2024-04-16", desktop: 138, mobile: 190 },
        { date: "2024-04-17", desktop: 446, mobile: 360 },
        { date: "2024-04-18", desktop: 364, mobile: 410 },
        { date: "2024-04-19", desktop: 243, mobile: 180 },
        { date: "2024-04-20", desktop: 89, mobile: 150 },
        { date: "2024-04-21", desktop: 137, mobile: 200 },
        { date: "2024-04-22", desktop: 224, mobile: 170 },
        { date: "2024-04-23", desktop: 138, mobile: 230 },
        { date: "2024-04-24", desktop: 387, mobile: 290 },
        { date: "2024-04-25", desktop: 215, mobile: 250 },
        { date: "2024-04-26", desktop: 75, mobile: 130 },
        { date: "2024-04-27", desktop: 383, mobile: 420 },
        { date: "2024-04-28", desktop: 122, mobile: 180 },
        { date: "2024-04-29", desktop: 315, mobile: 240 },
        { date: "2024-04-30", desktop: 454, mobile: 380 },
        { date: "2024-05-01", desktop: 165, mobile: 220 },
        { date: "2024-05-02", desktop: 293, mobile: 310 },
        { date: "2024-05-03", desktop: 247, mobile: 190 },
        { date: "2024-05-04", desktop: 385, mobile: 420 },
        { date: "2024-05-05", desktop: 481, mobile: 390 },
        { date: "2024-05-06", desktop: 498, mobile: 520 },
        { date: "2024-05-07", desktop: 388, mobile: 300 },
        { date: "2024-05-08", desktop: 149, mobile: 210 },
        { date: "2024-05-09", desktop: 227, mobile: 180 },
        { date: "2024-05-10", desktop: 293, mobile: 330 },
        { date: "2024-05-11", desktop: 335, mobile: 270 },
        { date: "2024-05-12", desktop: 197, mobile: 240 },
        { date: "2024-05-13", desktop: 197, mobile: 160 },
        { date: "2024-05-14", desktop: 448, mobile: 490 },
        { date: "2024-05-15", desktop: 473, mobile: 380 },
        { date: "2024-05-16", desktop: 338, mobile: 400 },
        { date: "2024-05-17", desktop: 499, mobile: 420 },
        { date: "2024-05-18", desktop: 315, mobile: 350 },
        { date: "2024-05-19", desktop: 235, mobile: 180 },
        { date: "2024-05-20", desktop: 177, mobile: 230 },
        { date: "2024-05-21", desktop: 82, mobile: 140 },
        { date: "2024-05-22", desktop: 81, mobile: 120 },
        { date: "2024-05-23", desktop: 252, mobile: 290 },
        { date: "2024-05-24", desktop: 294, mobile: 220 },
        { date: "2024-05-25", desktop: 201, mobile: 250 },
        { date: "2024-05-26", desktop: 213, mobile: 170 },
        { date: "2024-05-27", desktop: 420, mobile: 460 },
        { date: "2024-05-28", desktop: 233, mobile: 190 },
        { date: "2024-05-29", desktop: 78, mobile: 130 },
        { date: "2024-05-30", desktop: 340, mobile: 280 },
        { date: "2024-05-31", desktop: 178, mobile: 230 },
        { date: "2024-06-01", desktop: 178, mobile: 200 },
        { date: "2024-06-02", desktop: 470, mobile: 410 },
        { date: "2024-06-03", desktop: 103, mobile: 160 },
        { date: "2024-06-04", desktop: 439, mobile: 380 },
        { date: "2024-06-05", desktop: 88, mobile: 140 },
        { date: "2024-06-06", desktop: 294, mobile: 250 },
        { date: "2024-06-07", desktop: 323, mobile: 370 },
        { date: "2024-06-08", desktop: 385, mobile: 320 },
        { date: "2024-06-09", desktop: 438, mobile: 480 },
        { date: "2024-06-10", desktop: 155, mobile: 200 },
        { date: "2024-06-11", desktop: 92, mobile: 150 },
        { date: "2024-06-12", desktop: 492, mobile: 420 },
        { date: "2024-06-13", desktop: 81, mobile: 130 },
        { date: "2024-06-14", desktop: 426, mobile: 380 },
        { date: "2024-06-15", desktop: 307, mobile: 350 },
        { date: "2024-06-16", desktop: 371, mobile: 310 },
        { date: "2024-06-17", desktop: 475, mobile: 520 },
        { date: "2024-06-18", desktop: 107, mobile: 170 },
        { date: "2024-06-19", desktop: 341, mobile: 290 },
        { date: "2024-06-20", desktop: 408, mobile: 450 },
        { date: "2024-06-21", desktop: 169, mobile: 210 },
        { date: "2024-06-22", desktop: 317, mobile: 270 },
        { date: "2024-06-23", desktop: 480, mobile: 530 },
        { date: "2024-06-24", desktop: 132, mobile: 180 },
        { date: "2024-06-25", desktop: 141, mobile: 190 },
        { date: "2024-06-26", desktop: 434, mobile: 380 },
        { date: "2024-06-27", desktop: 448, mobile: 490 },
        { date: "2024-06-28", desktop: 149, mobile: 200 },
        { date: "2024-06-29", desktop: 103, mobile: 160 },
        { date: "2024-06-30", desktop: 446, mobile: 400 },
    ],
    totalClicks: 24500,
    clicksGrowth: 8,
    deviceStats: [
        {
            device: "Mobile",
            percentage: 60,
            count: 3000,
            icon: <IconDeviceMobile className="h-6 w-6" />,
        },
        {
            device: "Desktop",
            percentage: 35,
            count: 1700,
            icon: <IconDeviceDesktop className="h-6 w-6" />,
        },
        {
            device: "Tablet",
            percentage: 5,
            count: 250,
            icon: <IconDeviceTablet className="h-6 w-6" />,
        }
    ],
    title: "Custom Analytics Title", // optional
    description: "Custom description" // optional
};


export default function Dashboard() {
    const { toast } = useToast();



    const [Links, setLinks] = React.useState<Array<link>>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);
    const [totalLinks, setTotalLinks] = React.useState<number>(0);
    const [totalActiveLinks, setTotalActiveLinks] = React.useState<number>(0);

    const user = useSelector((state: { user: userType }) => state.user);
    const fetchdata = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get("/user/dashboard");
            if (response.data.status) {
                setLinks(response.data.links);
                setTotalLinks(response.data.data.totalLinks);
                setTotalActiveLinks(response.data.data.totalActiveLinks);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast({
                    title: error.response?.data.message,
                    variant: "destructive"
                });
            }
            console.log(error);
            toast({
                title: "An error occurred",
                description: "Something went wrong. Please try again later.",
                variant: "destructive"
            });
        }
    };

    return (
        <>
            <div className="bg-[#09090B] h-max w-full text-white">
                <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 p-6">
                    <div className="bg-black rounded-xl border border-gray-200 p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-600">Total Live Links</p>
                                <h3 className="text-2xl font-bold mt-2">15</h3>
                            </div>
                            <div className="w-8 h-8  rounded-full flex items-center justify-center">
                                <IconLink className="h-full text-green-400 w-full" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center">
                            <span className="text-sm text-gray-500">Total Active Links</span>
                        </div>
                    </div>


                    <div className="bg-black rounded-xl border border-gray-200 p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-600">Total Link's</p>
                                <h3 className="text-2xl font-bold mt-2">2</h3>
                            </div>
                            <div className="w-8 h-8  rounded-full flex items-center justify-center">
                                <IconLink className="h-full text-blue-600 w-full" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center">
                            <span className="text-sm text-gray-500 ">Total Links (active or not)</span>
                        </div>
                    </div>
                </section>
                <Chart {...exampleData} />
            </div>
        </>
    );
}
