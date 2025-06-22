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
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${targetChainId.toString(16)}` }],
      });
      
      // Update local state immediately
      setWallet(prev => ({ ...prev, chainId: targetChainId }));
    } catch (error: any) {
      console.error('Failed to switch chain:', error);
      
      if (error.code === 4902) {
        // Chain not added to wallet - you could add chain addition logic here
        alert(`Please add chain ${targetChainId} to your wallet manually`);
      } else if (error.code === 4001) {
        // User rejected the request
        console.log('User rejected chain switch');
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