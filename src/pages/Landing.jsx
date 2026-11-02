import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import EventCard from '../components/EventCard';
import { CATEGORIES } from '../data/mockData';
import {
  Sparkles, Compass, CheckCircle2, Ticket, Users, Shield, ArrowRight,
  Music, Cpu, Trophy, Wrench, Utensils, Palette, Briefcase, Heart
} from 'lucide-react';

const CATEGORY_ICONS = {
  "Technology": Cpu,
  "Music": Music,
  "Sports": Trophy,
  "Workshop": Wrench,
  "Food": Utensils,
  "Arts": Palette,
  "Community": Heart,
  "Business": Briefcase
};

export const Landing = () => {
  const { events } = useAuth();
  const navigate = useNavigate();

  const featuredEvents = events.slice(0, 6);

  return (
    <div className="space-y-20 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-extrabold">
                <Sparkles className="w-4 h-4" />
                <span>Passwordless OTP Event Registration</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                Discover Events That <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-600 bg-clip-text text-transparent">
                  Bring People Together
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                Find workshops, concerts, sports events, meetups, festivals and community experiences happening around you.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/events"
                  className="px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-rose-600 hover:from-indigo-500 hover:to-rose-500 text-white font-extrabold text-sm rounded-2xl shadow-xl shadow-indigo-600/30 transition-all flex items-center gap-2"
                >
                  <span>Explore Events</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/login"
                  className="px-6 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 text-slate-800 dark:text-slate-200 font-extrabold text-sm rounded-2xl transition-all shadow-sm"
                >
                  Get Started
                </Link>
              </div>
            </div>

            {/* HERO IMAGE Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 group">
                <img
                  src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80"
                  alt="Community Event"
                  className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

                <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest block">
                      Live in Chennai & Metro Cities
                    </span>
                    <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                      12+ Upcoming Public Events
                    </span>
                  </div>
                  <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full">
                    Active Now
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* POPULAR CATEGORIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Popular Categories
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Browse local public events categorized by your passion and interest.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES.filter(c => c !== "All").map((category) => {
            const IconComponent = CATEGORY_ICONS[category] || Compass;
            return (
              <div
                key={category}
                onClick={() => navigate(`/events?category=${category}`)}
                className="group p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 text-center cursor-pointer flex flex-col items-center justify-center space-y-3"
              >
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <IconComponent className="w-6 h-6" />
                </div>
                <span className="text-sm font-extrabold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {category}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* FEATURED EVENTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Featured Events
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Top handpicked local experiences and workshops near you.
            </p>
          </div>

          <Link
            to="/events"
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            <span>View All Events</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="bg-slate-100 dark:bg-slate-900/60 border-y border-slate-200 dark:border-slate-800 py-16 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              How EventCircle Works
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Simple 3-step passwordless process to find and attend local public events.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-center space-y-4 shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white font-extrabold text-xl flex items-center justify-center mx-auto shadow-lg shadow-indigo-600/30">
                1
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">Discover</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Filter public events by category, location, date, and price to find experiences that suit your schedule.
              </p>
            </div>

            <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-center space-y-4 shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-purple-600 text-white font-extrabold text-xl flex items-center justify-center mx-auto shadow-lg shadow-purple-600/30">
                2
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">Register</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Enter your mobile number, verify the 6-digit OTP code passwordlessly, and reserve your tickets instantly.
              </p>
            </div>

            <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-center space-y-4 shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-rose-600 text-white font-extrabold text-xl flex items-center justify-center mx-auto shadow-lg shadow-rose-600/30">
                3
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">Experience</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Access your digital pass in My Events and present your ticket reference at the venue gate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY EVENTCIRCLE SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 block mb-2">
              Why EventCircle?
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
              Built for Community Connections & Modern Event Discovery
            </h2>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Easy Event Discovery</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Search events by title, topic, or venue with instant location filters.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Passwordless OTP Auth</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">No passwords to remember. Instant mobile OTP login for fast checkout.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Digital Event Tickets</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Instant digital pass wallet with booking reference IDs stored in your browser.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 bg-gradient-to-tr from-indigo-900 to-rose-950 text-white rounded-3xl border border-indigo-800 shadow-2xl">
            <h3 className="text-2xl font-extrabold mb-3">Ready to discover your next event?</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              Join thousands of community members exploring local developer summits, music concerts, and fitness workshops.
            </p>
            <Link
              to="/events"
              className="inline-block px-6 py-3 bg-white text-slate-950 font-extrabold text-xs rounded-xl shadow-lg hover:bg-slate-100 transition-colors"
            >
              Explore All Events
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Landing;
