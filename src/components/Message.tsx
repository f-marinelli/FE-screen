import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { resetMessage } from '../store/messageSlice';

const Message: React.FC = () => {
  const [smShow, setSmShow] = useState(false);
  const dispatch = useAppDispatch();
  const message = useAppSelector((state) => state.message.value);

  useEffect(() => {
    message && setSmShow(true);
  }, [message]);

  return (
    <Modal
      size="sm"
      show={smShow}
      onHide={() => {
        setSmShow(false);
        dispatch(resetMessage());
      }}
      aria-labelledby="example-modal-sizes-title-sm"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-sm">{message}</Modal.Title>
      </Modal.Header>
    </Modal>
  );
};

export default Message;
