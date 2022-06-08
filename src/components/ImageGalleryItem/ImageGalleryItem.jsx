import PropTypes from "prop-types";
import styles from "./ImageGalleryItem.module.css";

export default function ImageGalleryItem({ webformatURL, largeImageURL, tags, showModal }) {
  return (
    <img
      className={styles.gallery__image}
      src={webformatURL}
      alt={tags}
      onClick={() => showModal({ largeImageURL, tags })}
    />
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  showModal: PropTypes.func.isRequired,
};
