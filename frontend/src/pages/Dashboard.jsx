'use client';
import { useMemo, useState } from 'react';
import { utils } from 'swapy';
import { SwapyItem, SwapyLayout, SwapySlot } from '@/components/swapy';
import { Heart, PlusCircle, Bell, Search, Settings, User, Menu, MoreHorizontal, Download, RefreshCw, Filter, BookOpen, CreditCard, AlertTriangle, TrendingUp, MessageSquare, Shield, Star, CheckCircle, Activity, Users } from 'lucide-react';
import Navbar from '@/components/navbar';
import { Link } from 'react-router-dom';
import { GridBeams } from '@/components/magicui/grid-beams';
import MessageFraud from './MessageFraud';

// Your existing card components (unchanged)
export function LessonsCard() {
  return (
    <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl h-full p-6 flex flex-col justify-between text-white shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <BookOpen className="w-8 h-8 text-indigo-200" />
        <span className="bg-indigo-800 px-2 py-1 rounded-full text-xs">12 New</span>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Security Lessons</h3>
        <p className="text-2xl font-bold mb-1">47</p>
        <p className="text-indigo-200 text-sm">Completed this month</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <div className="flex-1 bg-indigo-800 rounded-full h-2">
          <div className="bg-indigo-300 h-2 rounded-full" style={{width: '68%'}}></div>
        </div>
        <span className="text-xs text-indigo-200">68%</span>
      </div>
    </div>
  );
}

export function TransactionFraudCard() {
  return (
    <div className="bg-gradient-to-br from-red-600 to-pink-700 rounded-xl h-full p-6 flex flex-col justify-between text-white shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <CreditCard className="w-8 h-8 text-red-200" />
        <div className="flex items-center gap-1">
          <AlertTriangle className="w-4 h-4 text-yellow-300" />
          <span className="text-xs text-yellow-300">High Risk</span>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Transaction Fraud</h3>
        <p className="text-3xl font-bold mb-1">23</p>
        <p className="text-red-200 text-sm">Detected today</p>
      </div>
      <div className="flex items-center justify-between mt-4">
        <span className="text-xs text-red-200">Blocked: $47,230</span>
        <div className="flex items-center gap-1">
          <TrendingUp className="w-4 h-4 text-green-300" />
          <span className="text-xs text-green-300">+15%</span>
        </div>
      </div>
    </div>
  );
}

export function MessageFraudCard() {
  return (
    <div className="bg-gradient-to-br from-orange-600 to-yellow-600 rounded-xl h-full p-6 flex flex-col justify-between text-white shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <MessageSquare className="w-8 h-8 text-orange-200" />
        <div className="flex items-center gap-1">
          <Shield className="w-4 h-4 text-green-300" />
          <span className="text-xs text-green-300">Protected</span>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Message Fraud</h3>
        <p className="text-3xl font-bold mb-1">156</p>
        <p className="text-orange-200 text-sm">Messages filtered</p>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-4">
        <div className="text-center">
          <p className="text-sm font-medium">Spam</p>
          <p className="text-xs text-orange-200">142</p>
        </div>
        <div className="text-center">
          <p className="text-sm font-medium">Phishing</p>
          <p className="text-xs text-orange-200">14</p>
        </div>
      </div>
    </div>
  );
}

export function FeedbackCard() {
  return (
    <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-xl h-full p-6 flex flex-col justify-between text-white shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <Star className="w-8 h-8 text-green-200 fill-green-200" />
        <div className="flex items-center gap-1">
          <CheckCircle className="w-4 h-4 text-green-300" />
          <span className="text-xs text-green-300">Excellent</span>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">User Feedback</h3>
        <div className="flex items-center gap-2">
          <p className="text-2xl font-bold">4.8</p>
          <div className="flex gap-1">
            {[1,2,3,4,5].map(i => (
              <Star key={i} className="w-4 h-4 text-yellow-300 fill-yellow-300" />
            ))}
          </div>
        </div>
        <p className="text-green-200 text-sm">Based on 1,247 reviews</p>
      </div>
      <div className="mt-4">
        <div className="flex justify-between text-xs text-green-200 mb-1">
          <span>Response Rate</span>
          <span>94%</span>
        </div>
        <div className="flex-1 bg-green-800 rounded-full h-2">
          <div className="bg-green-300 h-2 rounded-full" style={{width: '94%'}}></div>
        </div>
      </div>
    </div>
  );
}

