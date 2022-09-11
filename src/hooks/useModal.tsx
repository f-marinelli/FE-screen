import { useState } from 'react';

interface DataOutput {
  showIn: boolean;
  showUp: boolean;
  showPsw: boolean;
  handleCloseIn: () => void;
  handleCloseUp: () => void;
  handleShowUp: () => void;
  handleShowIn: () => void;
  handleSwitchForm: () => void;
  handleShowPsw: () => void;
  handleClosePsw: () => void;
}

const useModal = (): DataOutput => {
  const [showIn, setShowIn] = useState(false);
  const [showUp, setShowUp] = useState(false);
  const [showPsw, setShowPsw] = useState(false);

  const handleCloseIn = () => setShowIn(false);
  const handleShowIn = () => setShowIn(true);

  const handleCloseUp = () => setShowUp(false);
  const handleShowUp = () => setShowUp(true);

  const handleShowPsw = () => {
    setShowPsw(true);
    setShowIn(false);
  };
  const handleClosePsw = () => setShowPsw(false);

  const handleSwitchForm = () => {
    if (showIn) {
      handleCloseIn();
      handleShowUp();
    } else {
      handleCloseUp();
      handleShowIn();
    }
  };

  return {
    showIn,
    showUp,
    showPsw,
    handleCloseIn,
    handleCloseUp,
    handleShowIn,
    handleShowUp,
    handleSwitchForm,
    handleShowPsw,
    handleClosePsw,
  };
};

export default useModal;
