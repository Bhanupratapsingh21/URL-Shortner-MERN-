import Image from 'next/image';
import React from 'react';
import logo from '../../public/logo.png';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import Usertype from '../types/user.type';

const Miannavbar = () => {
    const user = useSelector((state: { user: Usertype }) => state);

    return (
        <>
            <div className='px-36 z-10 fixed bg-opacity-15 backdrop-blur-lg top-0 w-full  border-b-2 border-b-slate-300 shadow-md '>
                <div className='flex justify-between items-center h-16'>
                    <div className='flex ml-4 justify-center gap-2 items-center'>
                        <Image
                            alt='Linky Logo'
                            className="cursor-pointer h-10 w-auto"
                            src={logo}
                            width={80}
                            height={80}
                        />
                        <div className='text-white font-bold text-2xl'>Linky</div>
                    </div>
                    {
                        user.user.status ? (
                            <div className='flex gap-4 items-center'>
                                <Link href='/dashboard'>
                                    Dashboard
                                </Link>

                            </div>
                        ) : (
                            <div className='flex items-center'>
                                <div className='text-white font-bold text-lg mr-5'><Link href={"/auth/signin"}>Sign-in</Link></div>
                                <div className='text-white font-bold text-lg mr-5'><Link href={"/auth/signup"}>Sign up</Link></div>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}
export default Miannavbar;