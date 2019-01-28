export default {
    // No Select
    noSelect: {
        '-webkit-touch-callout': 'none',
        '-webkit-user-select': 'none',
        '-khtml-user-select': 'none',
        '-moz-user-select': 'none',
        '-ms-user-select': 'none',
        'user-select': 'none',
    },

    // Hex to RGBA
    rgba: (hex, opacity) => {
        const color = [255, 255, 255];

        if (hex.length === 4) {
            let extendedColor = '#';
            for (let i = 1; i < hex.length; i++) {
                extendedColor += hex.charAt(i) + hex.charAt(i);
            }
            hex = extendedColor;
        }

        color[0] = parseInt(hex.substr(1, 2), 16);
        color[1] = parseInt(hex.substr(3, 2), 16);
        color[2] = parseInt(hex.substr(5, 2), 16);

        return `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${opacity})`;
    },
};