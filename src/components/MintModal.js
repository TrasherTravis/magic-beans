import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Web3Modal from 'web3modal';
import Web3 from 'web3'
import { ethers } from 'ethers';
import { toast } from 'react-toastify';

import { providerOptions } from '../components/TopNavBar'
import KING_ABI from '../abi/KING_ABI.json';
import { KING_CONTRACT } from '../data/contracts';

export const MintModal = (props) => {

  const [name, setName] = useState('');
  const [value, setValue] = useState('');

  const mint = async () => {
    if(name.length < 4) return toast.error('Name must have minimum 4 characters');
    if(value < 42000) return toast.error('Minimum 42000 SEED required to Mint Bean');
    const web3Modal = new Web3Modal({
      cacheProvider: true, // optional
      providerOptions, // required
    });
    const provider = await web3Modal.connect();
    const web3 = new Web3(provider);

    const library = new ethers.providers.Web3Provider(provider);
    const accounts = await library.listAccounts();

    const KING = new web3.eth.Contract(KING_ABI, KING_CONTRACT);
    console.log(`${value.toString()}000000000000000000`)
    KING.methods.createKingWithTokens(name, `${value.toString()}000000000000000000`).send({
      from: accounts[0],
    })
    .on('transactionHash', (hash) => {
      console.log(hash);
    })
    .on('receipt', (receipt) => {
      console.log(receipt);
      toast.success('Your Minted a New Bean Successfully');

    })
    .on('confirmation', (confirmationNumber, receipt) => {
      console.log(confirmationNumber, receipt);
    })
    .on('error', (error) => {
      toast.error('Transaction Failed');
      console.log(error);
    })
  }

  return (
    <Modal
      {...props}
      size='md'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton closeVariant='white'>
        <Modal.Title id='contained-modal-title-vcenter'>Mint Seeds</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className='mb-3' controlId='nameCtrl'>
          {/* <Form.Label>Name</Form.Label> */}
          <Form.Control type='text' placeholder='Name' name='name' value={name} onChange={(e) => setName(e.target.value)}/>
          <Form.Text className='text-muted'>
            Your name should be between 4 and 31 characters.
          </Form.Text>
        </Form.Group>
        <Form.Group className='mb-3' controlId='seedCtrl'>
          {/* <Form.Label>SEED Amount</Form.Label> */}
          <Form.Control type='text' placeholder='SEED Amount' name='value' value={value} onChange={(e) => setValue(e.target.value)}/>
          <Form.Text className='text-muted'>Min: 42,000 SEED.</Form.Text>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary' onClick={props.onHide}>
          CLOSE
        </Button>
        <Button variant='primary' onClick={() => mint()}>
          MINT
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
