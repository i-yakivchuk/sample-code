import React from 'react';
import MediaManager from './MediaManager';
import getComponentMethods from '../../utils/getComponentMethods';
import { arrayMove } from 'react-sortable-hoc';


class MediaManagerContainer extends React.PureComponent {
    constructor() {
        super();

        this.methods = getComponentMethods(this);

        this.state = {
            isOpen: false,
            currentImageIndex: 0,
        };
    }

    onImageChange(index) {
        this.setState({ currentImageIndex: index });
    }

    onDeleteImage() {
        const media = this.getMedia();
        const selectedMedia = media[this.state.currentImageIndex];
        this.props.onDeleteImage(selectedMedia.id);

        this.setState({ isOpen: false });
    }

    onFileChange(FileList) {
        const targetId = this.props.formData.id;
        // Add meta to files to associate to a property
        for (const file of FileList) {
            file.meta = { targetId, targetType: 'properties' };
        }

        this.props.onFileChange(FileList);
    }

    getMedia() {
        const { formData = {} } = this.props;
        return formData.media || [];
    }

    toggleOpen(isOpen, index) {
        this.setState({ isOpen, currentImageIndex: index });
    }

    onSortEnd({ oldIndex, newIndex }) {
		    const media = this.getMedia();
        const sortMedia = arrayMove(media, oldIndex, newIndex);

        this.props.onSortMedia(sortMedia);
		    this.props.onUpdateSortMedia(sortMedia);
    }

    generateProps() {
        return {
            ...this.props,
            ...this.state,
            ...this.methods,
            media: this.getMedia(),
        };
    }

    render() {
        const props = this.generateProps();
        return <MediaManager {...props} />;
    }
}

export default MediaManagerContainer;
