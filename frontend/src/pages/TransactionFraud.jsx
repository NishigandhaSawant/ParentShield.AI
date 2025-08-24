import React, { useState } from "react";
import { GridBeams } from "@/components/magicui/grid-beams";
import Navbar from "@/components/navbar";

function TransactionFraud() {
  const [formData, setFormData] = useState({
    transaction_type: "PAYMENT",
    amount: "",
    current_balance: "",
  });
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transaction_type: formData.transaction_type,
          amount: parseFloat(formData.amount),
          current_balance: parseFloat(formData.current_balance),
        }),
      });
      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error("Error fetching prediction:", error);
      setResult({ error: "Failed to analyze transaction. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case "PAYMENT": return "💳";
      case "TRANSFER": return "🔄";
      case "CASH_OUT": return "💸";
      case "DEPOSIT": return "💰";
      default: return "💳";
    }
  };

  const getRiskLevel = (score) => {
    if (score >= 80) return { level: "CRITICAL", color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20" };
    if (score >= 60) return { level: "HIGH", color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20" };
    if (score >= 40) return { level: "MEDIUM", color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20" };
    if (score >= 20) return { level: "LOW", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" };
    return { level: "MINIMAL", color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20" };
  };

  return (
    <div className="min-h-screen bg-[#020412] text-white relative overflow-hidden">
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

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-full mb-4">
              <span className="text-3xl">🔐</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
              Transaction Fraud Detection
            </h1>
            <p className="text-white/60">Analyze transactions for potential fraud using advanced ML algorithms</p>
          </div>

          {/* Form Card */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 mb-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Transaction Type */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white/90">
                    Transaction Type
                  </label>
                  <div className="relative">
                    <select
                      name="transaction_type"
                      value={formData.transaction_type}
                      onChange={handleChange}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                    >
                      <option value="PAYMENT" className="bg-gray-800">💳 PAYMENT</option>
                      <option value="TRANSFER" className="bg-gray-800">🔄 TRANSFER</option>
                      <option value="CASH_OUT" className="bg-gray-800">💸 CASH_OUT</option>
                      <option value="DEPOSIT" className="bg-gray-800">💰 DEPOSIT</option>
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Amount */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white/90">
                    Transaction Amount (₹)
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60">₹</div>
                    <input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      className="w-full bg-white/10 border border-white/20 rounded-lg pl-8 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Current Balance */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/90">
                  Current Account Balance (₹)
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60">₹</div>
                  <input
                    type="number"
                    name="current_balance"
                    value={formData.current_balance}
                    onChange={handleChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg pl-8 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <span>🔍</span>
                    <span>Analyze Transaction</span>
                  </>
                )}
              </button>
              </form>
            </div>
          </div>

          {/* Results Card */}
          {result && (
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 animate-in slide-in-from-bottom duration-500">
              {result.error ? (
                <div className="text-center">
                  <div className="text-6xl mb-4">⚠️</div>
                  <h3 className="text-xl font-semibold text-red-400 mb-2">Analysis Failed</h3>
                  <p className="text-white/60">{result.error}</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Header */}
                  <div className="text-center">
                    <div className="text-6xl mb-4">
                      {result.fraud ? "🚨" : "🍀"}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">
                      {result.fraud ? "Fraud Detected" : "Transaction Approved"}
                    </h3>
                    <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${getRiskLevel(result.risk_score).bg} ${getRiskLevel(result.risk_score).border} ${getRiskLevel(result.risk_score).color} border`}>
                      Risk Level: {getRiskLevel(result.risk_score).level}
                    </div>
                  </div>

                  {/* Risk Score */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Risk Score</span>
                      <span className={`text-xl font-bold ${getRiskLevel(result.risk_score).color}`}>
                        {result.risk_score}%
                      </span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-1000 ease-out ${
                          result.risk_score >= 80 ? 'bg-red-500' :
                          result.risk_score >= 60 ? 'bg-orange-500' :
                          result.risk_score >= 40 ? 'bg-yellow-500' :
                          result.risk_score >= 20 ? 'bg-blue-500' :
                          'bg-green-500'
                        }`}
                        style={{ width: `${result.risk_score}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Transaction Summary */}
                  <div className="bg-white/5 rounded-lg p-4 space-y-3">
                    <h4 className="font-semibold text-white/90 mb-3">Transaction Summary</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">{getTransactionIcon(formData.transaction_type)}</span>
                        <div>
                          <div className="text-white/60">Type</div>
                          <div className="font-medium">{formData.transaction_type}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">💵</span>
                        <div>
                          <div className="text-white/60">Amount</div>
                          <div className="font-medium">${parseFloat(formData.amount).toLocaleString()}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">🏦</span>
                        <div>
                          <div className="text-white/60">Balance</div>
                          <div className="font-medium">${parseFloat(formData.current_balance).toLocaleString()}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recommendation */}
                  <div className={`p-4 rounded-lg border ${getRiskLevel(result.risk_score).bg} ${getRiskLevel(result.risk_score).border}`}>
                    <h4 className="font-semibold mb-2">Recommendation</h4>
                    <p className="text-sm text-white/80">
                      {result.fraud 
                        ? "This transaction shows signs of potential fraud. We recommend additional verification before processing."
                        : "This transaction appears legitimate and can be processed safely."
                      }
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
  );
}

export default TransactionFraud;