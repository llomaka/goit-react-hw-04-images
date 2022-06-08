import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import Modal from '../Modal';
import {RemoveScroll} from 'react-remove-scroll';
import styles from './ImageGallery.module.css';

export default function ImageGallery({ images }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');

  const showModal = ({ largeImageURL, tags }) => {
    setIsModalOpen(true);
    setLargeImageURL(largeImageURL);
    setTags(tags);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setLargeImageURL('');
    setTags('');
  };

  return (
    <>
      <ul className={styles.gallery}>
        {images.map(image => (
          <li
            key={image.id}
            className={styles.gallery__item}
          >
            <ImageGalleryItem
              webformatURL={image.webformatURL}
              largeImageURL={image.largeImageURL}
              tags={image.tags}
              showModal={showModal}
            />
          </li>
        ))}
      </ul>
      {isModalOpen && <RemoveScroll>
        <Modal
          largeImageURL={largeImageURL}
          tags={tags}
          closeModal={closeModal}
        />
      </RemoveScroll>}
    </>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  )
};
