export default (bounds) => {
    const center = bounds.getCenter();
    const ne = bounds.getNorthEast();

    // r = radius of the earth in statute miles
    const r = 3963.0;

    // Convert lat or lng from decimal degrees into radians (divide by 57.2958)
    const lat1 = center.lat() / 57.2958;
    const lon1 = center.lng() / 57.2958;
    const lat2 = ne.lat() / 57.2958;
    const lon2 = ne.lng() / 57.2958;

    // distance = circle radius from center to Northeast corner of bounds
    const dis = r * Math.acos(Math.sin(lat1) * Math.sin(lat2) + 
        Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1));

    return Math.ceil(dis * 1609.34) * 0.6; // Miles to metres
};
