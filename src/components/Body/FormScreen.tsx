import React, { useContext, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';
import useModal from '../../hooks/useModal';
import ModalPsw from '../Navigation/ModalPsw';
import ModalSignIn from '../Navigation/ModalSignIn';
import ModalSignUp from '../Navigation/ModalSignUp';
import screenshot from '../../services/screenshot';
import Message from '../Message';

const FormScreen: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [download, setDownload] = useState('');
  const [message, setMessage] = useState('');

  const {
    showIn,
    showUp,
    handleCloseIn,
    handleCloseUp,
    handleShowIn,
    handleSwitchForm,
    handleShowPsw,
    showPsw,
    handleClosePsw,
  } = useModal();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!user.username) {
      handleShowIn();
      return;
    }

    const target = e.target as typeof e.target & {
      textarea: { value: string };
    };

    const code = target.textarea.value;

    const res = await screenshot(code, user.APIKey);

    if (res.ok) {
      const file = await res.blob();
      const objectURL = URL.createObjectURL(file);

      setDownload(objectURL);
    }
    if (!res?.ok) {
      const json = await res.json();
      setMessage(json.message);
    }
  };

  const downloadButton = download ? (
    <Button type="button" variant="success">
      <a href={download} style={{ color: 'white' }} download rel="noopener noreferrer">
        Download
      </a>
    </Button>
  ) : (
    <Button type="button" variant="success" disabled>
      Download
    </Button>
  );

  return (
    <Container fluid className="h-100 d-flex align-items-end">
      <form
        className="d-flex flex-column justify-content-end  w-100 align-items-center gap-3"
        onSubmit={handleSubmit}
      >
        <textarea name="textarea" style={{ height: '5rem', width: '75%' }} />
        <div className="d-flex gap-3">
          <Button type="submit" variant="dark">
            Send Code
          </Button>
          {downloadButton}
        </div>
      </form>
      <ModalSignIn
        show={showIn}
        handleClose={handleCloseIn}
        switchForm={handleSwitchForm}
        handleShowPsw={handleShowPsw}
      />
      <ModalSignUp show={showUp} handleClose={handleCloseUp} switchForm={handleSwitchForm} />
      <ModalPsw show={showPsw} handleClose={handleClosePsw} />
      <Message message={message} setMessage={setMessage} />
    </Container>
  );
};

export default FormScreen;
