import React from 'react';

import PropTypes from 'prop-types';

CircledNumber.propTypes = {
	value: PropTypes.number
};

export default function CircledNumber({value}) {
    if (value && value > 0) {
        return (<div className='circledNumber'>{value}</div>);
    } else {
        return '';
    }
}