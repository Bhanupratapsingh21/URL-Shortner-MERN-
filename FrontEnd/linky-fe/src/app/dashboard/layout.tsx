"use client";

import React, { Suspense, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Sidebar } from '../../components/Sidebar';
import Usertype from '@/types/user.type';
import { RootState } from '@/store';

export default function Layout({ children }: { children: React.ReactNode }) {

    const user = useSelector((state: RootState) => state.user);
    const router = useRouter();
    const { toast } = useToast();
    const [checkingAuth, setCheckingAuth] = useState(true);

    useEffect(() => {
        if (user.status === false) {
            console.log(user);
            router.push('/auth/signin');
            toast({
                title: 'Please login',
                description: 'You need to login to continue.',
            });
        } else {
            setCheckingAuth(false);
        }
    }, [user.status]);

    if (checkingAuth || user.status === false) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
            </div>
        );
    }

    return (
        <div className="fixed inset-0 flex flex-col-reverse lg:flex-row h-full w-full">
            <div className="lg:mx-0 lg:my-0 mx-2 lg:w-auto my-2 lg:h-full text-white">
                <Sidebar />
            </div>
            <div className="overflow-x-scroll w-full h-full">
                <Suspense fallback={
                    <div className="flex items-center justify-center h-full">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
                    </div>
                }>
                    {children}
                </Suspense>
            </div>
        </div>
    );
}
