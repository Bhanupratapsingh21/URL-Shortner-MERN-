import link from "@/types/links.types";
import formatClickCount from "@/utils/formatcount";
import Link from "next/link";
import { useState } from "react";
import { IconCopy, IconCheck } from "@tabler/icons-react";

interface ExtendedLink extends link {
    totalVisits: number;
    activeRedirectsCount: number;
    createdAt: string;
};

const LinksCards = ({ links }: { links: ExtendedLink[] }) => {
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const baseUrl = process.env.NEXT_PUBLIC_REDIRECT_URL || "https://yourdomain.com";

    const copyToClipboard = (shortId: string) => {
        const url = `${baseUrl}/${shortId}`;
        navigator.clipboard.writeText(url);
        setCopiedId(shortId);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full px-4 sm:px-0">
            {links.map((link) => (
                <div 
                    key={link.id}
                    className="group relative flex w-full flex-col rounded-xl bg-slate-950 p-4 shadow-2xl transition-all duration-300 hover:scale-[1.02] border border-gray-800"
                >
                    <div className="relative">
                        {/* Header with short ID and status */}
                        <div className="mb-3 sm:mb-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500">
                                    <svg
                                        className="h-3 w-3 sm:h-4 sm:w-4 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                        />
                                    </svg>
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="text-xs sm:text-sm font-semibold text-white">
                                        {link.shortId}
                                    </h3>
                                    <button 
                                        onClick={() => copyToClipboard(link.shortId)}
                                        className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300"
                                    >
                                        {copiedId === link.shortId ? (
                                            <>
                                                <IconCheck className="h-3 w-3" />
                                                Copied!
                                            </>
                                        ) : (
                                            <>
                                                <IconCopy className="h-3 w-3" />
                                                Copy Link
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-500">
                                <span className={`h-1.5 w-1.5 rounded-full ${link.active ? "bg-emerald-500" : "bg-red-600"}`} />
                                {link.active ? "Active" : "Inactive"}
                            </span>
                        </div>

                        {/* Stats grid */}
                        <div className="mb-3 sm:mb-4 grid grid-cols-2 gap-3 sm:gap-4">
                            <div className="rounded-lg bg-slate-900/50 p-2 sm:p-3">
                                <p className="text-xs text-slate-400">Total Visits</p>
                                <p className="text-base sm:text-lg font-semibold text-white">
                                    {formatClickCount(link.totalVisits)}
                                </p>
                            </div>

                            <div className="rounded-lg bg-slate-900/50 p-2 sm:p-3">
                                <p className="text-xs text-slate-400">Active Redirects</p>
                                <p className="text-base sm:text-lg font-semibold text-white">
                                    {formatClickCount(link.activeRedirectsCount)}
                                </p>
                            </div>
                        </div>

                        {/* Footer with date and view button */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-slate-400">
                                    {new Date(link.createdAt).toLocaleDateString()}
                                </span>
                            </div>

                            <Link
                                href={`/dashboard/Link?id=${link.id}&shortId=${link.shortId}`}
                                className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 px-3 py-1 text-xs font-medium text-white transition-all duration-300 hover:from-indigo-600 hover:to-purple-600"
                            >
                                View
                                <svg
                                    className="h-3 w-3"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LinksCards;