import { useState, useEffect } from 'react';
import './App.css';

import { fetchData } from './utilits/fetch';
import toast, { Toaster } from 'react-hot-toast';

import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import ImageModal from './components/ImageModal/ImageModal';

const App = () => {
    const [inputValue, setInputValue] = useState('');
    const [dataGallery, setDataGallery] = useState([]);
    const [showLoader, setShowLoader] = useState(false);
    const [modal, setModal] = useState(null);
    const [lastBtn, setLastBtn] = useState(false);
    const [showMoreBtn, setShowMoreBtn] = useState(false);
    const [error, setError] = useState({ isError: false });
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState('');

    useEffect(() => {
        if (error.isError) {
            showError(error.message);
        }
        const timeout = setTimeout(() => {
            setError({ isError: false });
        }, 2500);

        return () => clearTimeout(timeout);
    }, [error]);

    useEffect(() => {
        if (!query) return;

        fetchData(query, page)
            .then(response => {
                if (!response.results.length) {
                    setShowMoreBtn(false);
                    setError({
                        isError: true,
                        message: 'No results, try other query',
                    });
                    return;
                }
                setShowMoreBtn(true);
                page !== 1
                    ? setDataGallery([...dataGallery, ...response.results])
                    : setDataGallery([...response.results]);
                response.total_pages < page && setLastBtn(true);
            })
            .catch(error => setError({ isError: true, message: error.message }))
            .finally(setShowLoader(false));
    }, [query, page]);

    const showError = message => {
        toast.error(message, { duration: 1500 });
    };

    const isValid = input => {
        if (input !== '') {
            return true;
        }
        return false;
    };
    const handleSearchInput = async evt => {
        evt.preventDefault();
        setDataGallery([]);
        setShowMoreBtn(false);
        let input = evt.target.elements.search.value.trim();
        if (isValid(input)) {
            setInputValue(input);
            evt.target.elements.search.value = input;
            setShowLoader(true);
            setQuery(input);
        } else {
            setError({
                isError: true,
                message: 'Input valid data!',
            });
        }

        //
        //
    };

    const handleMoreBtn = () => {
        setShowLoader(true);
        setPage(prev => prev + 1);
    };

    const closeModal = evt => {
        evt.target === evt.currentTarget && setModal({ isOpen: false });
        document.body.classList.remove('no-scroll');
    };
    const openModal = image => {
        setModal(image);
        image
            ? document.body.classList.add('no-scroll')
            : document.body.classList.remove('no-scroll');
        console.log('click');
        console.log(image);
    };
    return (
        <div className="app">
            {showLoader && <Loader />}
            <SearchBar handleSubmit={handleSearchInput} />
            {dataGallery && (
                <ImageGallery data={dataGallery} openModal={openModal} />
            )}
            {showMoreBtn && <LoadMoreBtn handleMoreBtn={handleMoreBtn} />}

            <ImageModal
                modal={modal}
                modalIsOpen={Boolean(modal)}
                closeModal={() => openModal(null)}
            />

            {error.isError && <ErrorMessage />}
        </div>
    );
};
export default App;
