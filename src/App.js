import './App.css';
// import bodyBackground from './images/body-bg-2.gif';
import plantimage from './images/plantimage.png';
import boywatering from './images/boywatering.png';
import logo from './images/logo.png';
import connectButtonLogo from './images/connect-button-logo.png';
import { Container, Row, Col, Card, Button, Navbar } from 'react-bootstrap';
import { useRef, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import Countdown, { zeroPad } from 'react-countdown';

const calc = (x, y, rect) => [
  -(y - rect.top - rect.height / 2) / 20,
  (x - rect.left - rect.width / 2) / 20,
  1,
];
const trans = (x, y, s) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

function App() {
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    return (
      <Button disabled={completed ? false : true} variant='primary'>
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
  const styles = useSpring({
    loop: { reverse: true, config: { friction: 500 } },
    from: { x: -280 },
    to: { x: 10 },
  });
  const ref = [useRef(null), useRef(null)];
  const [xys, set] = useState([0, 0, 1]);
  const [cardNo, setCardNo] = useState(null);
  const props = useSpring({ xys, config: 'stiff' });
  return (
    <Container style={{ minHeight: '100vh' }} className='position-relative'>
      <Row className='dummy-row align-items-center'>
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
                className='ms-auto d-flex flex-row align-items-center connect-button'
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
              <Button className='ms-2 connect-button' variant='primary'>
                Connect
              </Button>
            </Container>
          </Navbar>
        </Col>
      </Row>

      <Row className='align-items-start align-items-stretch'>
        <Col sm lg={3} className='d-flex flex-column justify-content-between'>
          <div className='card mb-4'>
            <Card.Header className='text-center py-1'>My Seeds</Card.Header>
            <Card.Body>
              <Card.Title className='mb-0'>600 000</Card.Title>
              {/* <Card.Text className=''></Card.Text> */}
            </Card.Body>
          </div>

          <Card className='mb-4'>
            <Card.Header className='text-center py-1'>My Stats</Card.Header>
            <Card.Body>
              <Card.Title className='mb-1 fs-4'>EST:</Card.Title>
              <Card.Text className='small'>100 Seeds/Day</Card.Text>
              <Card.Title className='mb-1 fs-4'>Pending Rewards:</Card.Title>
              <Card.Text className='small'>100</Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Header className='text-center py-1'>My Beans</Card.Header>
            <Card.Body>
              <Card.Title className='mb-0'>2</Card.Title>
              <Card.Text></Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col sm lg={6} className='align-self-end position-relative'>
          <animated.img
            className='boy-watering position-absolute'
            src={boywatering}
            width='40%'
            alt='boy watering'
            style={{ top: '-135px', left: '250px', ...styles }}
          />
          <Row sm={1} lg={2} className='g-2'>
            <Col ref={ref[0]}>
              <animated.div
                className='card locked-card ccard h-100'
                style={{
                  transform: cardNo === 1 ? props.xys.to(trans) : undefined,
                }}
                onMouseLeave={() => set([0, 0, 1])}
                onMouseMove={(e) => {
                  const rect = ref[0].current.getBoundingClientRect();
                  setCardNo(1);
                  set(calc(e.clientX, e.clientY, rect));
                }}
              >
                <img
                  className='plant-level'
                  src={plantimage}
                  width='50%'
                  alt='plant level'
                />
                <Card.Header className='py-1'></Card.Header>
                <Card.Body className='d-flex flex-column position-relative'>
                  <div className='position-absolute top-0 end-0 level-ind px-2'>
                    LEVEL 7
                  </div>
                  <Card.Title className='mb-1 fs-4'>Locked Amount</Card.Title>
                  <Card.Text className='small'>100 SEEDS</Card.Text>
                  <Card.Title className='mb-1 fs-4'>Pending Rewards</Card.Title>
                  <Card.Text className='small'>100 SEEDS</Card.Text>
                  <Card.Title className='mb-1 fs-4'>Daily Rewards</Card.Title>
                  <Card.Text className='small'>4% + 0.00% BONUS</Card.Text>
                  <Row className='mt-auto'>
                    <Col className='d-flex justify-content-center'>
                      <Button className='me-4' variant='primary'>
                        COMPOUND
                      </Button>
                      <Countdown
                          date={'2022-02-28T00:00:00'}
                          renderer={renderer}
                        />
                    </Col>
                  </Row>
                </Card.Body>
              </animated.div>
            </Col>
            <Col ref={ref[1]}>
              <animated.div
                className='card locked-card ccard h-100'
                style={{
                  transform: cardNo === 2 ? props.xys.to(trans) : undefined,
                }}
                onMouseLeave={() => set([0, 0, 1])}
                onMouseMove={(e) => {
                  const rect = ref[1].current.getBoundingClientRect();
                  setCardNo(2);
                  set(calc(e.clientX, e.clientY, rect));
                }}
              >
                <img
                  className='plant-level'
                  src={plantimage}
                  width='50%'
                  alt='plant level'
                />

                <Card.Header className='py-1'></Card.Header>
                <Card.Body className='d-flex flex-column position-relative'>
                  <div className='position-absolute top-0 end-0 level-ind px-2'>
                    LEVEL 7
                  </div>
                  <Card.Title className='mb-1 fs-4'>Locked Amount</Card.Title>
                  <Card.Text className='small'>100 SEEDS</Card.Text>
                  <Card.Title className='mb-1 fs-4'>Pending Rewards</Card.Title>
                  <Card.Text className='small'>100 SEEDS</Card.Text>
                  <Card.Title className='mb-1 fs-4'>Daily Rewards</Card.Title>
                  <Card.Text className='small'>4% + 0.00% BONUS</Card.Text>
                  <Row className='mt-auto'>
                    <Col className='d-flex justify-content-center'>
                      <Button className='me-4' variant='primary'>
                        COMPOUND
                      </Button>
                      <Button variant='primary'>CLAIM</Button>
                    </Col>
                  </Row>
                </Card.Body>
              </animated.div>
            </Col>
          </Row>
        </Col>
        <Col sm lg={3} className='d-flex flex-column justify-content-between'>
          <Card>
            <Card.Header className='text-center py-1'>$1.5</Card.Header>
            <Card.Body>
              <Card.Title className='mb-0'>For 10 000 SEEDS</Card.Title>
              <Card.Text></Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Header className='text-center py-1'>TVL</Card.Header>
            <Card.Body>
              <Card.Title>650 000 000 SEEDS</Card.Title>
              {/* <Card.Text>100</Card.Text> */}
              <Card.Title>$10 000</Card.Title>
              {/* <Card.Text>100</Card.Text>
              <Card.Title>Pending Rewards:</Card.Title>
              <Card.Text>100</Card.Text> */}
            </Card.Body>
          </Card>
          <Card>
            <Card.Header className='text-center py-1'>Total Beans</Card.Header>
            <Card.Body>
              <Card.Title className='mb-0'>50 000</Card.Title>
              <Card.Text></Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
