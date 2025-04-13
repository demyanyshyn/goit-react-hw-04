import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import answerDB from './contacts.json';
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
    const [modal, setModal] = useState({ isOpen: false });
    const [lastBtn, setLastBtn] = useState(false);
    const [showMoreBtn, setShowMoreBtn] = useState(false);
    // const [error, setError] = useState({ isError: false });

    const [query, setQuery] = useState({
        method: 'get',
        url: 'https://api.unsplash.com/search/photos',
        params: {
            lang: 'uk',
            page: '0',
            per_page: '15',
        },
        headers: {
            Authorization: `Client-ID ${'qpoEzgTyRGGFbT-b-zLDTmaLZEtoNSeRUFr4ar22KGU'}`,
        },
    });
    useEffect(() => {
        if (!query.params.query) return;
        const fetchData = async data => {
            const answer = await axios(data);

            return answer;

            //
            //     return new Promise(reject => {
            //         setTimeout(() => {
            //             reject({
            //                 data: [...answerDB],
            //             });
            //         }, 1500);
            //     });
        };

        fetchData(query)
            .then(response => {
                if (!response.data.results.length) {
                    setShowMoreBtn(false);
                    showError('No results, try other query');
                    return;
                }
                setShowMoreBtn(true);
                query.params.page !== '1'
                    ? setDataGallery([...dataGallery, ...response.data.results])
                    : setDataGallery([...response.data.results]);
                response.data.total_pages < query.params.page &&
                    setLastBtn(true);
            })
            .catch(error => showError(error.message))
            .finally(setShowLoader(false));
    }, [query]);
    const showError = message => {
        // setError({
        //     isError: true,
        //     message,
        // });
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
            await updateGallery(input);
        } else {
            const message = 'Input valid data!';
            showError(message);
        }

        //
        //
    };

    const updateGallery = async (input, page = 1) => {
        const newPage = page === 'next' ? Number(query.params.page) + 1 : page;

        setQuery(prev => ({
            ...prev,
            params: { ...prev.params, query: input, page: newPage },
        }));

        // setQuery({
        //     ...query,
        //     data: {
        //         ...query.data,
        //     },
        // });

        // await fetchData(query)
        //     .then(response => {
        //         page
        //             ? setDataGallery([...dataGallery, ...response.data])
        //             : setDataGallery([...response.data]);
        //         console.log(response);
        //     })
        //     .catch(error => showError(error.message))
        //     .finally(setShowLoader(false));

        // setDataGallery(
        //     page
        //         ? [...dataGallery, ...newDataGallery.data]
        //         : [...newDataGallery.data]
        // );
    };

    const handleMoreBtn = () => {
        setShowLoader(true);
        updateGallery(query.params.query, 'next');
    };

    const openModal = item => {
        setModal({
            ...modal,
            isOpen: true,
            img: item.urls.regular,
            likes: item.likes,
            alt: item.alt_description,
            author: item.user.name,
        });
        document.body.classList.add('no-scroll');
    };
    const closeModal = evt => {
        evt.target === evt.currentTarget && setModal({ isOpen: false });
        document.body.classList.remove('no-scroll');
    };
    return (
        <div className="app">
            <Loader showLoader={showLoader} />
            <SearchBar handleSubmit={handleSearchInput} />
            {dataGallery && (
                <ImageGallery data={dataGallery} openModal={openModal} />
            )}
            {showMoreBtn && <LoadMoreBtn handleMoreBtn={handleMoreBtn} />}

            {/* {error.isError && <ErrorMessage error={error} />} */}
            {modal.isOpen && (
                <ImageModal modal={modal} closeModal={closeModal} />
            )}
            <ErrorMessage />
        </div>
    );
};
export default App;
