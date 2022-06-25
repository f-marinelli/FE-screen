import { useState } from 'react';

interface DataOutput {
  showIn: boolean;
  showUp: boolean;
  handleCloseIn: () => void;
  handleCloseUp: () => void;
  handleShowUp: () => void;
  handleShowIn: () => void;
  handleSwitchForm: () => void;
}

const useModal = (): DataOutput => {
  const [showIn, setShowIn] = useState(false);
  const [showUp, setShowUp] = useState(false);

  const handleCloseIn = () => setShowIn(false);
  const handleShowIn = () => setShowIn(true);

  const handleCloseUp = () => setShowUp(false);
  const handleShowUp = () => setShowUp(true);

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
    handleCloseIn,
    handleCloseUp,
    handleShowIn,
    handleShowUp,
    handleSwitchForm,
  };
};

export default useModal;
