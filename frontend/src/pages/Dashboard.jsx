'use client';
import { useMemo, useState, useEffect } from 'react';
import { utils } from 'swapy';
import { SwapyItem, SwapyLayout, SwapySlot } from '@/components/swapy';
import { BookOpen, CreditCard, MessageSquare, Star } from 'lucide-react';
import Navbar from '@/components/navbar';
import { Link } from 'react-router-dom';
import { GridBeams } from '@/components/magicui/grid-beams';

// CLEAN CARD COMPONENTS (no statistics, just card type and description)

export function LessonsCard() {
  return (
    <div className="bg-[#0D3B66] rounded-xl h-full p-6 flex flex-col justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-center mb-4">
        <BookOpen className="w-12 h-12 text-purple-200" />
      </div>
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">Security Lessons</h3>
        <p className="text-purple-200 text-sm">
          Interactive video lessons and practical exercises for digital safety
        </p>
      </div>
    </div>
  );
}

export function TransactionFraudCard() {
  return (
    <div className="bg-[#7E1F86] rounded-xl h-full p-6 flex flex-col justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-center mb-4">
        <CreditCard className="w-12 h-12 text-red-200" />
      </div>
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">Transaction Fraud</h3>
        <p className="text-red-200 text-sm">
          AI-powered fraud detection and prevention for financial transactions
        </p>
      </div>
    </div>
  );
}

export function MessageFraudCard() {
  return (
    <div className="bg-[#177E89] rounded-xl h-full p-6 flex flex-col justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-center mb-4">
        <MessageSquare className="w-12 h-12 text-orange-200" />
      </div>
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">Message Fraud</h3>
        <p className="text-orange-200 text-sm">
          Advanced filtering system for spam and phishing message detection
        </p>
      </div>
    </div>
  );
}

export function FeedbackCard() {
  return (
    <div className="bg-[#A499BE] rounded-xl h-full p-6 flex flex-col justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-center mb-4">
        <Star className="w-12 h-12 text-green-200" />
      </div>
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">User Feedback</h3>
        <p className="text-green-200 text-sm">
          Collect and analyze user feedback to improve system performance
        </p>
      </div>
    </div>
  );
}

// Card configuration with links
const initialItems = [
  {
    id: '1',
    title: '1',
    widgets: <Link to='/lessons'><LessonsCard /></Link>,
    className: 'lg:col-span-4 sm:col-span-7 col-span-12',
  },
  {
    id: '2',
    title: '2',
    widgets: <Link to='/fraud-predict-transaction'><TransactionFraudCard /></Link>,
    className: 'lg:col-span-3 sm:col-span-5 col-span-12',
  },
  {
    id: '3',
    title: '3',
    widgets: <Link to='/fraud-predict-message'><MessageFraudCard/></Link>,
    className: 'lg:col-span-5 sm:col-span-5 col-span-12',
  },
  {
    id: '5',
    title: '5',
    widgets: <Link to='/feedback'><FeedbackCard /></Link>,
    className: 'lg:col-span-4 sm:col-span-6 col-span-12 lg:col-start-5',
  }
];

// CLEAN DASHBOARD LAYOUT (removed statistics section)

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
      <div className="relative z-10">
        <Navbar />
      </div>

      <div className="px-4 lg:px-6 relative z-10 mx-auto container">
        {/* Simplified Dashboard Header */}
        <div className="py-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Digital Safety Dashboard</h1>
          <p className="text-gray-400 text-lg">Choose a module to get started</p>
        </div>

        {/* Dashboard Grid */}
        <SwapyLayout
          id="swapy"
          className="w-full"
          config={{ swapMode: 'hover' }}
          onSwap={(event) => {
            console.log('Swap detected!', event.newSlotItemMap.asArray);
          }}>
          <div className="grid w-full grid-cols-12 gap-4 md:gap-6 py-6">
            {slottedItems.map(({ slotId, itemId }) => {
              const item = initialItems.find((i) => i.id === itemId);
              return (
                <SwapySlot
                  key={slotId}
                  className={`swapyItem rounded-lg h-64 ${item?.className}`}
                  id={slotId}>
                  <SwapyItem
                    id={itemId}
                    className="relative rounded-lg w-full h-full cursor-pointer"
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
