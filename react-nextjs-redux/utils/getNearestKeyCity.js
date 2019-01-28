import getDistanceBetweenPoints from './getDistanceBetweenPoints';

const keyCities = {
    Cardiff: { lat: 51.4816, lng: -3.1791, edgeRadius: 6.68 },
    Leeds: { lat: 53.8008, lng: -1.5491, edgeRadius: 13.25 },
    Plymouth: { lat: 50.3755, lng: -4.1427, edgeRadius: 5.04 },
    Birmingham: { lat: 52.4862, lng: -1.8904, edgeRadius: 9.23 },
    London: { lat: 51.5074, lng: -0.1278, edgeRadius: 22.36 },
    Swansea: { lat: 51.6214, lng: -3.9436, edgeRadius: 11.11 },
    Bristol: { lat: 51.4545, lng: -2.5879, edgeRadius: 13.25 },
    Oxford: { lat: 51.7520, lng: -1.2577, edgeRadius: 3.80 },
    Nottingham: { lat: 52.9548, lng: -1.1581, edgeRadius: 4.87 },
    Loughborough: { lat: 52.7721, lng: -1.2062, edgeRadius: 3.34 },
    Lincoln: { lat: 53.2307, lng: -0.5406, edgeRadius: 3.37 },
    Manchester: { lat: 53.4808, lng: -2.2426, edgeRadius: 6.07 },
    Sheffield: { lat: 53.3811, lng: -1.4701, edgeRadius: 10.82 },
    Newcastle: { lat: 54.9783, lng: -1.6178, edgeRadius: 10.70 },
};

export default (lat, lng) => {
    const distances = Object.keys(keyCities).map((city) => {
        const { lat: lat1, lng: lng1, edgeRadius } = keyCities[city];
        const distanceToCentre = getDistanceBetweenPoints(lat1, lng1, lat, lng);
        const distanceToEdge = distanceToCentre < edgeRadius ? 0 : distanceToCentre - edgeRadius;
        return { nearestKeyCity: city, distanceToEdge, distanceToCentre };
    })
    .sort((a, b) => {
        return (a.distanceToEdge - b.distanceToEdge);
    });
    return distances[0];
};
