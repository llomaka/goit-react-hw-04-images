import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import Modal from '../Modal';
import {RemoveScroll} from 'react-remove-scroll';
import styles from './ImageGallery.module.css';

export default function ImageGallery({ images }) {
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [tags, setTags] = useState(null);

  const closeModal = () => {
    setLargeImageURL(null);
    setTags(null);
  };

  const selectImage = (largeImageURL, tags) => {
    setLargeImageURL(largeImageURL);
    setTags(tags);
  };

  return (
    <>
      <ul className={styles.gallery}>
        {images.map(image => (
          <li
            key={image.id}
            className={styles.gallery__item}
            onClick={()=>selectImage(image.largeImageURL, image.tags)}
          >
            <ImageGalleryItem
              webformatURL={image.webformatURL}
              tags={image.tags}
            />
          </li>
        ))}
      </ul>
      {largeImageURL && <RemoveScroll>
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
