/**
 * Created by ivan on 13.01.18.
 */
export const toDataURL = (url, callback) => {
	let xhr = new XMLHttpRequest();
	xhr.onload = function() {

		let reader = new FileReader();
		reader.onloadend = function() {
			callback(reader.result);
		};

		reader.readAsDataURL(xhr.response);
	};

	xhr.open('GET', url);
	xhr.responseType = 'blob';
	xhr.send();
};

//Fix For IE
if (!String.prototype.startsWith) {
	String.prototype.startsWith = function(searchString, position) {
	  position = position || 0;
	  return this.indexOf(searchString, position) === position;
	};
}