export function SecurityOverviewCard() {
  return (
    <div className="bg-blue-600 rounded-xl h-full p-6 flex flex-col items-center justify-center shadow-md">
      <div className="w-16 h-16 mb-4">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="33" cy="33" r="25" fill="rgb(239, 68, 68)" />
          <circle cx="67" cy="33" r="25" fill="rgb(249, 115, 22)" />
          <circle cx="50" cy="67" r="25" fill="rgb(34, 197, 94)" />
        </svg>
      </div>
      <h2 className="2xl:text-3xl text-xl font-bold text-yellow-200">
        Security Hub
      </h2>
    </div>
  );
}

export function SystemOverviewCard() {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-cyan-700 rounded-xl h-full p-6 flex flex-col justify-between text-white shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <Activity className="w-8 h-8 text-blue-200" />
        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">System Status</h3>
        <p className="text-2xl font-bold text-green-300 mb-1">Online</p>
        <p className="text-blue-200 text-sm">99.9% uptime</p>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4 text-xs">
        <div>
          <p className="text-blue-200">CPU Usage</p>
          <p className="font-medium">23%</p>
        </div>
        <div>
          <p className="text-blue-200">Memory</p>
          <p className="font-medium">41%</p>
        </div>
      </div>
    </div>
  );
}

export function ThreatDetectionCard() {
  return (
    <div className="bg-purple-600 rounded-xl h-full p-4 flex flex-col justify-center items-center text-white shadow-lg">
      <h3 className="text-2xl font-bold mb-2">Threats Detected</h3>
      <p className="text-3xl font-bold mb-4">47</p>

      <div className="flex -space-x-2 mb-4">
        <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-purple-600 bg-red-400"></div>
        <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-purple-600 bg-orange-400"></div>
        <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-purple-600 bg-yellow-400"></div>
        <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-purple-600 bg-green-400"></div>
        <div className="w-10 h-10 rounded-xl bg-yellow-500 border-2 border-purple-600 flex items-center justify-center">
          <PlusCircle className="w-5 h-5 text-white" />
        </div>
      </div>

      <p className="text-sm">Real-time monitoring active</p>
    </div>
  );
}

export function ActiveUsersCard() {
  return (
    <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl h-full p-6 flex flex-col justify-between text-white shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <Users className="w-8 h-8 text-purple-200" />
        <span className="bg-purple-800 px-2 py-1 rounded-full text-xs">Live</span>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Active Users</h3>
        <p className="text-3xl font-bold mb-1">1,847</p>
        <p className="text-purple-200 text-sm">Currently online</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <div className="flex -space-x-1">
          {[1,2,3,4].map(i => (
            <div key={i} className="w-6 h-6 rounded-full bg-purple-400 border-2 border-purple-600"></div>
          ))}
        </div>
        <span className="text-xs text-purple-200">+1,843 more</span>
      </div>
    </div>
  );
}

export function AlertsCard() {
  return (
    <div className="bg-yellow-600 text-gray-900 rounded-xl h-full p-6 flex flex-col justify-between relative shadow-md">
      <p className="text-2xl font-bold">Security Alerts</p>
      <p className="text-2xl font-bold">Management System</p>
    </div>
  );
}

