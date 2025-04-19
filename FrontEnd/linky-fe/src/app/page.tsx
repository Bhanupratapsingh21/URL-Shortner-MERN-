"use client";
import React, { useState } from "react";
import ColourfulText from "@/components/ui/colourful-text";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";
import MainNavbar from "@/components/Mainpagenavbar";

export default function Home() {
  const [text, settext] = useState("")
  const [shortid, setShortId] = useState("")
  return (
    <>
      <MainNavbar />
      <div className="">
        <section id="hero" className="min-h-[70vh] bg-black  pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between py-12">


            <div className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate__animated animate__fadeInUp">
                Shorten, Share, and Track Your Links With <ColourfulText text="Linky" />
              </h1>
              <p className="text-lg text-neutral-300 mb-8 animate__animated animate__fadeInUp animate__delay-1s">
                More than just a URL shortener. Get advanced analytics, timed redirects, and powerful tracking features to supercharge your link management.
              </p>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 animate__animated animate__fadeInUp animate__delay-2s">
                <Link href="/dashboard" className="bg-indigo-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
                  Get Started Free
                </Link>
                <a href="#features" className="border border-neutral-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-neutral-800 transition-colors">
                  Learn More
                </a>
              </div>
              <div className="mt-8 text-neutral-400 text-sm animate__animated animate__fadeInUp animate__delay-3s">
                <p>Trusted By Me And My 10/10 buddie And My Dog</p>
                <div className="flex items-center justify-center lg:justify-start mt-4 space-x-4">
                  <div className="flex items-center">
                    <span className="text-yellow-400">★★★★★</span>
                    <span className="ml-2">5/5 rating</span>
                  </div>
                </div>
              </div>
            </div>


            <div className="lg:w-1/2 w-full max-w-md lg:max-w-lg animate__animated animate__fadeInRight">
              <div className="bg-neutral-800 p-6 rounded-xl shadow-2xl border border-neutral-700">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-neutral-300 text-sm font-medium">Customize your link (optional)</label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-neutral-700 bg-neutral-900 text-neutral-400 text-sm">
                        {process.env.NEXT_PUBLIC_REDIRECT_URL}
                      </span>
                      <input type="text" value={shortid} onChange={(e) => setShortId(e.target.value)} className="flex-1 px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-r-lg text-white focus:outline-none focus:border-indigo-500" placeholder="custom-name" />
                    </div>
                  </div>
                  <hr />
                  <Link className="py-4" href={`/dashboard/Create-link?shortId=${shortid}`}>
                    <button className="w-full bg-indigo-600 text-white text py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
                      Shorten URL
                    </button>
                  </Link>

                </div>
                <div className="mt-6 text-left">
                  <p className="text-neutral-400 text-sm">By using our service, you agree to our Terms of Service and Privacy Policy</p>
                </div>
              </div>
            </div>
          </div>


          <div className="w-full">
            <svg className="w-full" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill="#171717" d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,42.7C960,43,1056,53,1152,53.3C1248,53,1344,43,1392,37.3L1440,32L1440,100L1392,100C1344,100,1248,100,1152,100C1056,100,960,100,864,100C768,100,672,100,576,100C480,100,384,100,288,100C192,100,96,100,48,100L0,100Z"></path>
            </svg>
          </div>
        </section>
        <section id="features" className="py-20 bg-black ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate__animated animate__fadeIn">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Powerful Features for Smart Link Management</h2>
              <p className="text-neutral-300 text-lg max-w-2xl mx-auto">Transform your links into powerful marketing tools with our advanced features designed for modern businesses.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

              <div className="bg-black-900 p-6 rounded-xl border bg-neutral-900 border-neutral-700 hover:border-indigo-500 transition-all duration-300 animate__animated animate__fadeInUp">
                <div className="h-12 w-12 bg-indigo-600/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Quick Link Generation</h3>
                <p className="text-neutral-400">Create shortened URLs instantly with custom aliases and branded domains for better recognition.</p>
              </div>


              <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-700 hover:border-indigo-500 transition-all duration-300 animate__animated animate__fadeInUp animate__delay-1s">
                <div className="h-12 w-12 bg-indigo-600/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Time-Based Redirects</h3>
                <p className="text-neutral-400">Schedule different destinations for your links based on time, date, or custom conditions.</p>
              </div>


              <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-700 hover:border-indigo-500 transition-all duration-300 animate__animated animate__fadeInUp animate__delay-2s">
                <div className="h-12 w-12 bg-indigo-600/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Advanced Analytics</h3>
                <p className="text-neutral-400">Track clicks, geographic location, devices, and referral sources in real-time.</p>
              </div>


              <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-700 hover:border-indigo-500 transition-all duration-300 animate__animated animate__fadeInUp">
                <div className="h-12 w-12 bg-indigo-600/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Security Features</h3>
                <p className="text-neutral-400">Password protection, expiry dates, and click limits for controlled access.</p>
              </div>


              <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-700 hover:border-indigo-500 transition-all duration-300 animate__animated animate__fadeInUp animate__delay-1s">
                <div className="h-12 w-12 bg-indigo-600/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">A/B Testing</h3>
                <p className="text-neutral-400">Split test different destinations and analyze performance metrics.</p>
              </div>


              <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-700 hover:border-indigo-500 transition-all duration-300 animate__animated animate__fadeInUp animate__delay-2s">
                <div className="h-12 w-12 bg-indigo-600/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">API Integration</h3>
                <p className="text-neutral-400">Seamlessly integrate with your existing tools and automate link management.</p>
              </div>
            </div>
          </div>
        </section>
        <section id="analytics" className="py-20 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate__animated animate__fadeIn">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Powerful Analytics Dashboard</h2>
              <p className="text-neutral-300 text-lg max-w-2xl mx-auto">Track every click, analyze traffic patterns, and make data-driven decisions with our comprehensive analytics suite.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">


              <CardContainer className="inter-var">
                <CardBody className="bg-neutral-900 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                  <CardItem
                    translateZ="50"
                    className="text-xl font-bold text-neutral-900 dark:text-white"
                  >
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="bg-neutral-700 p-4 rounded-lg">
                        <h4 className="text-neutral-300 text-sm mb-2">Total Active Links</h4>
                        <p className="text-2xl font-bold text-green-500">6</p>
                      </div>
                      <div className="bg-neutral-700 p-4 rounded-lg">
                        <h4 className="text-neutral-300 text-sm mb-2">Total Clicks</h4>
                        <p className="text-2xl font-bold text-white">24,892</p>
                        <span className="text-green-500 text-sm">↑ 12.3%</span>
                      </div>
                      <div className="bg-neutral-700 p-4 rounded-lg">
                        <h4 className="text-neutral-300 text-sm mb-2">Total Visitors</h4>
                        <p className="text-2xl font-bold text-green-500">18,445</p>
                      </div>
                    </div>
                  </CardItem>
                  <CardItem
                    as="div"
                    translateZ="60"
                    className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                  >
                    <div className="bg-neutral-700 p-4 rounded-lg mb-6">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-white">Traffic Overview</h4>
                        <select className="bg-neutral-600 text-neutral-300 rounded px-2 py-1 text-sm">
                          <option>Last 7 days</option>
                          <option>Last 30 days</option>
                          <option>Last 90 days</option>
                        </select>
                      </div>
                      <div className="h-48 flex items-end justify-between gap-2">
                        <div className="w-1/7 bg-indigo-600 rounded-t h-[60%]"></div>
                        <div className="w-1/7 bg-indigo-600 rounded-t h-[75%]"></div>
                        <div className="w-1/7 bg-indigo-600 rounded-t h-[45%]"></div>
                        <div className="w-1/7 bg-indigo-600 rounded-t h-[90%]"></div>
                        <div className="w-1/7 bg-indigo-600 rounded-t h-[65%]"></div>
                        <div className="w-1/7 bg-indigo-600 rounded-t h-[80%]"></div>
                        <div className="w-1/7 bg-indigo-600 rounded-t h-[70%]"></div>
                      </div>
                    </div>
                  </CardItem>
                  <CardItem translateZ="100" className="w-full mt-4">
                    <div className="bg-neutral-700 p-4 rounded-lg">
                      <h4 className="text-white mb-4">Top Locations</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-neutral-300">United States</span>
                          <div className="w-48 bg-neutral-600 rounded-full h-2">
                            <div className="bg-indigo-600 h-2 rounded-full" style={{ "width": "75%" }} ></div>
                          </div>
                          <span className="text-white">75%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-neutral-300">United Kingdom</span>
                          <div className="w-48 bg-neutral-600 rounded-full h-2">
                            <div className="bg-indigo-600 h-2 rounded-full" style={{ "width": "45%" }} ></div>
                          </div>
                          <span className="text-white">45%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-neutral-300">Germany</span>
                          <div className="w-48 bg-neutral-600 rounded-full h-2">
                            <div className="bg-indigo-600 h-2 rounded-full" style={{ "width": "30%" }}></div>
                          </div>
                          <span className="text-white">30%</span>
                        </div>
                      </div>
                    </div>
                  </CardItem>
                  <div className="flex justify-between items-center mt-20">
                    <CardItem
                      translateZ={20}
                      as={Link}
                      href="/dashboard"
                      className="px-4 py-2 rounded-xl text-xs font-normal text-white"
                    >
                      Try now →
                    </CardItem>
                    <CardItem
                      translateZ={20}
                      as="button"
                      className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                    >
                      Sign up
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>

              <div className="space-y-8 animate__animated animate__fadeInRight">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 bg-indigo-600/20 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Real-time Tracking</h3>
                    <p className="text-neutral-400">Monitor clicks, conversions, and engagement metrics as they happen in real-time.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 bg-indigo-600/20 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Detailed Reports</h3>
                    <p className="text-neutral-400">Generate comprehensive reports with user demographics, device types, and referral sources.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 bg-indigo-600/20 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Geographic Insights</h3>
                    <p className="text-neutral-400">Track visitor locations down to city level and optimize your targeting strategy.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="timeRedirect" className="py-20 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate__animated animate__fadeIn">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Smart Time-Based Redirects</h2>
              <p className="text-neutral-300 text-lg max-w-2xl mx-auto">Control where your users go based on time, date, or custom scheduling.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">

              <CardContainer className="inter-var">
                <CardBody className="bg-neutral-900 h-full p-6 rounded-xl border border-neutral-700 shadow-2xl animate__animated animate__fadeInLeft ">
                  <CardItem
                    as="div"
                    translateZ="60"
                    className="text-neutral-500 text-sm w-full mt-2 dark:text-neutral-300"
                  >
                    <div className="mb-8">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-white text-xl font-semibold">Redirect Schedule</h3>
                        <span className="bg-indigo-600/20 text-indigo-400 px-3 py-1 rounded-full text-sm">Active</span>
                      </div>

                      <div className="space-y-4">
                        <div className="bg-neutral-800 p-4 rounded-lg border border-neutral-700">
                          <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center gap-3">
                              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                              <span className="text-white">Morning Redirect</span>
                            </div>
                            <span className="text-neutral-400">6:00 AM - 12:00 PM</span>
                          </div>
                          <input type="text" value="https://morning-linky.com" className="w-full bg-neutral-700 border-none rounded p-2 text-neutral-300 text-sm" />
                        </div>

                        <div className="bg-neutral-800 p-4 rounded-lg border border-neutral-700">
                          <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center gap-3">
                              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                              <span className="text-white">Afternoon Redirect</span>
                            </div>
                            <span className="text-neutral-400">12:00 PM - 6:00 PM</span>
                          </div>
                          <input type="text" value="https://afternoon-special.com" className="w-full bg-neutral-700 border-none rounded p-2 text-neutral-300 text-sm" />
                        </div>

                        <div className="bg-neutral-800 p-4 rounded-lg border border-neutral-700">
                          <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center gap-3">
                              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                              <span className="text-white">Evening Redirect</span>
                            </div>
                            <span className="text-neutral-400">6:00 PM - 12:00 AM</span>
                          </div>
                          <input type="text" value="https://evening-deals.com" className="w-full bg-neutral-700 border-none rounded p-2 text-neutral-300 text-sm" />
                        </div>
                      </div>
                    </div>
                    <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
                      Create Time-Based Link
                    </button>
                  </CardItem>
                </CardBody>
              </CardContainer>



              <div className="space-y-8 animate__animated animate__fadeInRight">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 bg-indigo-600/20 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Time-Zone Smart</h3>
                    <p className="text-neutral-400">Automatically adjusts to visitor's local time zone for precise targeting.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 bg-indigo-600/20 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Custom Schedules</h3>
                    <p className="text-neutral-400">Set different URLs for specific dates, days of the week, or special events.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 bg-indigo-600/20 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Fallback URLs</h3>
                    <p className="text-neutral-400">Set default redirects for times outside your scheduled windows.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="cta" className="py-20 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 md:p-16 relative overflow-hidden">

              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M0 0L100 100M100 0L0 100" stroke="currentColor" stroke-width="0.5" />
                </svg>
              </div>

              <div className="relative z-5 grid md:grid-cols-2 gap-12 items-center">
                <div className="animate__animated animate__fadeInLeft">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                    Ready to Supercharge Your Links?
                  </h2>
                  <p className="text-lg text-white/90 mb-8">
                    Join thousands of businesses using Linky to create smarter, more powerful links. Get started for free today.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/dashboard" className="inline-flex justify-center items-center px-8 py-4 rounded-xl bg-white text-indigo-600 font-semibold hover:bg-neutral-100 transition-colors animate__animated animate__pulse animate__infinite animate__slower">
                      Start For Free
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                   
                  </div>
                </div>

                <div className="space-y-6 animate__animated animate__fadeInRight">
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div className="text-white">
                        <h3 className="font-semibold">Lightning Fast Setup</h3>
                        <p className="text-white/80">Get started in less than 2 minutes</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div className="text-white">
                        <h3 className="font-semibold">Enterprise Security</h3>
                        <p className="text-white/80">Bank-level security for your links</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="text-white">
                        <h3 className="font-semibold">Money-Back Guarantee</h3>
                        <p className="text-white/80">Ask For Refund Its Free & Open Source</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="testimonials" className="py-20 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate__animated animate__fadeIn">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Loved by Businesses Worldwide</h2>
              <p className="text-neutral-300 text-lg max-w-2xl mx-auto">See what our customers have to say about their experience with Linky</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">

              <div className="bg-neutral-900 p-8 rounded-xl border border-neutral-700 hover:border-indigo-500 transition-all duration-300 animate__animated animate__fadeInUp">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-neutral-700 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">JD</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">John Doe</h4>
                    <p className="text-neutral-400">Marketing Director</p>
                  </div>
                </div>
                <div className="mb-6">
                  <div className="flex text-yellow-400 mb-2">
                    ★★★★★
                  </div>
                  <p className="text-neutral-300 italic">"Linky has transformed how we manage our marketing campaigns. The time-based redirects and analytics have been game-changers for our business."</p>
                </div>
                <div className="flex items-center text-neutral-400 text-sm">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" />
                  </svg>
                  Verified Customer
                </div>
              </div>


              <div className="bg-neutral-900 p-8 rounded-xl border border-neutral-700 hover:border-indigo-500 transition-all duration-300 animate__animated animate__fadeInUp animate__delay-1s">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-neutral-700 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">SJ</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Sarah Johnson</h4>
                    <p className="text-neutral-400">E-commerce Owner</p>
                  </div>
                </div>
                <div className="mb-6">
                  <div className="flex text-yellow-400 mb-2">
                    ★★★★★
                  </div>
                  <p className="text-neutral-300 italic">"The analytics features are incredible. Being able to track user behavior and optimize our links has increased our conversion rates by 40%."</p>
                </div>
                <div className="flex items-center text-neutral-400 text-sm">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" />
                  </svg>
                  Verified Customer
                </div>
              </div>

              <div className="bg-neutral-900 p-8 rounded-xl border border-neutral-700 hover:border-indigo-500 transition-all duration-300 animate__animated animate__fadeInUp animate__delay-2s">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-neutral-700 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">MP</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Mike Peters</h4>
                    <p className="text-neutral-400">Digital Strategist</p>
                  </div>
                </div>
                <div className="mb-6">
                  <div className="flex text-yellow-400 mb-2">
                    ★★★★★
                  </div>
                  <p className="text-neutral-300 italic">"The ability to create time-based redirects has revolutionized our global marketing campaigns. Linky is now an essential part of our toolkit."</p>
                </div>
                <div className="flex items-center text-neutral-400 text-sm">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" />
                  </svg>
                  Verified Customer
                </div>
              </div>
            </div>


            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-16 text-center animate__animated animate__fadeIn">
              <div className="p-6 bg-neutral-900 rounded-xl border border-neutral-700">
                <div className="text-3xl font-bold text-white mb-2">10+</div>
                <div className="text-neutral-400">Active Users</div>
              </div>
              <div className="p-6 bg-neutral-900 rounded-xl border border-neutral-700">
                <div className="text-3xl font-bold text-white mb-2">50+</div>
                <div className="text-neutral-400">Links Created</div>
              </div>
              <div className="p-6 bg-neutral-900 rounded-xl border border-neutral-700">
                <div className="text-3xl font-bold text-white mb-2">90.9%</div>
                <div className="text-neutral-400">Uptime</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
