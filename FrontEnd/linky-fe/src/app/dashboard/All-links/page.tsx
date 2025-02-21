function Page() {
    return (
        <>
            <div className="bg-white text-black">
                <section id="links_overview_widget" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 p-6">

                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-600">Total Links</p>
                                <h3 className="text-2xl font-bold mt-2">156</h3>
                            </div>
                            <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center">
                                <i className="fas fa-link text-accent-600 text-xl"></i>
                            </div>
                        </div>
                        <div className="mt-4 flex items-center">
                            <i className="fas fa-arrow-up text-green-500 text-sm"></i>
                            <span className="text-sm text-green-500 ml-1">12%</span>
                            <span className="text-sm text-gray-500 ml-2">vs last month</span>
                        </div>
                    </div>


                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-600">Total Clicks</p>
                                <h3 className="text-2xl font-bold mt-2">24.5K</h3>
                            </div>
                            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                                <i className="fas fa-mouse-pointer text-primary-600 text-xl"></i>
                            </div>
                        </div>
                        <div className="mt-4 flex items-center">
                            <i className="fas fa-arrow-up text-green-500 text-sm"></i>
                            <span className="text-sm text-green-500 ml-1">8%</span>
                            <span className="text-sm text-gray-500 ml-2">vs last month</span>
                        </div>
                    </div>


                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-600">Average CTR</p>
                                <h3 className="text-2xl font-bold mt-2">4.2%</h3>
                            </div>
                            <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center">
                                <i className="fas fa-chart-line text-secondary-600 text-xl"></i>
                            </div>
                        </div>
                        <div className="mt-4 flex items-center">
                            <i className="fas fa-arrow-down text-red-500 text-sm"></i>
                            <span className="text-sm text-red-500 ml-1">2%</span>
                            <span className="text-sm text-gray-500 ml-2">vs last month</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-600">Active Links</p>
                                <h3 className="text-2xl font-bold mt-2">142</h3>
                            </div>
                            <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center">
                                <i className="fas fa-check-circle text-accent-600 text-xl"></i>
                            </div>
                        </div>
                        <div className="mt-4 flex items-center">
                            <i className="fas fa-arrow-up text-green-500 text-sm"></i>
                            <span className="text-sm text-green-500 ml-1">5%</span>
                            <span className="text-sm text-gray-500 ml-2">vs last month</span>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Page;