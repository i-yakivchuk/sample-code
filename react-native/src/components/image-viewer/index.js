import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import Variables from '../../constants/variables';
import ImageZoomViewer from 'react-native-image-zoom-viewer';
import Ionicons from 'react-native-vector-icons/Ionicons';


/**
 * ImageViewer - component for rendering conversation system message.
 *
 * @param images - array images.
 * @param visible - show image viewer component.
 * @param onClose - close callback function.
 */
const ImageViewer = ({ visible, images, onClose }) => (
	<Modal visible={visible} animationType={'fade'} transparent={true} onRequestClose={() => { onClose(); }}>
		<ImageZoomViewer
			imageUrls={images}
			maxOverflow={0}
			saveToLocalByLongPress={false}
			enableSwipeDown={false}
			renderIndicator={ () => null }
			backgroundColor={'rgba(0, 0, 0, 0.9)'}
			enableImageZoom={false}
			onSwipeDown={() => { onClose(); }}
			renderHeader={() => (
				<TouchableOpacity style={styles.header} onPress={() => { onClose(); }}>
					<Ionicons name={'ios-arrow-back'} size={32} color={Variables.white} />
					<Text style={styles.close}>Back</Text>
				</TouchableOpacity>
			)}
		/>
	</Modal>
);

/**
 * ImageViewer component's property types.
 *
 * @static
 */
ImageViewer.propTypes = {
	visible: PropTypes.bool.isRequired,
	images: PropTypes.array.isRequired,
	onClose: PropTypes.func.isRequired
};

/**
 * Generic styles for a SystemMessage component.
 *
 * @type {Object}
 */
const styles = StyleSheet.create({
	header: {
		paddingVertical: 10,
		paddingHorizontal: 12,
		alignItems: 'center',
		justifyContent: 'flex-start',
		flexDirection: 'row',
	},
	close: {
		paddingLeft: 7,
		paddingBottom: 2,
		backgroundColor: Variables.transparent,
		color: Variables.white,
		fontSize: 17,
		fontFamily: Variables.baseFont
	}
});

export default ImageViewer;
