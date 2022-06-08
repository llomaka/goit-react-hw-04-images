import PropTypes from "prop-types";
import styles from "./ImageGalleryItem.module.css";

export default function ImageGalleryItem({ webformatURL, tags }) {
  return (
    <img
      className={styles.gallery__image}
      src={webformatURL}
      alt={tags}
    />
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
