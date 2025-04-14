import ImageCard from '../ImageCard/ImageCard';

import s from './ImageGallery.module.css';
const ImageGallery = ({ data, openModal }) => {
    return (
        <ul className={s.galleryWrapper}>
            {data.map(item => (
                <li key={item.id} className={s.imageWrapper}>
                    <ImageCard {...item} openModal={openModal} />
                </li>
            ))}
        </ul>
    );
};

export default ImageGallery;
