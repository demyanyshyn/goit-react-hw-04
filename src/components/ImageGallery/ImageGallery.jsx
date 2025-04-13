import ImageCard from '../ImageCard/ImageCard';

import s from './ImageGallery.module.css';
const ImageGallery = ({ data, openModal }) => {
    return (
        <div className={s.galleryWrapper}>
            {data.map(item => (
                <ImageCard key={item.id} {...item} openModal={openModal} />
            ))}
        </div>
    );
};

export default ImageGallery;
