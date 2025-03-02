import {
    IconLink,
    IconDeviceMobile,
    IconDeviceDesktop,
    IconDeviceTablet,
} from "@tabler/icons-react";

const transformDeviceData = (topDevices: { device: string; count: number }[]) => {
    // Get total count of all visits
    const totalCount = topDevices.reduce((sum, stat) => sum + stat.count, 0);

    // Map and calculate percentage
    return topDevices.map(stat => ({
        device: stat.device,
        count: stat.count,
        percentage: Number(totalCount > 0 ? ((stat.count / totalCount) * 100).toFixed(2) : "0"),
        icon: getDeviceIcon(stat.device) // Optional: Add icons if needed
    }));
};

// Example function to get an icon based on the device type
const getDeviceIcon = (device: string) => {
    if (device.toLowerCase().includes("Desktop")) return <IconDeviceDesktop className="h-6 w-6" />;
    if (device.toLowerCase().includes("Mobile")) return <IconDeviceMobile className="h-6 w-6" />;
    if (device.toLowerCase().includes("Tablet")) return <IconDeviceTablet className="h-6 w-6" />;
    return <IconDeviceDesktop className="h-6 w-6" />; // Default icon
};
export default transformDeviceData;