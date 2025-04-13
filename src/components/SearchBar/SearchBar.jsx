import clsx from 'clsx';
import s from './SearchBar.module.css';
import { useState, useEffect } from 'react';
import { LuScanSearch } from 'react-icons/lu';

const SearchBar = ({ handleSubmit }) => {
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY) {
                setIsHeaderVisible(false);
            } else {
                setIsHeaderVisible(true);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const handleClick = e => {
        e.preventDefault();
    };
    return (
        <header className={clsx(s.header, { [s.hidden]: !isHeaderVisible })}>
            <form className={s.form} onSubmit={handleSubmit}>
                <input
                    className={s.input}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    name="search"
                    placeholder="Search images and photos"
                />
                <button className={s.button} type="Submit">
                    <LuScanSearch />
                </button>
            </form>
        </header>
    );
};

export default SearchBar;
