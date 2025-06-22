import React from 'react';
import { Zap, Shield, Sparkles, Globe, Clock, DollarSign } from 'lucide-react';

export const GasFeatureCard: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-emerald-500/10 via-blue-500/10 to-purple-500/10 border border-emerald-400/20 rounded-2xl p-6 backdrop-blur-xl shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-br from-emerald-400 to-cyan-500 p-3 rounded-xl shadow-lg">
          <Zap className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">UNified Gas Engine</h3>
          <p className="text-sm text-gray-300">Powered by Circle Paymaster</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-3 text-sm text-gray-300 p-3 bg-white/5 rounded-xl">
          <Shield className="w-5 h-5 text-blue-400 flex-shrink-0" />
          <span>Enterprise-grade security & reliability</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-300 p-3 bg-white/5 rounded-xl">
          <DollarSign className="w-5 h-5 text-green-400 flex-shrink-0" />
          <span>Pay all gas fees with USDC only</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-300 p-3 bg-white/5 rounded-xl">
          <Globe className="w-5 h-5 text-purple-400 flex-shrink-0" />
          <span>Universal cross-chain compatibility</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-300 p-3 bg-white/5 rounded-xl">
          <Clock className="w-5 h-5 text-orange-400 flex-shrink-0" />
          <span>Instant transaction processing</span>
        </div>
      </div>

      <div className="bg-gradient-to-r from-white/5 to-white/10 rounded-xl p-4 border border-white/10">
        <div className="text-xs text-gray-400 mb-3 font-semibold uppercase tracking-wider">Supported Networks</div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { name: 'Ethereum', icon: '🔷', color: 'from-blue-400 to-blue-600' },
            { name: 'Base', icon: '🔶', color: 'from-blue-500 to-cyan-500' },
            { name: 'Arbitrum', icon: '🔵', color: 'from-blue-600 to-indigo-600' },
            { name: 'Optimism', icon: '🔴', color: 'from-red-500 to-pink-500' },
            { name: 'Polygon', icon: '🟣', color: 'from-purple-500 to-violet-500' },
            { name: 'Avalanche', icon: '❄️', color: 'from-red-400 to-orange-400' },
            { name: 'Unichain', icon: '🦄', color: 'from-pink-500 to-purple-500' }
          ].map((network, index) => (
            <div key={network.name} className={`text-xs bg-gradient-to-r ${network.color} bg-opacity-20 px-3 py-2 rounded-lg flex items-center gap-2 border border-white/10`}>
              <span className="text-sm">{network.icon}</span>
              <span className="text-white font-medium">{network.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};