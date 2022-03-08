import 'swiper/css';
import 'swiper/css/pagination';
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

// import { useRef, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSpring, animated } from 'react-spring';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';

import { TopNavBar } from './components/TopNavBar';
import { StatCard } from './components/StatCard';
import { LockedCoinCard } from './components/LockedCoinCard';
// import { Button } from 'bootstrap';

function App() {
  const styles = useSpring({
    loop: { reverse: true, config: { friction: 500 } },
    from: { x: -280 },
    to: { x: 10 },
  });

  const mySeedsStat = [{ title: '600 000' }];
  const myAllStat = [
    { title: 'EST:', text: '100 Seeds/Day' },
    { title: 'Pending Rewards:', text: '100' },
  ];
  const myBeansStat = [{ title: '2' }];
  const priceStat = [{ title: 'For 10 000 SEEDS' }];
  const TVLStat = [{ title: '650 000 000 SEEDS' }, { title: '$10 000' }];
  const totalBeansStat = [{ title: '50 000' }];

  // const plantLevels = {
  //   plantLevel1,
  //   plantLevel2,
  //   plantLevel3,
  //   plantLevel4,
  //   plantLevel5,
  //   plantLevel6,
  // };

  const lockedCoinStats = [
    {
      level: 1,
      lockedAmount: '100 SEEDS',
      pendingRewards: '100 SEEDS',
      dailyRewards: '4% + 0.00% BONUS',
      plantLevel: plantLevel1,
    },
    {
      level: 2,
      lockedAmount: '100 SEEDS',
      pendingRewards: '100 SEEDS',
      dailyRewards: '4% + 0.00% BONUS',
      plantLevel: plantLevel2,
    },
    {
      level: 3,
      lockedAmount: '100 SEEDS',
      pendingRewards: '100 SEEDS',
      dailyRewards: '4% + 0.00% BONUS',
      plantLevel: plantLevel3,
    },
    {
      level: 4,
      lockedAmount: '100 SEEDS',
      pendingRewards: '100 SEEDS',
      dailyRewards: '4% + 0.00% BONUS',
      plantLevel: plantLevel4,
    },
    {
      level: 5,
      lockedAmount: '100 SEEDS',
      pendingRewards: '100 SEEDS',
      dailyRewards: '4% + 0.00% BONUS',
      plantLevel: plantLevel5,
    },
    {
      level: 6,
      lockedAmount: '100 SEEDS',
      pendingRewards: '100 SEEDS',
      dailyRewards: '4% + 0.00% BONUS',
      plantLevel: plantLevel6,
    },
    {
      level: 9,
      lockedAmount: '100 SEEDS',
      pendingRewards: '100 SEEDS',
      dailyRewards: '4% + 0.00% BONUS',
      plantLevel: plantLevel6,
    },
  ];

  return (
    <>
      <Container fluid='lg' className='min-vh-100 position-relative p-4 p-xl-0'>
        <TopNavBar {...{ logo, connectButtonLogo }} />
        <Row className='align-items-stretch'>
          <Col
            sm={12}
            md
            xl={3}
            className='d-flex flex-column justify-content-between'
          >
            <StatCard heading='My Seeds' list={mySeedsStat} titleStyle='mb-0' />
            <StatCard
              heading='My Stats'
              list={myAllStat}
              titleStyle='mb-1 fs-4'
            />
            <StatCard
              heading='My Beans'
              list={myBeansStat}
              titleStyle='mb-0'
              isLast
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
              width='40%'
              alt='boy watering'
              style={{ top: '-135px', left: '250px', ...styles }}
            />
            {/* <Row sm={1} xl={2} className='g-2'> */}
            <Row>
              <Swiper
                slidesPerView={1}
                slidesPerGroup={1}
                spaceBetween={0}
                grabCursor={true}
                breakpoints={{
                  1200: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                    slidesPerGroup: 2,
                  },
                }}
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                  dynamicMainBullets: 3,
                  renderBullet: function (index, className) {
                    return `<button type="button" class="btn ${className}">${
                      index + 1
                    }</button>`;
                  },
                }}
                modules={[Pagination]}
                className='mySwiper'
              >
                {lockedCoinStats.map((lockedCoinStat, idx) => (
                  <SwiperSlide key={`lockedCard-${idx}`}>
                    <LockedCoinCard
                      {...lockedCoinStat}
                      plantimage={lockedCoinStat.plantLevel}
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
            <StatCard heading='$1.5' list={priceStat} titleStyle='mb-0' />

            <StatCard heading='TVL' list={TVLStat} />

            <StatCard
              heading='Total Beans'
              list={totalBeansStat}
              titleStyle='mb-0'
              isLast
            />
          </Col>
        </Row>
      </Container>
      <Container fluid className='p-5 footer-container'>
        <Container>
          <Row>
            <Col sm={4}>
              <img
                src={logo}
                width='80'
                className='d-inline-block align-top'
                alt='React Bootstrap logo'
              />
            </Col>
            <Col sm={8}>
              <p className='fs-4 mb-0'>Our SEED token contract address</p>
              <p className=''>0x23456789</p>
            </Col>
          </Row>
          <Row>
            <Col sm={4}>
              <p className='fs-4 mb-0'>SEEDs Pages</p>
              <ul>
                <li>Connect Wallet</li>
                <li>Trading Chart</li>
                <li>Whitepaper</li>
              </ul>
            </Col>
            <Col sm={4}>
              <p className='fs-4 mb-0'>SEEDs FAQ</p>
              <ul>
                <li>What is SEED token?</li>
                <li>Where to buy SEED token?</li>
                <li>How much APR we earn when we stake SEED?</li>
              </ul>
            </Col>
            <Col sm={4}>
              <p className='fs-4 mb-0'>Connect us from social media</p>
            </Col>
          </Row>
          <Row>
            <Col sm={4}></Col>
            <Col sm={4}></Col>
          </Row>
        </Container>
      </Container>
    </>
  );
}

export default App;
