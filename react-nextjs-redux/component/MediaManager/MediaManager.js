import React from 'react';
import applyStyles from 'next-style-loader/applyStyles';
import PropTypes from 'prop-types';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import style from './style.scss';
import SVG from '../../component/SVG';
import FileDropZone from '../../component/FileDropZone';
import Lightbox from '../../component/Lightbox';
import Button from '../../component/Buttons';


const SortableItem = SortableElement(({ value, imageIndex, toggleOpen }) =>
	(
    <div
        key={`sort-item-${imageIndex}`}
        className={style.image}
        onClick={() => { toggleOpen(true, imageIndex); } }
    >
        <img src={value} width={100} height={100} />
        <span className={style.icon}><SVG icon="pencil" className="icon pencil small" /></span>
    </div>
	)
);


const SortableList = SortableContainer(({ items, toggleOpen }) => {
    return (
        <div className="container">
            {items.map((item, index) =>
				(<SortableItem key={`item-${index}`} toggleOpen={toggleOpen} index={index} imageIndex={index} value={item.src} />)
			)}
        </div>
    );
});


const MediaManager = ({
    isOpen,
    toggleOpen,
    media,
    onFileChange,
    onDeleteImage,
    onImageChange,
    currentImageIndex,
		onSortEnd,
}) => (
    <div>
        <div className={style.mediaContainer}>
            <SortableList
                helperClass={style.sortImagesContainer}
                pressThreshold={10}
                pressDelay={250}
                items={media}
                onSortEnd={onSortEnd}
                toggleOpen={toggleOpen}
                axis="xy"
            />
            <FileDropZone onFileChange={onFileChange} />
        </div>
        <Lightbox
            isOpen={isOpen}
            onClose={() => toggleOpen(false, 0)}
            customControls={[
                <Button className={style.delete} onClick={onDeleteImage}>
                    <SVG icon="binround" className="icon binround small" />
                </Button>,
            ]}
            onImageChange={onImageChange}
            images={media}
            currentImageIndex={currentImageIndex}
        />
    </div>
);

MediaManager.propTypes = {
    isOpen: PropTypes.bool,
    toggleOpen: PropTypes.func,
    media: PropTypes.arrayOf(PropTypes.object),
    onFileChange: PropTypes.func,
    onDeleteImage: PropTypes.func,
    onImageChange: PropTypes.func,
    onSortEnd: PropTypes.func,
    onUpdateSort: PropTypes.func,
    onResetSort: PropTypes.func,
    currentImageIndex: PropTypes.number,
};

export default applyStyles(style)(MediaManager);
