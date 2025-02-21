"use client";
import { useState } from "react";

const Page = () => {
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [copied, setCopied] = useState(false);

    return (
        <div id="url_shortener_widget" className="p-6 bg-white w-full h-full mx-auto">
            <div className="bg-white rounded-xl text-black border border-gray-200 p-6">
                <h3 className="text-lg font-semibold mb-4">Create Short URL</h3>
                <form className="space-y-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <input
                                type="url"
                                placeholder="Paste your long URL here"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-all"
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-6 bg-[#9333EA] py-3 bg-accent-600 hover:bg-accent-700 text-white font-medium rounded-lg transition-colors"
                        >
                            Shorten URL
                        </button>
                    </div>
                    <div className="flex items-center">
                        <button
                            type="button"
                            onClick={() => setShowAdvanced(!showAdvanced)}
                            className="text-sm text-gray-600 hover:text-accent-600 flex items-center"
                        >
                            <i className="fas fa-cog mr-2"></i>
                            Advanced Options
                            <i className={`fas ml-2 ${showAdvanced ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
                        </button>
                    </div>
                    {showAdvanced && (
                        <div className="p-4 bg-gray-50 rounded-lg space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-black mb-1">
                                        Custom Back-half
                                    </label>
                                    <div className="flex items-center">
                                        <span className="text-gray-500 mr-2">linky.io/</span>
                                        <input
                                            type="text"
                                            placeholder="custom-url"
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiration</label>
                                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500">
                                        <option value="">Never</option>
                                        <option value="24h">24 Hours</option>
                                        <option value="7d">7 Days</option>
                                        <option value="30d">30 Days</option>
                                        <option value="custom">Custom</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}
                </form>
            </div>
            <div className="mt-6 bg-white rounded-xl border text-black border-gray-200 p-6">
                <h3 className="text-lg font-semibold mb-4">Recent URLs</h3>
                <div className="space-y-4">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">linky.io/product-launch</p>
                            <p className="text-xs text-gray-500 truncate mt-1">
                                https://example.com/very/long/original/url/that/needs/to/be/shortened
                            </p>
                        </div>
                        <div className="flex items-center mt-2 md:mt-0 space-x-2">
                            <span className="text-xs text-black">24 clicks</span>
                            <button
                                onClick={() => {
                                    setCopied(true);
                                    setTimeout(() => setCopied(false), 2000);
                                }}
                                className="p-2 text-gray-600 hover:text-accent-600 transition-colors"
                            >
                                <i className={`fas ${copied ? "fa-check" : "fa-copy"}`}></i>
                            </button>
                            <button className="p-2 text-gray-600 hover:text-red-600 transition-colors">
                                <i className="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
