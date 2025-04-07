import s from './SearchBox.module.css';
const SearchBox = ({ inputValue, handleInput }) => {
    return (
        <div className={s.searchBox}>
            <p>Search contacts by name or number</p>
            <input
                value={inputValue}
                type="text"
                name="search"
                onChange={handleInput}
            />
        </div>
    );
};

export default SearchBox;
