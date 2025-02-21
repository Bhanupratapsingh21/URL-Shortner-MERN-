import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sidebar } from '../../components/Sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="fixed inset-0  flex flex-col-reverse lg:flex-row h-full w-full">
            {/* Sidebar */}
            <div className="lg:mx-0 lg:my-0 mx-2 lg:w-auto  my-2 lg:h-full  text-white">
                <Sidebar />
            </div>
            {/* Main content */}
            <div className="overflow-x-scroll w-full h-full">
                {children}
            </div>
        </div>
    );
}