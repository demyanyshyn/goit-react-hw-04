import s from './LoadMoreBtn.module.css';
const LoadMoreBtn = ({ handleMoreBtn, lastBtn }) => {
    return (
        <>
            <button
                type="button"
                onClick={handleMoreBtn}
                disabled={lastBtn}
                className={s.button}
            >
                Load more
            </button>
        </>
    );
};

export default LoadMoreBtn;
