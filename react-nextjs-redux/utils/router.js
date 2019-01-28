import qs from 'qs';
import Router from 'next/router';

export const getQueryFiltersUrlParams = (store) => {
		const { sort, filters, placesSearchValue, lat, lng, radius, mapZoom } = store;
		let query = '';

		if (typeof placesSearchValue !== 'undefined' && placesSearchValue !== '') {
				query += (query !== '' ? '&' : '') + `location=${encodeURIComponent(placesSearchValue)}`;
		}

		if (typeof lat !== 'undefined' && lat !== '') {
				query += (query !== '' ? '&' : '') + `lat=${lat}`;
		}

		if (typeof lng !== 'undefined' && lng !== '') {
				query += (query !== '' ? '&' : '') + `lng=${lng}`;
		}

		if (typeof filters.price !== 'undefined') {
				query += (query !== '' ? '&' : '') + `minPrice=${filters.price[0]}`;
				query += (query !== '' ? '&' : '') + `maxPrice=${filters.price[1]}`;
		}

		if (typeof filters.bathrooms !== 'undefined') {
				query += (query !== '' ? '&' : '') + `minBathrooms=${filters.bathrooms[0]}`;
				query += (query !== '' ? '&' : '') + `maxBathrooms=${filters.bathrooms[1]}`;
		}

		if (typeof filters.bedrooms !== 'undefined') {
				query += (query !== '' ? '&' : '') + `minBedrooms=${filters.bedrooms[0]}`;
				query += (query !== '' ? '&' : '') + `maxBedrooms=${filters.bedrooms[1]}`;
		}

		if (typeof filters.type !== 'undefined') {
				query += (query !== '' ? '&' : '') + `type=${filters.type}`;
		}

		if (typeof sort !== 'undefined') {
				query += (query !== '' ? '&' : '') + `sort=${sort}`;
		}

		if (typeof radius !== 'undefined') {
				query += (query !== '' ? '&' : '') + `radius=${radius}`;
		}

		if (typeof mapZoom !== 'undefined') {
				query += (query !== '' ? '&' : '') + `mapZoom=${mapZoom}`;
		}

		return query;
};

export const getAllUrlParams = (url) => {

		// get query string from url (optional) or window
		var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

		// we'll store the parameters here
		var obj = {};

		// if query string exists
		if (queryString) {

				// stuff after # is not part of query string, so get rid of it
				queryString = queryString.split('#')[0];

				// split our query string into its component parts
				var arr = queryString.split('&');

				for (var i=0; i<arr.length; i++) {
						// separate the keys and the values
						var a = arr[i].split('=');

						// in case params look like: list[]=thing1&list[]=thing2
						var paramNum = undefined;
						var paramName = a[0].replace(/\[\d*\]/, function(v) {
								paramNum = v.slice(1,-1);
								return '';
						});

						// set parameter value (use 'true' if empty)
						var paramValue = typeof(a[1])==='undefined' ? true : a[1];

						// (optional) keep case consistent
						paramName = paramName.toLowerCase();
						paramValue = paramValue.toLowerCase();

						// if parameter name already exists
						if (obj[paramName]) {
								// convert value to array (if still string)
								if (typeof obj[paramName] === 'string') {
										obj[paramName] = [obj[paramName]];
								}
								// if no array index number specified...
								if (typeof paramNum === 'undefined') {
										// put the value on the end of the array
										obj[paramName].push(paramValue);
								}
								// if array index number specified...
								else {
										// put the value at that index number
										obj[paramName][paramNum] = paramValue;
								}
						}
						// if param name doesn't exist yet, set it
						else {
								obj[paramName] = paramValue;
						}
				}
		}

		return obj;
};

/**
 * @function getFormattedFilters - get valid filters objects for serch properties
 *
 * @param filters - query strign filters params
 */
export const getFormattedFilters = (filters) => {
		let state = {};
		let _filters = {};

		//get price values for properties filter
		if (typeof filters.minprice !== 'undefined' && typeof filters.maxprice !== 'undefined') {
				let price = [parseInt(filters.minprice), parseInt(filters.maxprice)];
				if (parseInt(price[0]) > parseInt(price[1]) && parseInt(price[1]) !== 0) {
						price = [price[1], price[0]];
				}
				_filters = Object.assign({}, _filters, { price: price });
		} else {
				_filters = Object.assign({}, _filters, { price: [0, 0] });
		}

		//get bathrooms filter values for properties filter
		if (typeof filters.minbathrooms !== 'undefined' && typeof filters.maxbathrooms !== 'undefined') {
				let bathrooms = [parseInt(filters.minbathrooms), parseInt(filters.maxbathrooms)];
				if (parseInt(bathrooms[0]) > parseInt(bathrooms[1]) && parseInt(bathrooms[1]) !== 0) {
						bathrooms = [bathrooms[1], bathrooms[0]];
				}
				_filters = Object.assign({}, _filters, { bathrooms: bathrooms });
		} else {
				_filters = Object.assign({}, _filters, { bathrooms: [0, 0] });
		}

		//get bedrooms filter values for properties filter
		if (typeof filters.minbedrooms !== 'undefined' && typeof filters.maxbedrooms !== 'undefined') {
				let bedrooms = [parseInt(filters.minbedrooms), parseInt(filters.maxbedrooms)];
				if (parseInt(bedrooms[0]) > parseInt(bedrooms[1]) && parseInt(bedrooms[1]) !== 0) {
						bedrooms = [bedrooms[1], bedrooms[0]];
				}
				_filters = Object.assign({}, _filters, { bedrooms: bedrooms });
		} else {
				_filters = Object.assign({}, _filters, { bedrooms: [0, 0] });
		}

		//get filter properties type
		if (typeof filters.type !== 'undefined') {
				_filters = Object.assign({}, _filters, { type: filters.type });
		}

		//get sort for filter
		if (typeof filters.sort !== 'undefined') {
				state = Object.assign({}, state, { sort: filters.sort });
		}

		//get lat for filter
		if (typeof filters.lat !== 'undefined' && !isNaN(filters.lat)) {
				state = Object.assign({}, state, { lat: parseFloat(filters.lat) });
		}

		//get lng for filter
		if (typeof filters.lng !== 'undefined' && !isNaN(filters.lng)) {
				state = Object.assign({}, state, { lng: parseFloat(filters.lng) });
		}

		if (typeof filters.location !== 'undefined') {
				state = Object.assign({}, state, { location: capitalizeFirstLetter(decodeURIComponent(filters.location)) });
		}

		if (typeof filters.radius !== 'undefined' && !isNaN(filters.radius)) {
				state = Object.assign({}, state, { radius: parseFloat(filters.radius) });
		}

		if (typeof filters.mapzoom !== 'undefined' && !isNaN(filters.mapzoom)) {
				state = Object.assign({}, state, { mapZoom: parseInt(filters.mapzoom) });
		}

		return Object.assign({}, state, { filters: _filters });
};

export const capitalizeFirstLetter = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
};
