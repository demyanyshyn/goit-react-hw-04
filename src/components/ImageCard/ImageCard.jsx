import s from './ImageCard.module.css';
const ImageCard = ({ ...item }) => {
    const { alt_description, description, urls, openModal } = item;
    return (
        <div className={s.imageWrapper} onClick={() => openModal(item)}>
            <img src={urls.small} alt={alt_description} className={s.image} />
        </div>
    );
};

export default ImageCard;
