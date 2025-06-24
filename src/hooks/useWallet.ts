import { useState, useEffect } from 'react';
import { BrowserProvider, ethers } from 'ethers';

interface WalletState {
  account: string | null;
  chainId: number | null;
  balance: string;
  provider: BrowserProvider | null;
  isConnecting: boolean;
}

export const useWallet = () => {
  const [wallet, setWallet] = useState<WalletState>({
    account: null,
    chainId: null,
    balance: '0',
    provider: null,
    isConnecting: false
  });

  // Check for existing connection on mount
  useEffect(() => {
    const checkConnection = async () => {
      if (!window.ethereum) return;

      try {
        const provider = new BrowserProvider(window.ethereum);
        const accounts = await provider.listAccounts();
        
        if (accounts.length > 0) {
          const network = await provider.getNetwork();
          const balance = await provider.getBalance(accounts[0].address);

          setWallet({
            account: accounts[0].address,
            chainId: Number(network.chainId),
            balance: ethers.formatEther(balance),
            provider,
            isConnecting: false
          });
        }
      } catch (error) {
        console.error('Failed to check existing connection:', error);
      }
    };

    checkConnection();
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask or another Web3 wallet');
      return;
    }

    setWallet(prev => ({ ...prev, isConnecting: true }));

    try {
      const provider = new BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      const network = await provider.getNetwork();
      const balance = await provider.getBalance(accounts[0]);

      setWallet({
        account: accounts[0],
        chainId: Number(network.chainId),
        balance: ethers.formatEther(balance),
        provider,
        isConnecting: false
      });
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      setWallet(prev => ({ ...prev, isConnecting: false }));
    }
  };

  const switchChain = async (targetChainId: number) => {
    if (!window.ethereum) {
      console.error('No wallet detected');
      return;
    }

    try {
      // First try to switch to the chain
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${targetChainId.toString(16)}` }],
      });
      
      // Update local state after successful switch
      const provider = new BrowserProvider(window.ethereum);
      const network = await provider.getNetwork();
      setWallet(prev => ({ ...prev, chainId: Number(network.chainId) }));
      
    } catch (error: any) {
      console.error('Failed to switch chain:', error);
      
      if (error.code === 4902) {
        // Chain not added to wallet - try to add it
        try {
          const chainConfigs: Record<number, any> = {
            11155111: {
              chainId: '0xaa36a7',
              chainName: 'Ethereum Sepolia',
              nativeCurrency: {
                name: 'Ethereum',
                symbol: 'ETH',
                decimals: 18,
              },
              rpcUrls: ['https://sepolia.infura.io/v3/'],
              blockExplorerUrls: ['https://sepolia.etherscan.io'],
            },
            84532: {
              chainId: '0x14a34',
              chainName: 'Base Sepolia',
              nativeCurrency: {
                name: 'Ethereum',
                symbol: 'ETH',
                decimals: 18,
              },
              rpcUrls: ['https://sepolia.base.org'],
              blockExplorerUrls: ['https://sepolia.basescan.org'],
            },
            421614: {
              chainId: '0x66eee',
              chainName: 'Arbitrum Sepolia',
              nativeCurrency: {
                name: 'Ethereum',
                symbol: 'ETH',
                decimals: 18,
              },
              rpcUrls: ['https://sepolia-rollup.arbitrum.io/rpc'],
              blockExplorerUrls: ['https://sepolia.arbiscan.io'],
            },
          };

          const chainConfig = chainConfigs[targetChainId];
          if (chainConfig) {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [chainConfig],
            });
            
            // Try to switch again after adding
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: chainConfig.chainId }],
            });
            
            // Update local state
            const provider = new BrowserProvider(window.ethereum);
            const network = await provider.getNetwork();
            setWallet(prev => ({ ...prev, chainId: Number(network.chainId) }));
          }
        } catch (addError) {
          console.error('Failed to add chain:', addError);
          alert(`Failed to add chain ${targetChainId} to your wallet. Please add it manually.`);
        }
      } else if (error.code === 4001) {
        // User rejected the request
        console.log('User rejected chain switch');
      } else {
        alert(`Failed to switch to chain ${targetChainId}. Please try again.`);
      }
    }
  };

  const disconnectWallet = () => {
    setWallet({
      account: null,
      chainId: null,
      balance: '0',
      provider: null,
      isConnecting: false
    });
  };

  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          setWallet(prev => ({ ...prev, account: accounts[0] }));
        }
      };

      const handleChainChanged = (chainId: string) => {
        const newChainId = parseInt(chainId, 16);
        setWallet(prev => ({ ...prev, chainId: newChainId }));
        // Refresh the page to ensure clean state
        window.location.reload();
      };

      const handleDisconnect = () => {
        disconnectWallet();
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
      window.ethereum.on('disconnect', handleDisconnect);

      return () => {
        if (window.ethereum.removeListener) {
          window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
          window.ethereum.removeListener('chainChanged', handleChainChanged);
          window.ethereum.removeListener('disconnect', handleDisconnect);
        }
      };
    }
  }, []);

  const isConnected = !!wallet.account;

  return {
    ...wallet,
    isConnected,
    connectWallet,
    switchChain,
    disconnectWallet
  };
};