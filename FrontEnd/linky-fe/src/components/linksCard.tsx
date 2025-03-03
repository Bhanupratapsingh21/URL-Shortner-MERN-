import link from "@/types/links.types";
import formatClickCount from "@/utils/formatcount";
import Link from "next/link";

interface ExtendedLink extends link {
    totalVisits: number;
    activeRedirectsCount: number;
    createdAt: string;
};


const LinksCards = ({ links }: { links: ExtendedLink[] }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3  gap-6 w-full">
            {links.map((link) => (
                <div className="group relative flex w-80 flex-col rounded-xl bg-slate-950 p-4 shadow-2xl transition-all duration-300 hover:scale-[1.02] ">
                    <div className="relative">
                        <div className="mb-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div
                                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500"
                                >
                                    <svg
                                        className="h-4 w-4 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                        ></path>
                                    </svg>
                                </div>
                                <h3 className="text-sm font-semibold text-white">Short Id : {link.shortId}</h3>
                            </div>

                            <span
                                className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-500"
                            >
                                <span className={`h-1.5 w-1.5 rounded-full  ${link.active ? "bg-emerald-500" : "bg-red-600"}`}></span>
                                {link.active ? "Active" : "Inactive"}
                            </span>
                        </div>

                        <div className="mb-4 grid grid-cols-2 gap-4">
                            <div className="rounded-lg bg-slate-900/50 p-3">
                                <p className="text-xs font-medium text-slate-400">Total Visits</p>
                                <p className="text-lg font-semibold text-white">{formatClickCount(link.totalVisits)}</p>
                            </div>

                            <div className="rounded-lg bg-slate-900/50 p-3">
                                <p className="text-xs font-medium text-slate-400">Active Redirect's Count</p>
                                <p className="text-lg font-semibold text-white">{formatClickCount(link.activeRedirectsCount)}</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-medium text-slate-400">Created On : {link.createdAt.slice(0, 10)}</span>
                            </div>

                            <Link
                                href={`/dashboard/links/${link.shortId}`}
                                className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 px-3 py-1 text-xs font-medium text-white transition-all duration-300 hover:from-indigo-600 hover:to-purple-600"
                            >
                                View More
                                <svg
                                    className="h-3 w-3"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M9 5l7 7-7 7"
                                    ></path>
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default LinksCards;