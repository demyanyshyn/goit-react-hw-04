import GridLoader from 'react-spinners/GridLoader';
import s from './Loader.module.css';
const Loader = () => {
    return (
        <>
            <div className={s.loaderWrapper}>
                <GridLoader />
            </div>
        </>
    );
};
export default Loader;
