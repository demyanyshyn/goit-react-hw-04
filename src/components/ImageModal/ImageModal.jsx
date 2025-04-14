import s from './ImageModal.module.css';
import { FiHeart } from 'react-icons/fi';
import { BsPerson } from 'react-icons/bs';

import Modal from 'react-modal';
Modal.setAppElement('#root');
const customStyles = {
    overlay: {
        backdropFilter: 'blur(5px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        zIndex: '3',
        backgroundColor: 'rgba(0, 0, 0, 0.301)',
    },

    content: {
        border: 0,
        display: 'flex',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '0',
        padding: 0,
        height: 'fit-content',
        opacity: 1,
        background: 'none',
        inset: 0,
        overflow: 'visible',
    },
};

const ImageModal = ({ modal, modalIsOpen, closeModal }) => {
    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel={modal?.id}
        >
            <div className={s.imgWrapper}>
                <img
                    src={modal?.urls.regular}
                    alt={modal?.alt_description}
                    className={s.image}
                />
                <div className={s.stats}>
                    <span className={s.span}>
                        <FiHeart /> {modal?.likes}
                    </span>
                    <span className={s.span}>{modal?.alt_description}</span>
                    <span className={s.span}>
                        <BsPerson /> {modal?.user.name}
                    </span>
                </div>
            </div>
        </Modal>
    );
};

export default ImageModal;
