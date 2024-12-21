import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
export const Logo = () => {
    return (
        <Link
            href="#"
            className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
        >
            <div className="h-8 w-8 bg-transparent rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" >
                <Image
                    src="/favicon.ico"
                    alt="Logo"
                    width={32}
                    height={32}
                />
            </div>
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-normal text-lg text-black dark:text-white whitespace-pre"
            >
                Linky
            </motion.span>
        </Link>
    );
};