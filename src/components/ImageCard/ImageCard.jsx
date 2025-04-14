import s from './ImageCard.module.css';
const ImageCard = ({ ...item }) => {
    const { alt_description, description, urls, openModal } = item;
    return (
        <>
            <img
                src={urls.small}
                alt={alt_description}
                className={s.image}
                onClick={() => openModal(item)}
            />
        </>
    );
};

export default ImageCard;
