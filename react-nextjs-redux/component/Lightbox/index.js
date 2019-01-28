import React from 'react';
import PropTypes from 'prop-types';
import Ligthbox from './Lightbox';
import getComponentMethods from '../../utils/getComponentMethods';

class LightboxContainer extends React.PureComponent {
    constructor() {
        super();

        this.methods = getComponentMethods(this);

        this.state = {
            currentImageIndex: 0,
        };
    }

		componentWillReceiveProps(nextProps) {
				const { currentImageIndex } = nextProps;

				if (currentImageIndex !== this.props.currentImageIndex) {
						this.setState({ currentImageIndex });
				}
		}

    onClose() {
        if (this.props.onClose) {
            this.props.onClose && this.props.onClose();
		        this.setState({ currentImageIndex: 0 });
        }
    }

    onClickThumbnail(currentImageIndex) {
        this.setState({ currentImageIndex });
        this.props.onImageChange(currentImageIndex);
    }

    onPrevImage() {
        const currentImageIndex = this.state.currentImageIndex - 1;
        this.setState({ currentImageIndex });
        this.props.onImageChange(currentImageIndex);
    }

    onNextImage() {
        const currentImageIndex = this.state.currentImageIndex + 1;
        this.setState({ currentImageIndex });
        this.props.onImageChange(currentImageIndex);
    }

    generateProps() {
        return {
            ...this.state,
            ...this.props,
            ...this.methods,
        };
    }

    render() {
        const props = this.generateProps();
        return <Ligthbox {...props} />;
    }
}

LightboxContainer.defaultProps = {
    onImageChange: () => {},
};

LightboxContainer.propTypes = {
    onClose: PropTypes.func,
    isOpen: PropTypes.bool.isRequired,
    onImageChange: PropTypes.func,
    currentImageIndexIndex: PropTypes.number, // takes priority over internal state index
};

export default LightboxContainer;
