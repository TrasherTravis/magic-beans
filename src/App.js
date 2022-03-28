import 'swiper/css';
// import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './App.css';

import plantLevel1 from './images/plantimage/1.png';
import plantLevel2 from './images/plantimage/2.png';
import plantLevel3 from './images/plantimage/3.png';
import plantLevel4 from './images/plantimage/4.png';
import plantLevel5 from './images/plantimage/5.png';
import plantLevel6 from './images/plantimage/6.png';


import boywatering from './images/boywatering.png';
import logo from './images/logo.png';
import connectButtonLogo from './images/connect-button-logo.png';

import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSpring, animated } from 'react-spring';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import Web3Modal from 'web3modal';
import Web3 from 'web3'
import { ethers } from 'ethers';

import { providerOptions } from './components/TopNavBar';
import KING_ABI from './abi/KING_ABI.json';
import GARDEN_ABI from './abi/GARDEN_ABI.json';
import { KING_CONTRACT, GARDEN_CONTRACT } from './data/contracts';

import { TopNavBar } from './components/TopNavBar';
import { StatCard } from './components/StatCard';
import { LockedCoinCard } from './components/LockedCoinCard';
import { Footer } from './components/Footer';
import { MintModal } from './components/MintModal';
// import { Button } from 'bootstrap';

import {
  mySeedsStat,
  myAllStat,
  myBeansStat,
  priceStat,
  TVLStat,
  totalBeansStat,
  lockedCoinStats,
} from './data/HomeComponentData';

