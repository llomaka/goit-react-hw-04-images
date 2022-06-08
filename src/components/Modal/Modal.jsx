// import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ largeImageURL, tags, closeModal }) {
  const handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      closeModal();
    };
  };

  // const handleKeydown = event => {
  //   if (event.code === 'Escape') {
  //     closeModal();
  //   };
  // };

  // useEffect(() => {
  //   window.addEventListener('keydown', handleKeydown);
  //   return ()=>window.removeEventListener('keydown', this.handleKeydown);
  // }, []);

  return createPortal(
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <img
          src={largeImageURL}
          alt={tags}
        />
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
