import helpers from './helpers';

const styles = {
    // Fontstacks
    fontstacks: {
        primary: 'Alleyn, Helvetica Neue, Helvetica, Arial, sans-serif',
        secondary: 'Helvetica Neue, Helvetica, Arial, sans-serif',
        baseRegular: 'GT-Haptik-Regular, sans-serif',
        baseBold: 'GT-Haptik-Bold, sans-serif'
    },

    // Colours
    colors: {
        amaranth: '#f53e46',
        darkAmaranth: '#e93940',
        mahogany: '#d13138',

        lilt: '#31c775',
        washedJade: '#d5fdd3',

        linkwater: '#d1d6dd',
        darkLinkwater: '#c5c9d0',
        aliceBlue: '#f0f4f9',
        darkAliceBlue: '#dee7f2',
        charcoal: '#484848',
        foggy: '#788895',

        white: '#ffffff',
        whiteHover: '#F9F9F9',
        black: '#050202',
		    mainText: '#140830',
		    midnightblue: '#140830'
    },

    // Breakpoints
    breakpoints: {
        xs: '@media only screen and (min-width: 320px)',
        sm: '@media only screen and (min-width: 540px)',
        md: '@media only screen and (min-width: 768px)',
        lg: '@media only screen and (min-width: 1084px)',
        xlg: '@media only screen and (min-width: 1400px)',
    },

    // Space
    space: [
        6,
        12,
        18,
        24,
        30,
        36,
        42,
        48,
        64,
        112,
        144,
    ],

    // Gutter
    gutter: [
        '.5rem',
        '1rem',
        '2rem',
    ],

    // Helpers
    helpers,
};

// Typography
styles.typography = {
    title1: {
        margin: [0, 0, styles.space[3]],
        padding: 0,
        fontSize: 24,
        lineHeight: '28px',
        fontWeight: 500,

        [styles.breakpoints.sm]: {
            fontSize: 44,
            lineHeight: '56px',
        },
    },
    title2: {
        margin: [0, 0, styles.space[3]],
        padding: 0,
        fontSize: 32,
        lineHeight: '36px',
        fontWeight: 500,
    },
    title3: {
        margin: [0, 0, styles.space[2]],
        padding: 0,
        fontSize: 19,
        lineHeight: '24px',
        fontWeight: 500,

        [styles.breakpoints.sm]: {
            fontSize: 24,
            lineHeight: '28px',
        },
    },
    large: {
        margin: [0, 0, styles.space[2]],
        padding: 0,
        fontSize: 19,
        lineHeight: '24px',
        fontWeight: 500,
    },
    regular: {
        fontSize: 16,
        lineHeight: '28px',
    },
    small: {
        fontSize: 14,
        lineHeight: '18px',
    },
    micro: {
        fontSize: 12,
        lineHeight: '16px',
        textTransform: 'uppercase',
        fontWeight: 500,
    },
};

export default styles;
