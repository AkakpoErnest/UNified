import React, { useState } from 'react';
import { AlertCircle, ExternalLink, Copy, CheckCircle, Zap } from 'lucide-react';

export const SetupGuide: React.FC = () => {
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  const copyToClipboard = (text: string, step: number) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(step);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  return (
    <div className="bg-gradient-to-br from-orange-500/10 via-red-500/10 to-pink-500/10 border border-orange-400/20 rounded-2xl p-6 backdrop-blur-xl shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-br from-orange-400 to-red-500 p-3 rounded-xl shadow-lg">
          <AlertCircle className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Circle Testnet Setup Required</h3>
          <p className="text-sm text-gray-300">Follow these steps to test real USDC gas payments</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Step 1 */}
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">1</div>
            <h4 className="text-white font-semibold">Get Circle Developer Account</h4>
          </div>
          <p className="text-gray-300 text-sm mb-3">
            Sign up for Circle's developer platform to access testnet APIs
          </p>
          <a
            href="https://developers.circle.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium"
          >
            <ExternalLink className="w-4 h-4" />
            Circle Developer Portal
          </a>
        </div>

        {/* Step 2 */}
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">2</div>
            <h4 className="text-white font-semibold">Get Testnet USDC</h4>
          </div>
          <p className="text-gray-300 text-sm mb-3">
            Get testnet USDC from Circle's faucet for testing
          </p>
          <div className="space-y-2">
            <a
              href="https://faucet.circle.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 text-sm font-medium"
            >
              <ExternalLink className="w-4 h-4" />
              Circle USDC Faucet
            </a>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">3</div>
            <h4 className="text-white font-semibold">Switch to Testnet</h4>
          </div>
          <p className="text-gray-300 text-sm mb-3">
            Add these testnet networks to your wallet:
          </p>
          <div className="space-y-2">
            {[
              { name: 'Ethereum Sepolia', chainId: '0xaa36a7', rpc: 'https://sepolia.infura.io/v3/' },
              { name: 'Base Sepolia', chainId: '0x14a34', rpc: 'https://sepolia.base.org' },
              { name: 'Arbitrum Sepolia', chainId: '0x66eee', rpc: 'https://sepolia-rollup.arbitrum.io/rpc' }
            ].map((network, index) => (
              <div key={network.name} className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                <div>
                  <div className="text-white font-medium text-sm">{network.name}</div>
                  <div className="text-gray-400 text-xs">Chain ID: {network.chainId}</div>
                </div>
                <button
                  onClick={() => copyToClipboard(network.rpc, index)}
                  className="text-purple-400 hover:text-purple-300 p-1"
                  title="Copy RPC URL"
                >
                  {copiedStep === index ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Step 4 */}
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-cyan-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">4</div>
            <h4 className="text-white font-semibold">Test Transactions</h4>
          </div>
          <p className="text-gray-300 text-sm mb-3">
            Once you have testnet USDC, you can test gas-free transactions!
          </p>
          <div className="flex items-center gap-2 text-cyan-400 text-sm">
            <Zap className="w-4 h-4" />
            <span>All gas fees will be paid automatically in USDC</span>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-400/30 rounded-xl">
        <div className="flex items-center gap-2 text-yellow-400 text-sm font-medium mb-2">
          <AlertCircle className="w-4 h-4" />
          Important Notes
        </div>
        <ul className="text-gray-300 text-sm space-y-1">
          <li>• This is testnet - no real money involved</li>
          <li>• You need testnet USDC in your wallet for gas payments</li>
          <li>• Switch your wallet to one of the supported testnets</li>
          <li>• Circle Paymaster handles the gas conversion automatically</li>
        </ul>
      </div>
    </div>
  );
};