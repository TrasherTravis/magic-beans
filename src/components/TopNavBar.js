import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Navbar } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import WalletConnect from '@walletconnect/web3-provider';
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';

export const providerOptions = {
  walletlink: {
    package: CoinbaseWalletSDK, // Required
    options: {
      appName: 'Web 3 Modal Demo', // Required
      infuraId: process.env.INFURA_KEY, // Required unless you provide a JSON RPC url; see `rpc` below
    },
  },
  walletconnect: {
    package: WalletConnect, // required
    options: {
      infuraId: 'https://bsc-dataseed.binance.org/', // required
    },
  },
};

const web3Modal = new Web3Modal({
  cacheProvider: true, // optional
  providerOptions, // required
});

export const TopNavBar = ({ logo, connectButtonLogo, getAllData } ) => {
  const [provider, setProvider] = useState();
  const [account, setAccount] = useState();
  const [error, setError] = useState('');
  const [chainId, setChainId] = useState();
  const [network, setNetwork] = useState();
  const [message, setMessage] = useState('');
  const [signedMessage, setSignedMessage] = useState('');
  const [verified, setVerified] = useState();

  const connectWallet = async () => {
    // WEB3_CONNECT_CACHED_PROVIDER "injected"
    // localStorage.setItem('WEB3_CONNECT_CACHED_PROVIDER', 'injected');
    // localStorage.setItem('WEB3_CONNECT_CACHED_PROVIDER', '"injected"');
    if (web3Modal.cachedProvider) {
      // localStorage.setItem('WEB3_CONNECT_CACHED_PROVIDER', '"injected"');
      await web3Modal.connect();
    }
    try {
      // localStorage.setItem('WEB3_CONNECT_CACHED_PROVIDER', '"injected"');
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      const accounts = await library.listAccounts();
      const network = await library.getNetwork();
      setProvider(provider);
      if (accounts) setAccount(accounts[0]);
      setChainId(network.chainId);
      getAllData();
      if(network.chainId !== 43113 && network.chainId !== 43114) return toast.error('Please select Avalanche Mainnet');
    } catch (error) {
      console.log('err', error);
      setError(error);
    }
  };

  const refreshState = () => {
    setAccount();
    setChainId();
    setNetwork('');
    setMessage('');
    setVerified(undefined);
  };

  const disconnect = async () => {
    // await web3Modal.clearCachedProvider();
    refreshState();
  };

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        console.log('accountsChanged', accounts);
        if (accounts) {
          setAccount(accounts[0]);
          getAllData();
        };
      };

      const handleChainChanged = (_hexChainId) => {
        setChainId(_hexChainId);
        console.log(parseInt(_hexChainId, 16));
        if(parseInt(_hexChainId, 16) !== 43113 && parseInt(_hexChainId, 16) !== 43114) return toast.error('Please select Avalanche Mainnet');
        getAllData();
      };

      const handleDisconnect = () => {
        console.log('disconnect', error);
        disconnect();
      };

      provider.on('accountsChanged', handleAccountsChanged);
      provider.on('chainChanged', handleChainChanged);
      provider.on('disconnect', handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener('accountsChanged', handleAccountsChanged);
          provider.removeListener('chainChanged', handleChainChanged);
          provider.removeListener('disconnect', handleDisconnect);
        }
      };
    }
  }, [provider]);

  return (
    <Row className='nav-row align-items-center'>
      <Col sm={12}>
        <Navbar sticky='top'>
          <Container>
            <Navbar.Brand href='#home'>
              <img
                src={logo}
                width='80'
                className='d-inline-block align-top'
                alt='React Bootstrap logo'
              />
            </Navbar.Brand>
            <Button
              className='ms-auto d-flex flex-row align-items-center connect-button btn-effect btn-animated'
              variant='primary'
            >
              <img
                className='me-2'
                src={connectButtonLogo}
                width='20px'
                alt='connectButtonLogo'
              />
              Get Seed
            </Button>
            {!account ? (
              <Button
                className='ms-2 connect-button btn-effect btn-animated'
                variant='primary'
                onClick={() => connectWallet()}
              >
                Connect Wallet
              </Button>
            ) : (
              <Button
                className='ms-2 connect-button btn-effect btn-animated'
                variant='primary'
                onClick={disconnect}
              >
                {account.slice(0,2) + '...' + account.slice(39,42)} Disconnect
              </Button>
            )}
          </Container>
        </Navbar>
      </Col>
    </Row>
  );
};
