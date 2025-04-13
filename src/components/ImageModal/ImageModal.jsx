import s from './ImageModal.module.css';
import { FiHeart } from 'react-icons/fi';
import { BsPerson } from 'react-icons/bs';

const ImageModal = ({ modal, closeModal }) => {
    console.log('modal ', modal);
    return (
        <div className={s.modalWrapper} onClick={closeModal}>
            <div className={s.imgWrapper}>
                <img src={modal.img} alt={modal.alt} className={s.image} />
                <div className={s.stats}>
                    <span className={s.span}>
                        <FiHeart /> {modal.likes}
                    </span>
                    <span className={s.span}>{modal.alt}</span>
                    <span className={s.span}>
                        <BsPerson /> {modal.author}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ImageModal;
