import GridLoader from 'react-spinners/GridLoader';
import s from './Loader.module.css';
const Loader = ({ showLoader }) => {
    console.log('showLoader: ', showLoader);
    return (
        <>
            {showLoader && (
                <div className={s.loaderWrapper}>
                    <GridLoader />
                </div>
            )}
        </>
    );
};
export default Loader;
