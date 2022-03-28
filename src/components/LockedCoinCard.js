import { useState, useRef } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { useSpring, animated } from 'react-spring';
import Countdown, { zeroPad } from 'react-countdown';
import Web3Modal from 'web3modal';
import Web3 from 'web3'
import { ethers } from 'ethers';
import { toast } from 'react-toastify';

import { providerOptions } from './TopNavBar';
import KING_ABI from '../abi/KING_ABI.json';
import { KING_CONTRACT } from '../data/contracts';

const calc = (x, y, rect) => [
  (y - rect.top - rect.height / 2) / 20,
  -(x - rect.left - rect.width / 2) / 20,
  1,
];
const trans = (x, y, s) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

export const LockedCoinCard = ({
  level,
  lockedAmount,
  pendingRewards,
  dailyRewards,
  plantimage,
  title,
  id,
  time,
  getAllData
}) => {
  const [xys, set] = useState([0, 0, 1]);
  const props = useSpring({ xys, config: 'stiff' });
  const ref = useRef(null);

  const claim = async () => {
    const web3Modal = new Web3Modal({
      cacheProvider: true, // optional
      providerOptions, // required
    });
    const provider = await web3Modal.connect();
    const web3 = new Web3(provider);

    const library = new ethers.providers.Web3Provider(provider);
    const accounts = await library.listAccounts();

    const KING = new web3.eth.Contract(KING_ABI, KING_CONTRACT);

    await KING.methods.cashoutReward(id).send({
      from: accounts[0],
    })
    .on('transactionHash', (hash) => {
      console.log(hash);
    })
    .on('receipt', (receipt) => {
      console.log(receipt);
      toast.success('Rewards Claimed Successfully');
      getAllData();

    })
    .on('confirmation', (confirmationNumber, receipt) => {
      console.log(confirmationNumber, receipt);
    })
    .on('error', (error) => {
      toast.error('Transaction Failed');
      console.log(error);
    })
  }

  const compound = async () => {
    const web3Modal = new Web3Modal({
      cacheProvider: true, // optional
      providerOptions, // required
    });
    const provider = await web3Modal.connect();
    const web3 = new Web3(provider);

    const library = new ethers.providers.Web3Provider(provider);
    const accounts = await library.listAccounts();

    const KING = new web3.eth.Contract(KING_ABI, KING_CONTRACT);

    await KING.methods.compoundReward(id).send({
      from: accounts[0],
    })
    .on('transactionHash', (hash) => {
      console.log(hash);
    })
    .on('receipt', (receipt) => {
      console.log(receipt);
      toast.success('Your Tokens are Compounded');
      getAllData();
    })
    .on('confirmation', (confirmationNumber, receipt) => {
      console.log(confirmationNumber, receipt);
    })
    .on('error', (error) => {
      toast.error('Transaction Failed');
      console.log(error);
    })
  }

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    return (
      <Button
        className='btn-effect btn-animated'
        disabled={completed ? false : true}
        variant='primary'
        onClick={() => claim()}
      >
        CLAIM
        {!completed ? (
          <span>{` IN ${zeroPad(days * 24 + hours)}:${zeroPad(
            minutes
          )}:${zeroPad(seconds)}`}</span>
        ) : (
          ''
        )}
      </Button>
    );
  };
  
  return (
    <Col ref={ref}>
      <animated.div
        className='card locked-card ccard h-100'
        style={{
          transform: props.xys.to(trans),
        }}
        onMouseLeave={() => set([0, 0, 1])}
        onMouseMove={(e) => {
          const rect = ref.current.getBoundingClientRect();
          set(calc(e.clientX, e.clientY, rect));
        }}
      >
        <img
          className='plant-level'
          src={plantimage}
          width='90%'
          alt='plant level'
        />
        <Card.Header className='py-1'></Card.Header>
        <Card.Body className='d-flex flex-column'>
          <Row>
            <Col>
              <Card.Title className='mb-1 fs-4'>{title}</Card.Title>
              <Card.Text className='small mb-3'><span className='cardParagraph'>{lockedAmount}</span> SEEDS</Card.Text>
            </Col>
            <Col className='pe-0'>
              <div className='d-flex align-items-center justify-content-center level-ind h-100'>
                {`LEVEL ${level}`}
              </div>
            </Col>
          </Row>

          <Card.Title className='mb-1 fs-4'>Pending Rewards</Card.Title>
          <Card.Text className='small'><span className='cardParagraph'>{pendingRewards}</span> SEEDS </Card.Text>
          <Card.Title className='mb-1 fs-4'>Daily Rewards</Card.Title>
          <Card.Text className='small'><span className='cardParagraph'>{dailyRewards}</span> BONUS </Card.Text>
          <Row className='mt-auto'>
            <Col className='d-flex justify-content-center'>
              {
                time > new Date() ? (
                  <Countdown disabled={new Date(time).toISOString() > new Date() ? false : true} date={new Date(time).toISOString()} renderer={renderer} />
                ) : (
                  <>
                    <Button
                      className='me-4 btn-effect btn-animated'
                      variant='primary'
                      onClick={() => compound()}
                      disabled={time > new Date() ? true : false}
                    >
                      COMPOUND
                    </Button>
                    <Button
                      className='btn-effect btn-animated'
                      disabled={time > new Date() ? true : false}
                      variant='primary'
                      onClick={() => claim()}
                    >
                      CLAIM
                    </Button>
                  </>
                )
              }
              {/* <Button
                className='me-4 btn-effect btn-animated'
                variant='primary'
                onClick={() => compound()}
                disabled={time > new Date() ? true : false}
              >
                COMPOUND
              </Button>
              <Button
                className='btn-effect btn-animated'
                disabled={time > new Date() ? true : false}
                variant='primary'
                onClick={() => claim()}
              >
                CLAIM
              </Button> */}
              {/* <Countdown disabled={time > new Date() ? false : true} date={'2022-03-10T00:00:00'} renderer={renderer} /> */}
            </Col>
          </Row>
        </Card.Body>
      </animated.div>
    </Col>
  );
};
