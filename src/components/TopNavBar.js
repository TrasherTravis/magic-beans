import { Container, Row, Col, Button, Navbar } from 'react-bootstrap';

export const TopNavBar = ({ logo, connectButtonLogo }) => {
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

            <Button
              className='ms-2 connect-button btn-effect btn-animated'
              variant='primary'
            >
              Connect
            </Button>
          </Container>
        </Navbar>
      </Col>
    </Row>
  );
};
