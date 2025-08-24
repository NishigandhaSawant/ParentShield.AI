import React, { useState } from 'react';
import Navbar from '@/components/navbar';
import { GridBeams } from '@/components/magicui/grid-beams';

const LessonsPage = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [readTips, setReadTips] = useState(new Set());
  const [modalTipId, setModalTipId] = useState(null);

  const tips = [
    {
      id: 'fake-news',
      icon: '🕵️',
      title: 'How to Spot Fake News',
      preview: 'Learn to identify misinformation and teach your children critical thinking skills to navigate today\'s complex information landscape.',
      gradientFrom: 'from-purple-600',
      gradientTo: 'to-purple-800',
      iconBg: 'bg-gradient-to-br from-purple-600 to-purple-800',
      content: {
        warningSigns: [
          'Check the source - Is it from a reputable news organization?',
          'Look for emotional language designed to provoke strong reactions',
          'Verify with multiple sources before sharing',
          'Check the date - Old news can be recycled as current',
          'Be skeptical of sensational headlines',
          'Look for author credentials and contact information'
        ],
        teachChildren: [
          'Always ask "Who wrote this and why?"',
          'Use fact-checking websites like Snopes or PolitiFact',
          'Encourage them to pause before sharing',
          'Discuss current events together regularly'
        ],
        examples: [
          {
            headline: 'SHOCKING: Scientists Discover Drinking Hot Water Can Cure COVID-19 - Doctors Don\'t Want You to Know!',
            warning: 'Sensational language, medical misinformation, conspiracy claims, no credible source'
          },
          {
            headline: 'BREAKING: Video Shows Aliens Landing in Mumbai - Government Tries to Cover Up!',
            warning: 'Extraordinary claims, no verification, emotional clickbait, conspiracy theory'
          },
          {
            headline: 'URGENT: WhatsApp Will Start Charging ₹500/month from Tomorrow - Forward to Save Your Account!',
            warning: 'False urgency, chain message format, no official announcement, fear tactics'
          },
          {
            headline: 'This One Weird Trick Will Make You Rich Overnight - Banks Hate This Secret!',
            warning: 'Get rich quick promises, vague claims, clickbait format, too good to be true'
          }
        ]
      }
    },
    {
      id: 'whatsapp',
      icon: '💬',
      title: 'Avoiding Oversharing on WhatsApp',
      preview: 'Protect your family\'s privacy by understanding what information should stay private and how to use WhatsApp\'s security features effectively.',
      gradientFrom: 'from-purple-700',
      gradientTo: 'to-indigo-900',
      iconBg: 'bg-gradient-to-br from-purple-700 to-indigo-900',
      content: {
        privacySettings: [
          'Set "Last Seen" to "My Contacts" or "Nobody"',
          'Limit who can see your profile photo and status',
          'Turn off read receipts for privacy',
          'Review group privacy settings regularly',
          'Enable two-step verification',
          'Turn off location sharing by default'
        ],
        avoidSharing: [
          'Home addresses, school names, or work locations',
          'Travel plans or when you\'re away from home',
          'Financial information or personal documents',
          'Photos with identifiable background details',
          'Children\'s full names, ages, or schedules'
        ],
        examples: [
          {
            headline: 'URGENT: Your bank account will be CLOSED in 24 hours! Click this link immediately to verify: bit.ly/bank-verify-urgent',
            warning: 'Urgent language, suspicious shortened link, no official bank branding'
          },
          {
            headline: 'Congratulations! You\'ve WON ₹50,000 in our lucky draw! Send your Aadhaar & bank details to claim: +91-98765-XXXX',
            warning: 'Unexpected prize, asking for sensitive documents, unknown number'
          },
          {
            headline: 'Hi Mom, my phone is damaged. This is my new number. Please send ₹10,000 urgently for emergency. Don\'t call, just send money.',
            warning: 'Impersonation, money request, avoiding voice contact'
          }
        ]
      }
    },
    {
      id: 'screen-time',
      icon: '⏰',
      title: 'Healthy Screen Time Habits',
      preview: 'Establish balanced digital habits for your family with practical strategies for managing screen time without constant battles.',
      gradientFrom: 'from-purple-400',
      gradientTo: 'to-purple-600',
      iconBg: 'bg-gradient-to-br from-purple-400 to-purple-600',
      content: {
        ageGuidelines: [
          'Ages 2-5: Maximum 1 hour of high-quality content daily',
          'Ages 6+: Consistent limits that don\'t interfere with sleep/activities',
          'No screens during meals or before bedtime',
          'Create screen-free zones in bedrooms',
          'Encourage breaks every 30-60 minutes'
        ],
        healthyHabits: [
          'Model good screen behavior yourself',
          'Create a family media plan together',
          'Prioritize outdoor activities and face-to-face interaction',
          'Use parental controls and screen time apps',
          'Make bedrooms screen-free spaces',
          'Plan engaging offline activities'
        ]
      }
    }
  ];

  const toggleDetails = (tipId) => {
    if (modalTipId === tipId) {
      setModalTipId(null);
    } else {
      setModalTipId(tipId);
      setReadTips(prev => new Set([...prev, tipId]));
    }
  };

  const toggleBookmark = (tipId, title) => {
    if (bookmarks.some(b => b.id === tipId)) {
      setBookmarks(prev => prev.filter(b => b.id !== tipId));
    } else {
      setBookmarks(prev => [...prev, { id: tipId, title }]);
    }
  };

  const removeBookmark = (tipId) => {
    setBookmarks(prev => prev.filter(b => b.id !== tipId));
  };

  const isBookmarked = (tipId) => bookmarks.some(b => b.id === tipId);
  const isExpanded = (tipId) => modalTipId === tipId;

  const selectedTip = tips.find(tip => tip.id === modalTipId);

  return (
    <div className="min-h-screen bg-[#05081A] mb-20 sm:px-6 lg:px-8 relative">
      {/* GridBeams Background - Fixed positioning to cover entire screen */}
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto mt-20 relative z-10">
        {/* Header */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-xl p-8 mb-8 border border-purple-500/20">
          <h1 className="text-3xl sm:text-4xl font-bold text-white text-center mb-4">
            🛡️ Digital Awareness Tips for Parents
          </h1>
          <p className="text-lg sm:text-xl text-purple-200 text-center max-w-3xl mx-auto">
            Essential guidance to help your family navigate the digital world safely and responsibly
          </p>
        </div>

        {/* Stats Bar */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 mb-8 flex flex-wrap justify-center gap-8 sm:gap-12 border border-purple-500/20">
          <div className="text-center">
            <span className="block text-2xl sm:text-3xl font-bold text-white">{tips.length}</span>
            <span className="text-sm text-purple-300">Expert Tips</span>
          </div>
          <div className="text-center">
            <span className="block text-2xl sm:text-3xl font-bold text-white">{bookmarks.length}</span>
            <span className="text-sm text-purple-300">Bookmarked</span>
          </div>
          <div className="text-center">
            <span className="block text-2xl sm:text-3xl font-bold text-white">{readTips.size}</span>
            <span className="text-sm text-purple-300">Tips Read</span>
          </div>
        </div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
          {tips.map((tip) => (
            <div
              key={tip.id}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-lg p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-purple-500/30"
            >
              <div className={`w-12 h-12 ${tip.iconBg} rounded-lg flex items-center justify-center text-xl text-white mb-4`}>
                {tip.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">{tip.title}</h3>
              <p className="text-purple-200 text-sm sm:text-base mb-4">{tip.preview}</p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button
                  onClick={() => toggleDetails(tip.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg text-sm font-semibold hover:from-purple-700 hover:to-purple-900 transition-all duration-300"
                >
                  <span>📖</span>
                  {isExpanded(tip.id) ? 'Close' : 'Read More'}
                </button>
                <button
                  onClick={() => toggleBookmark(tip.id, tip.title)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    isBookmarked(tip.id)
                      ? 'bg-gradient-to-r from-purple-700 to-indigo-900 text-white'
                      : 'bg-gradient-to-r from-purple-400 to-purple-600 text-white'
                  }`}
                >
                  <span>{isBookmarked(tip.id) ? '⭐' : '🔖'}</span>
                  {isBookmarked(tip.id) ? 'Bookmarked' : 'Bookmark'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bookmarks Section */}
        <div className="mt-12 pt-6 border-t border-purple-500/30">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">📌 Your Bookmarked Tips</h2>
            <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {bookmarks.length}
            </span>
          </div>
          <div className="grid gap-4">
            {bookmarks.length === 0 ? (
              <div className="text-center text-purple-300 py-8 bg-slate-800/50 rounded-xl border border-dashed border-purple-500/30">
                <p>🔖 No bookmarks yet! Click the bookmark button on any tip to save it for later reference.</p>
              </div>
            ) : (
              bookmarks.map((bookmark) => (
                <div
                  key={bookmark.id}
                  className="bg-slate-800/50 p-4 sm:p-6 rounded-xl border-l-4 border-purple-600"
                >
                  <h4 className="text-purple-100 font-semibold mb-2">{bookmark.title}</h4>
                  <p className="text-purple-200 text-sm mb-3">Bookmarked tip - click "Read More" above to view full details</p>
                  <button
                    onClick={() => removeBookmark(bookmark.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-semibold hover:bg-purple-700 transition-colors"
                  >
                    <span>🗑️</span> Remove
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalTipId && selectedTip && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-2xl p-6 w-full max-w-lg sm:max-w-2xl mx-4 max-h-[80vh] overflow-y-auto border border-purple-500/30">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl sm:text-2xl font-semibold text-white">{selectedTip.title}</h3>
              <button
                onClick={() => toggleDetails(modalTipId)}
                className="text-purple-300 hover:text-purple-100 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            {selectedTip.id === 'fake-news' && (
              <>
                <h4 className="font-semibold text-purple-100 mb-3">Key Warning Signs:</h4>
                <ul className="space-y-2 mb-6">
                  {selectedTip.content.warningSigns.map((sign, index) => (
                    <li key={index} className="flex items-start text-purple-200 text-sm">
                      <span className="text-purple-400 font-bold mr-2 mt-0.5">✓</span>
                      {sign}
                    </li>
                  ))}
                </ul>
                <h4 className="font-semibold text-purple-100 mb-3">Teach Your Children:</h4>
                <ul className="space-y-2 mb-6">
                  {selectedTip.content.teachChildren.map((item, index) => (
                    <li key={index} className="flex items-start text-purple-200 text-sm">
                      <span className="text-purple-400 font-bold mr-2 mt-0.5">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <h4 className="font-semibold text-purple-100 mb-3">⚠️ Examples of Fake News Headlines:</h4>
                <div className="space-y-3">
                  {selectedTip.content.examples.map((example, index) => (
                    <div key={index} className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                      <div className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold mb-2">
                        ❌ FAKE NEWS EXAMPLE
                      </div>
                      <p className="italic text-purple-100 text-sm mb-2">&quot;{example.headline}&quot;</p>
                      <p className="text-xs text-red-300">🚨 Red flags: {example.warning}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {selectedTip.id === 'whatsapp' && (
              <>
                <h4 className="font-semibold text-purple-100 mb-3">Privacy Settings to Check:</h4>
                <ul className="space-y-2 mb-6">
                  {selectedTip.content.privacySettings.map((setting, index) => (
                    <li key={index} className="flex items-start text-purple-200 text-sm">
                      <span className="text-purple-400 font-bold mr-2 mt-0.5">✓</span>
                      {setting}
                    </li>
                  ))}
                </ul>
                <h4 className="font-semibold text-purple-100 mb-3">What NOT to Share:</h4>
                <ul className="space-y-2 mb-6">
                  {selectedTip.content.avoidSharing.map((item, index) => (
                    <li key={index} className="flex items-start text-purple-200 text-sm">
                      <span className="text-purple-400 font-bold mr-2 mt-0.5">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <h4 className="font-semibold text-purple-100 mb-3">⚠️ Common Fraud Messages:</h4>
                <div className="space-y-3">
                  {selectedTip.content.examples.map((example, index) => (
                    <div key={index} className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                      <div className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold mb-2">
                        ❌ FAKE MESSAGE EXAMPLE
                      </div>
                      <p className="italic text-purple-100 text-sm mb-2">&quot;{example.headline}&quot;</p>
                      <p className="text-xs text-red-300">🚨 Red flags: {example.warning}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {selectedTip.id === 'screen-time' && (
              <>
                <h4 className="font-semibold text-purple-100 mb-3">Age-Appropriate Guidelines:</h4>
                <ul className="space-y-2 mb-6">
                  {selectedTip.content.ageGuidelines.map((guideline, index) => (
                    <li key={index} className="flex items-start text-purple-200 text-sm">
                      <span className="text-purple-400 font-bold mr-2 mt-0.5">✓</span>
                      {guideline}
                    </li>
                  ))}
                </ul>
                <h4 className="font-semibold text-purple-100 mb-3">Healthy Habits to Build:</h4>
                <ul className="space-y-2">
                  {selectedTip.content.healthyHabits.map((habit, index) => (
                    <li key={index} className="flex items-start text-purple-200 text-sm">
                      <span className="text-purple-400 font-bold mr-2 mt-0.5">✓</span>
                      {habit}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonsPage;