function App() {
  const styles = useSpring({
    loop: { reverse: true, config: { friction: 500 } },
    from: { x: -280 },
    to: { x: 10 },
  });

  const [modalShow, setModalShow] = useState(false);
  const [data, setData] = useState({
    beans: 0,
    est: 0,
    rewards: 0,
    balance: 0,
    tvl: 0,
    totalBeans: 0,
  });
  const [mainData, setMainData] = useState({
    tvl: 0,
    totalBeans: 0,
  });

  const [plants, setPlants] = useState([]);

  const web3Modal = new Web3Modal({
    cacheProvider: true, // optional
    providerOptions, // required
  });

  const getMainDataContract = async () => {
   
    const web3 = new Web3('https://api.avax-test.network/ext/bc/C/rpc');

    const KING = new web3.eth.Contract(KING_ABI, KING_CONTRACT);

    const tvl = await KING.methods.totalValueLocked().call();
    const totalBeans = await KING.methods.totalSupply().call();

    setMainData({ tvl, totalBeans });
  }

  const getInitialData = async () => {
    const provider = await web3Modal.connect();
    const web3 = new Web3(provider);
    const library = new ethers.providers.Web3Provider(provider);
    const accounts = await library.listAccounts();

    const KING = new web3.eth.Contract(KING_ABI, KING_CONTRACT);
    const GARDEN = new web3.eth.Contract(GARDEN_ABI, GARDEN_CONTRACT);

    const beans = await KING.methods.balanceOf(accounts[0]).call();
    const rewards = await KING.methods.calculateTotalPendingReward(accounts[0]).call();
    const est = await KING.methods.calculateEstimatedRewardPerDay(accounts[0]).call();

    const balance = await GARDEN.methods.balanceOf(accounts[0]).call();

    setData({ beans, est, rewards, balance });

    const kingIds = await KING.methods.getKingIdsOf(accounts[0]).call();

    let newPlants = [];

    const kings = await KING.methods.getKingsByIds(kingIds).call();
    kings.forEach(king => {
      const level = +king[0].kingValue === 0 ? plantLevel1 : +king[0].kingValue === 1 ? plantLevel2 : +king[0].kingValue === 2 ? plantLevel3 : +king[0].kingValue === 3 ? plantLevel4 : +king[0].kingValue === 4 ? plantLevel5 : plantLevel6;
      newPlants.push({
        level: 1,
        dailyRewards: '4% + 0.00%',
        plantLevel: level,
        lockedAmount: (+king[0][6] / 10**18).toFixed(0),
        pendingRewards: (+king.pendingRewards / 10**18).toFixed(2),
        id: king[0].id,
        tokenName: king[0].name,
        kingValue: king[0].kingValue,
        time: new Date((+king[0].lastProcessingTimestamp + 14400) * 1000),
        title: `${king[0].name} (${king[0].id})`
      })
    });
    setPlants(newPlants);
  };

  const getAllData = () => {
    getInitialData();
    getMainDataContract();
  };

  useEffect(() => {
    getMainDataContract();
  }, []);

  return (
    <>
      <MintModal show={modalShow} onHide={() => setModalShow(false)} onResetStore={() => getAllData()}/>
      <Container fluid='lg' className='min-vh-100 position-relative p-4 p-xl-0'>
        <TopNavBar {...{ logo, connectButtonLogo, getAllData }}/>
        <Row className='align-items-stretch'>
          <Col
            sm={12}
            md
            xl={3}
            className='d-flex flex-column justify-content-between'
          >
            <StatCard
              heading='My Seeds'
              list={[{ title: data.balance / 10**18 }]}
              titleStyle='mb-0 fs-4'
            />
            <StatCard
              heading='My Stats'
              list={[
                { title: 'EST:', text: <><span className='cardParagraph'>{(data.est / 10**18).toFixed(2)}</span> Seeds/Day</> },
                { title: 'Pending Rewards:', text: <span className='cardParagraph'> {(data.rewards / 10**18).toFixed(2)} </span> },
              ]}
              titleStyle='mb-1 fs-4'
            />
            <StatCard
              heading='My Beans'
              list={[{ title: data.beans }]}
              titleStyle='mb-0 fs-4'
              balance={data.balance / 10**18}
              isLast
              hasClaimButton
              showModal={() => setModalShow(true)}
            />
          </Col>
          <Col
            sm={12}
            md={5}
            xl={6}
            className='align-self-end position-relative'
          >
            <animated.img
              className='boy-watering position-absolute'
              src={boywatering}
              alt='boy watering'
              style={{ ...styles }}
            />
            {/* <Row sm={1} xl={2} className='g-2'> */}
            <Row>
              <Swiper
                slidesPerView={1}
                slidesPerGroup={1}
                spaceBetween={0}
                grabCursor={true}
                speed={0}
                breakpoints={{
                  1200: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                    slidesPerGroup: 2,
                  },
                }}
                navigation={true}
                // pagination={{
                //   clickable: true,
                //   dynamicBullets: true,
                //   dynamicMainBullets: 3,
                //   renderBullet: function (index, className) {
                //     return `<button type="button" class="btn ${className}">${
                //       index + 1
                //     }</button>`;
                //   },
                // }}
                modules={[
                  // Pagination,
                  Navigation,
                ]}
              >
                {plants.map((lockedCoinStat, idx) => (
                  <SwiperSlide key={`lockedCard-${idx}`}>
                    <LockedCoinCard
                      {...lockedCoinStat}
                      plantimage={lockedCoinStat.plantLevel}
                      kingValue={lockedCoinStat.kingValue}
                      getAllData={getAllData}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Row>
          </Col>
          <Col
            sm={12}
            md
            xl={3}
            className='d-flex flex-column justify-content-between'
          >
            <StatCard heading='$1.5' list={priceStat} titleStyle='mb-0 fs-4' />
            <StatCard heading='TVL' list={[{ title: `${(mainData.tvl / 10**18).toFixed(2)} SEEDS` }, { title: '$10 000' }]} />
            <StatCard
              heading='Total Beans'
              list={[{ title: mainData.totalBeans }]}
              titleStyle='mb-0 fs-4'
              isLast
            />
          </Col>
        </Row>
      </Container>
      <Footer logo={logo} />
    </>
  );
}

export default App;
