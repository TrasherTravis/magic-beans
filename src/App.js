import './App.css';
// import bodyBackground from './images/body-bg-2.gif';
import plantimage from './images/plantimage.png';
import boywatering from './images/boywatering.png';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
// import { useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

function App() {
  const styles = useSpring({
    loop: { reverse: true, config: { friction: 500} },
    from: { x: -280 },
    to: { x: 10 },
  });

  return (
    <Container style={{ height: '100vh' }} className='position-relative'>
      <Row>
        <Col className='d-flex flex-column align-items-center'></Col>
      </Row>
      <Row className='align-items-start align-items-stretch'>
        <Col sm lg={3}>
          <Card className='mb-4'>
            <Card.Header className='py-0'>My Seeds</Card.Header>
            <Card.Body>
              <Card.Title className='mb-0'>600 000</Card.Title>
              {/* <Card.Text className=''></Card.Text> */}
            </Card.Body>
          </Card>
          <Card className='mb-4'>
            <Card.Header className='py-0'>My Stats</Card.Header>
            <Card.Body>
              <Card.Title className='mb-1 fs-4'>EST:</Card.Title>
              <Card.Text className='small'>100 Seeds/Day</Card.Text>
              <Card.Title className='mb-1 fs-4'>Pending Rewards:</Card.Title>
              <Card.Text className='small'>100</Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Header className='py-0'>My Beans</Card.Header>
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
            <Col>
              <Card className='locked-card'>
                <img
                  className='plant-level'
                  src={plantimage}
                  width='50%'
                  alt='plant level'
                />

                <Card.Header className='py-0'></Card.Header>
                <Card.Body>
                  <Card.Title className='mb-1 fs-4'>Locked Amount</Card.Title>
                  <Card.Text className='small'>100 SEEDS</Card.Text>
                  <Card.Title className='mb-1 fs-4'>Pending Rewards</Card.Title>
                  <Card.Text className='small'>100 SEEDS</Card.Text>
                  <Card.Title className='mb-1 fs-4'>Daily Rewards</Card.Title>
                  <Card.Text className='small'>4% + 0.00% BONUS</Card.Text>
                  <Row>
                    <Col className='d-flex justify-content-center'>
                      <Button className='me-4' variant='primary'>
                        COMPOUND
                      </Button>
                      <Button variant='primary'>CLAIM</Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className='locked-card'>
                <img
                  className='plant-level'
                  src={plantimage}
                  width='50%'
                  alt='plant level'
                />

                <Card.Header className='py-0'></Card.Header>
                <Card.Body>
                  <Card.Title className='mb-1 fs-4'>Locked Amount</Card.Title>
                  <Card.Text className='small'>100 SEEDS</Card.Text>
                  <Card.Title className='mb-1 fs-4'>Pending Rewards</Card.Title>
                  <Card.Text className='small'>100 SEEDS</Card.Text>
                  <Card.Title className='mb-1 fs-4'>Daily Rewards</Card.Title>
                  <Card.Text className='small'>4% + 0.00% BONUS</Card.Text>
                  <Row>
                    <Col className='d-flex justify-content-center'>
                      <Button className='me-4' variant='primary'>
                        COMPOUND
                      </Button>
                      <Button variant='primary'>CLAIM</Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col sm lg={3} className='d-flex flex-column justify-content-between'>
          <Card>
            <Card.Header className='py-0'>$1.5</Card.Header>
            <Card.Body>
              <Card.Title className='mb-0'>For 10 000 SEEDS</Card.Title>
              <Card.Text></Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Header className='py-0'>TVL</Card.Header>
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
            <Card.Header className='py-0'>Total Beans</Card.Header>
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
