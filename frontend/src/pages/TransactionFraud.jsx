import React, { useState } from "react";
import { GridBeams } from '@/components/magicui/grid-beams';
import Navbar from '@/components/navbar';

const TransactionFraud = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedFile) {
      alert("Please select an image first");
      return;
    }

    setIsLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const res = await fetch("http://localhost:8000/predict", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error("Error:", error);
      setResult({
        error: "Failed to analyze transaction. Please try again.",
        errorDetails: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedFile(null);
    setResult(null);
    setPreviewUrl(null);
  };

  const getFraudStatus = () => {
    if (!result?.fraud_analysis) return null;
    
    const prediction = result.fraud_analysis.verdict;
    if (prediction === "legitimate") {
      return { status: "safe", color: "green", icon: "✅" };
    } else {
      return { status: "fraud", color: "red", icon: "⚠️" };
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#020412' }}>
      {/* Grid Beams Background */}
      <div className="fixed inset-0 z-0">
        <GridBeams
          gridSize={60}
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
      <div className="relative z-10">
        {/* Header */}
        <header className="text-center py-12 px-4 sm:py-16 lg:py-20">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-white">
              Transaction Fraud
              <br />
              <span className="text-[#BDA7FF]">
                Detector
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Advanced AI-powered detection system to identify fraudulent transactions from screenshots
            </p>
          </div>
        </header>

        {/* Upload Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-6 sm:p-8 mb-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="file-upload"
                  className="block text-sm font-medium text-gray-200 mb-2"
                >
                  Upload Transaction Screenshot
                </label>
                <div className="border-2 border-dashed border-white/30 rounded-xl p-8 text-center hover:border-[#BDA7FF] transition-colors duration-200 bg-white/5 hover:bg-white/10 cursor-pointer">
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <div className="relative mb-6">
                      <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl"></div>
                      <svg
                        className="relative w-16 h-16 text-[#BDA7FF]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                    </div>
                    <span className="text-white font-medium text-lg mb-2">
                      Drag & drop your transaction screenshot here
                    </span>
                    <span className="text-gray-400 text-sm mb-6">
                      or click to browse
                    </span>
                    <div className="inline-flex items-center justify-center px-6 py-3 bg-[#BDA7FF] rounded-2xl transition-all duration-200 hover:bg-[#A890E8] transform hover:scale-105">
                      <svg className="w-5 h-5 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <span className="text-white font-medium">Choose File</span>
                    </div>
                  </label>
                </div>

                {selectedFile && (
                  <div className="mt-4 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <svg
                          className="w-8 h-8 text-green-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <div>
                          <p className="text-white font-medium">
                            {selectedFile.name}
                          </p>
                          <p className="text-gray-400 text-sm">
                            {(selectedFile.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedFile(null);
                          setPreviewUrl(null);
                        }}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}

                {previewUrl && (
                  <div className="mt-4">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="max-w-full h-auto rounded-lg shadow-lg border-2 border-white/20"
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={!selectedFile || isLoading}
                  className="flex-1 px-8 py-3 bg-[#BDA7FF] text-white font-semibold rounded-lg shadow-md hover:bg-[#A890E8] focus:outline-none focus:ring-2 focus:ring-[#BDA7FF] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Analyzing...
                    </span>
                  ) : (
                    "Analyze Transaction"
                  )}
                </button>

                {result && (
                  <button
                    type="button"
                    onClick={resetForm}
                    disabled={isLoading}
                    className="px-8 py-3 bg-white/20 text-white font-semibold rounded-lg shadow-md hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    Reset
                  </button>
                )}
              </div>
            </form>
          </div>

          {isLoading && (
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-8 text-center">
              <div className="flex flex-col items-center">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-blue-400/10 rounded-full blur-lg"></div>
                  <div className="relative animate-spin rounded-full h-16 w-16 border-b-2 border-[#BDA7FF]"></div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Analyzing Screenshot...
                </h3>
                <p className="text-gray-300">AI is processing your image for fraud detection</p>
              </div>
            </div>
          )}

          {result && result.error && (
            <div className="bg-red-500/20 backdrop-blur-md border border-red-500/30 text-white p-6 rounded-xl flex items-center gap-4 mb-8">
              <svg
                className="w-6 h-6 text-red-400 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h3 className="text-lg font-semibold mb-1">Analysis Failed</h3>
                <p className="text-red-100">{result.error}</p>
                {result.errorDetails && (
                  <p className="text-red-200 text-sm mt-2 font-mono bg-red-900/30 p-2 rounded">
                    {result.errorDetails}
                  </p>
                )}
              </div>
            </div>
          )}

          {result && result.fraud_analysis && (
            <>
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-6 sm:p-8 mb-6">
                <div className="mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative flex items-center justify-center py-6">
                      <div className="relative">
                        {getFraudStatus()?.status === "fraud" && (
                          <div className="absolute inset-0 bg-red-400/30 rounded-full blur-2xl"></div>
                        )}
                        {getFraudStatus()?.status === "safe" && (
                          <div className="absolute inset-0 bg-green-400/30 rounded-full blur-2xl"></div>
                        )}
                        <div
                          className={`relative text-6xl ${
                            getFraudStatus()?.status === "fraud"
                              ? "text-red-400"
                              : "text-green-400"
                          }`}
                        >
                          {getFraudStatus()?.icon}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center mb-6">
                    <h2
                      className={`text-3xl font-bold mb-2 ${
                        getFraudStatus()?.status === "fraud"
                          ? "text-red-400"
                          : "text-green-400"
                      }`}
                    >
                      {getFraudStatus()?.status === "fraud"
                        ? "🚨 FRAUDULENT TRANSACTION DETECTED"
                        : "✅ TRANSACTION APPEARS SAFE"}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                      <div className="text-gray-400 text-sm mb-1">Prediction</div>
                      <div className="text-white text-lg font-semibold capitalize">
                        {result.fraud_analysis.verdict}
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                      <div className="text-gray-400 text-sm mb-1">Detection Method</div>
                      <div className="text-white text-lg font-semibold">
                        ML Model
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                  <div className="bg-black/30 border-l-4 border-blue-400 rounded-r-lg p-4">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Explanation
                    </h3>
                    <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                      {result.fraud_analysis.reasoning}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-6 sm:p-8 mb-6">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Transaction Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                    <div className="text-gray-400 text-sm mb-1">Amount</div>
                    <div className="text-white text-xl font-bold">
                      {result.transaction_details.amount ? `₹${result.transaction_details.amount.toFixed(2)}` : 'Not detected'}
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                    <div className="text-gray-400 text-sm mb-1">Type</div>
                    <div className="text-white text-lg font-semibold capitalize">
                      {result.transaction_details.transaction_type || 'Not detected'}
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                    <div className="text-gray-400 text-sm mb-1">UPI ID</div>
                    <div className="text-white text-lg font-mono break-all">
                      {result.transaction_details.upi_id || 'Not detected'}
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                    <div className="text-gray-400 text-sm mb-1">Recipient</div>
                    <div className="text-white text-lg font-semibold">
                      {result.transaction_details.recipient || 'Not detected'}
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                    <div className="text-gray-400 text-sm mb-1">
                      Transaction ID
                    </div>
                    <div className="text-white text-sm font-mono break-all">
                      {result.transaction_details.transaction_id || 'Not detected'}
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                    <div className="text-gray-400 text-sm mb-1">Account</div>
                    <div className="text-white text-sm font-mono">
                      {result.transaction_details.account_number || 'Not detected'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-6 sm:p-8">
                <h3 className="text-2xl font-bold text-white mb-4">
                  🔍 Extracted Text Analysis
                </h3>

                <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                  <div className="bg-black/30 border-l-4 border-blue-400 rounded-r-lg p-4">
                    <pre className="whitespace-pre-wrap font-mono text-sm text-gray-300 overflow-x-auto">
                      {result.extracted_text || 'No text found in the image'}
                    </pre>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionFraud;