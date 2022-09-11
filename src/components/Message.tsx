import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';

interface Props {
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
}

const Message: React.FC<Props> = (props: Props) => {
  const [smShow, setSmShow] = useState(false);

  useEffect(() => {
    props.message && setSmShow(true);
  }, [props.message]);

  return (
    <Modal
      size="sm"
      show={smShow}
      onHide={() => {
        setSmShow(false);
        props.setMessage('');
      }}
      aria-labelledby="example-modal-sizes-title-sm"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-sm">{props.message}</Modal.Title>
      </Modal.Header>
    </Modal>
  );
};

export default Message;
