import { Modal, Button, Form } from 'react-bootstrap';

export const MintModal = (props) => {
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
          <Form.Control type='text' placeholder='Name' />
          <Form.Text className='text-muted'>
            Your name should be between 2 and 31 characters.
          </Form.Text>
        </Form.Group>
        <Form.Group className='mb-3' controlId='seedCtrl'>
          {/* <Form.Label>SEED Amount</Form.Label> */}
          <Form.Control type='text' placeholder='SEED Amount' />
          <Form.Text className='text-muted'>Min: 100,000 SEED.</Form.Text>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary' onClick={props.onHide}>
          CLOSE
        </Button>
        <Button variant='primary' onClick={props.mintSeeds}>
          MINT
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
