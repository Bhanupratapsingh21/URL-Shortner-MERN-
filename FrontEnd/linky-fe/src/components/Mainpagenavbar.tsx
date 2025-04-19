import Image from 'next/image';
import React from 'react';
import logo from '../../public/logo.png';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import Usertype from '../types/user.type';
import {
    IconLayoutDashboard,
} from "@tabler/icons-react";

const Miannavbar = () => {
    const user = useSelector((state: { user: Usertype }) => state);

    return (
        <div className='fixed top-0 w-full z-10 bg-opacity-15 backdrop-blur-lg border-b-2 border-b-slate-300 shadow-md'>
            <div className='flex justify-between items-center h-16 px-4 sm:px-6 lg:px-12 xl:px-36'>
                <div className='flex items-center gap-2'>
                    <Image
                        alt='Linky Logo'
                        className="cursor-pointer h-10 w-auto"
                        src={logo}
                        width={80}
                        height={80}
                    />
                    <div className='text-white font-bold text-base sm:text-lg lg:text-2xl'>Linky</div>
                </div>

                {user.user.status ? (
                    <Link
                        className='flex gap-2 items-center text-white'
                        href='/dashboard'
                    >
                        <IconLayoutDashboard className="h-6 w-6 sm:h-7 sm:w-7" />
                        <span className="hidden sm:inline font-medium">Dashboard</span>
                    </Link>
                ) : (
                    <div className='flex gap-4 items-center'>
                        <Link href={"/auth/signin"}>
                            <span className='text-white font-medium text-sm sm:text-base'>Sign in</span>
                        </Link>
                        <Link href={"/auth/signup"}>
                            <span className='text-white font-medium text-sm sm:text-base'>Sign up</span>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Miannavbar;