const initialItems = [
  {
    id: '1',
    title: '1',
    widgets: <><Link to='/lessons'><LessonsCard /></Link></>,
    className: 'lg:col-span-4 sm:col-span-7 col-span-12',
  },
  {
    id: '2',
    title: '2',
    widgets: <><Link to='/fraud-predict-transaction'><TransactionFraudCard /></Link></>,
    className: 'lg:col-span-3 sm:col-span-5 col-span-12',
  },
  {
    id: '3',
    title: '3',
    widgets: <><Link to='/fraud-predict-message'><MessageFraudCard/></Link></>,
    className: 'lg:col-span-5 sm:col-span-5 col-span-12',
  },
  {
    id: '4',
    title: '4',
    widgets: <SystemOverviewCard />,
    className: 'lg:col-span-5 sm:col-span-7 col-span-12',
  },
  {
    id: '5',
    title: '5',
    widgets: <FeedbackCard />,
    className: 'lg:col-span-4 sm:col-span-6 col-span-12',
  },
  {
    id: '6',
    title: '6',
    widgets: <ActiveUsersCard />,
    className: 'lg:col-span-3 sm:col-span-6 col-span-12',
  },
  {
    id: '7',
    title: '7',
    widgets: <ThreatDetectionCard />,
    className: 'lg:col-span-4 sm:col-span-5 col-span-12',
  },
  {
    id: '8',
    title: '8',
    widgets: <SecurityOverviewCard />,
    className: 'lg:col-span-4 sm:col-span-7 col-span-12',
  },
];

function Dashboard({ navbar = null }) {
  const [slotItemMap, setSlotItemMap] = useState(
    utils.initSlotItemMap(initialItems, 'id')
  );
  const slottedItems = useMemo(
    () => utils.toSlottedItems(initialItems, 'id', slotItemMap),
    [initialItems, slotItemMap]
  );

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: '#020412' }}>
      {/* GridBeams Background */}
      <div className="fixed inset-0 z-0">
        <GridBeams
          gridSize={0}
          gridColor="rgba(255, 255, 255, 0.2)"
          rayCount={20}
          rayOpacity={0.55}
          raySpeed={1.5}
          rayLength="40vh"
          gridFadeStart={5}
          gridFadeEnd={90}
          className="h-full w-full"
        />
      </div>
      
      {/* Navbar */}
      <div className="relative z-10 ">
        <Navbar />
      </div>

      <div className="px-4 lg:px-6 relative z-10 mx-auto container">
        {/* Dashboard Header */}
        <div className="py-6 border-b border-gray-700">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="text-center md:text-left ">
              <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
              <p className="text-gray-400 mt-1">Monitor your business performance and insights</p>
            </div>
            
            <div className="flex items-center justify-center md:justify-end space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 text-gray-300 hover:text-white">
                <Filter className="w-4 h-4" />
                <span className="text-sm">Filter</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 text-gray-300 hover:text-white">
                <RefreshCw className="w-4 h-4" />
                <span className="text-sm">Refresh</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Download className="w-4 h-4" />
                <span className="text-sm">Export</span>
              </button>
              <button className="p-2 border border-gray-600 rounded-lg hover:bg-gray-800 text-gray-300 hover:text-white">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">125K</p>
              <p className="text-sm text-gray-400">Total Users</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">89%</p>
              <p className="text-sm text-gray-400">Satisfaction</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-400">+12%</p>
              <p className="text-sm text-gray-400">Growth</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">$47K</p>
              <p className="text-sm text-gray-400">Revenue</p>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <SwapyLayout
          id="swapy"
          className="w-full"
          config={{
            swapMode: 'hover',
          }}
          onSwap={(event) => {
            console.log('Swap detected!', event.newSlotItemMap.asArray);
          }}>
          <div className="grid w-full grid-cols-12 gap-2 md:gap-6 py-6">
            {slottedItems.map(({ slotId, itemId }) => {
              const item = initialItems.find((i) => i.id === itemId);
              return (
                <SwapySlot
                  key={slotId}
                  className={`swapyItem rounded-lg h-64 ${item?.className}`}
                  id={slotId}>
                  <SwapyItem
                    id={itemId}
                    className="relative rounded-lg w-full h-full 2xl:text-xl text-sm"
                    key={itemId}>
                    {item?.widgets}
                  </SwapyItem>
                </SwapySlot>
              );
            })}
          </div>
        </SwapyLayout>
      </div>
    </div>
  );
}

export default Dashboard;
