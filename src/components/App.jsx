import React, { useState, useRef, useEffect } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Button from './Button';
import { fetchPictures } from '../services/pixabayAPI';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './App.module.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [totalHits, setTotalHits] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const totalPages = totalHits / 12;
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!searchQuery) return;
    setStatus(Status.PENDING);
    fetchPictures(searchQuery, page)
      .then(data => {
        if (data.totalHits === 0) {
          toast.error(`${this.state.searchQuery} not found!`);
          setStatus(Status.REJECTED);
        }
        else {
          setImages(prevImages => [...prevImages, ...data.hits]);
          setTotalHits(data.totalHits);
          setStatus(Status.RESOLVED);
        }
      })
      .catch(error => {
        toast.error(error);
        setStatus(Status.REJECTED);
      });
    if (bottomRef.current && page > 1) {
      bottomRef.current.scrollIntoView(false);
    }
  }, [searchQuery, page]);

  const onSearchClick = query => {
    if (query.toLowerCase() === searchQuery.toLowerCase()) return;
    setSearchQuery(query);
    setPage(1);
    setImages([]);
  };

  return (
    <div
      className={styles.container}
    >
      <Searchbar
        onSearchClick={onSearchClick}
      />
      {images && (<ImageGallery images={images} />)}
      {status === Status.PENDING && (<Loader />)}
      {status === Status.RESOLVED && totalPages > page && (<Button text='Load more' handleClick={() => setPage(prevPage => prevPage + 1)} />)}
      <ToastContainer ref={bottomRef} />
    </div>
  );
}
