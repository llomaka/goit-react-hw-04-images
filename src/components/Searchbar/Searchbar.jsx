import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import styles from './Searchbar.module.css';

export default function Searchbar({ onSearchClick }) {
  const [searchQuery, setSearchQuery] = useState('');

  const onChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim() === '') return toast.warning('Enter search query text!');
    onSearchClick(searchQuery);
  };

  return (
    <header className={styles.header}>
      <form
        className={styles.form}
        onSubmit={onSubmit}
      >
        <button type='submit' className={styles.button}>
          <span className={styles.label}>Search</span>
        </button>
        <input
          className={styles.input}
          type='text'
          name='searchQuery'
          autoComplete='off'
          autoFocus
          placeholder='Search images and photos'
          onChange={onChange}
          value={searchQuery}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSearchClick: PropTypes.func.isRequired,
};
