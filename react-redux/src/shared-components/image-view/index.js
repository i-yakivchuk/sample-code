/**
 * Created by ivan on 13.03.18.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Loader } from './../../components';

class ImageView extends Component {

	constructor(props) {
		super(props);

		this.state = { loading: true, error: false };
		this.renderError = this.renderError.bind(this);
	}

	componentDidMount() {
		const img = new Image();

		img.onload = () => { this.setState({ loading: false }); };
		img.onerror = () => { this.setState({ error: true, loading: false }); };
		img.src = this.props.src;
	}

	renderError() {
		return <div className='mn-image-error'><i className='fa fa-exclamation-triangle' /> Image not found!</div>
	}

	render() {
		const { loading, error } = this.state;

		return (
			<div className='mn-image-view'>
				{ loading && (<Loader />) }
				{ error && this.renderError()}
				{ !loading && !error && this.props.src && (<div className='mn-image' style={{ backgroundImage: 'url(' + this.props.src + ')' }}></div>)}
		</div>
		);
	}
};


const select = state => { return {} };
export default connect(select, { })(ImageView);