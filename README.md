# UNified Gas - Making Web3 Life Easy

![UNified Gas Logo](https://img.shields.io/badge/UNified-Gas-blue?style=for-the-badge&logo=ethereum)

**One Token. All Chains. Zero Friction.**

UNified Gas is a revolutionary Web3 application that simplifies blockchain transactions by enabling users to pay all gas fees with USDC across multiple networks. Powered by Circle's innovative Paymaster technology, it eliminates the need to hold native tokens for each blockchain.

## 🚀 Features

### ⚡ Universal Gas Payments
- Pay all transaction fees with USDC only
- No need to hold ETH, MATIC, AVAX, or other native tokens
- Seamless cross-chain experience

### 🌐 Multi-Chain Support
- **Ethereum Sepolia** (Testnet)
- **Base Sepolia** (Testnet)  
- **Arbitrum Sepolia** (Testnet)
- More networks coming soon!

### 🔒 Enterprise Security
- Powered by Circle's enterprise-grade infrastructure
- Non-custodial wallet integration
- Secure smart contract interactions

### 💫 User Experience
- Beautiful, production-ready interface
- Real-time transaction tracking
- Intuitive wallet management
- Responsive design for all devices

## 🛠 Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Blockchain**: Ethers.js v6
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Paymaster**: Circle Paymaster API

## 🏗 Architecture

This is a **frontend-only application** that interacts with existing blockchain infrastructure:

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   React App     │───▶│  Circle Paymaster │───▶│   Blockchain    │
│   (Frontend)    │    │   (Gas Sponsor)   │    │   Networks      │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

- **No smart contracts deployed** - Uses existing USDC contracts and Circle's paymaster
- **No backend required** - Direct blockchain interaction through RPC endpoints
- **Testnet focused** - Safe testing environment with no real funds

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MetaMask or compatible Web3 wallet
- Testnet USDC (from Circle faucet)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/unified-gas.git
   cd unified-gas
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 🧪 Testing Setup

### Step 1: Get Circle Developer Account
1. Visit [Circle Developer Portal](https://developers.circle.com/)
2. Sign up for a free developer account
3. Access testnet APIs and documentation

### Step 2: Add Testnet Networks
Add these networks to your wallet:

| Network | Chain ID | RPC URL |
|---------|----------|---------|
| Ethereum Sepolia | `0xaa36a7` | `https://sepolia.infura.io/v3/` |
| Base Sepolia | `0x14a34` | `https://sepolia.base.org` |
| Arbitrum Sepolia | `0x66eee` | `https://sepolia-rollup.arbitrum.io/rpc` |

### Step 3: Get Testnet USDC
1. Visit [Circle USDC Faucet](https://faucet.circle.com/)
2. Connect your wallet
3. Request testnet USDC for supported networks

### Step 4: Test Transactions
1. Connect your wallet to the app
2. Switch to a supported testnet
3. Send tokens or perform swaps
4. Watch gas fees get paid automatically in USDC!

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── WalletConnection.tsx
│   ├── ChainSelector.tsx
│   ├── TransactionInterface.tsx
│   ├── USDCBalance.tsx
│   └── ...
├── hooks/              # Custom React hooks
│   ├── useWallet.ts
│   ├── useUSDCBalance.ts
│   └── useCirclePaymaster.ts
├── config/             # Configuration files
│   ├── chains.ts
│   └── circle.ts
├── types/              # TypeScript definitions
├── utils/              # Utility functions
└── App.tsx            # Main application component
```

## 🔧 Configuration

### Supported Networks
Networks are configured in `src/config/chains.ts`:

```typescript
export const supportedChains: Chain[] = [
  {
    id: 11155111,
    name: 'Ethereum Sepolia',
    usdcAddress: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238',
    // ... other config
  }
  // ... more chains
];
```

### Circle Integration
Circle Paymaster configuration in `src/config/circle.ts`:

```typescript
export const CIRCLE_CONFIG = {
  API_BASE_URL: 'https://api-sandbox.circle.com',
  PAYMASTER_URL: 'https://paymaster-sandbox.circle.com',
  // ... other config
};
```

## 🎯 How It Works

1. **User initiates transaction** (send tokens, swap, etc.)
2. **App estimates gas costs** using network RPC
3. **Circle Paymaster sponsors gas** using user's USDC
4. **Transaction executes** with USDC deducted for gas
5. **User receives confirmation** with transaction details

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly on testnets
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Live Demo**: [https://unified-gas.netlify.app](https://unified-gas.netlify.app)
- **Circle Docs**: [https://developers.circle.com](https://developers.circle.com)
- **USDC Faucet**: [https://faucet.circle.com](https://faucet.circle.com)
- **DoraHacks**: [https://dorahacks.io](https://dorahacks.io)

## 🏆 Hackathon

Built for **DoraHacks 2025** - Making Web3 accessible to everyone through innovative gas payment solutions.

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/unified-gas/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/unified-gas/discussions)
- **Email**: support@unified-gas.com

---

**Making Web3 Life Easy - One Transaction at a Time** ⚡

![Built with Love](https://img.shields.io/badge/Built%20with-❤️-red)
![Powered by Circle](https://img.shields.io/badge/Powered%20by-Circle-blue)
![Web3](https://img.shields.io/badge/Web3-Ready-green)