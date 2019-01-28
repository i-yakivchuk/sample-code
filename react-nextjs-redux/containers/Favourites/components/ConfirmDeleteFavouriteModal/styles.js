import config from '../../../../config';

const {
    styles: {
        fontstacks,
        colors,
        breakpoints,
    },
} = config;

export default {
    confirmation : {
        textAlign: 'center',
        paddingBottom: 20,
        color: colors.white,
        fontSize: 20,
        fontFamily: fontstacks.baseBold,
        lineHeight: '32px',

        [breakpoints.md]: {
            fontSize: 26,
        }
    },

    confirm : {
        background: 'white',
        color: 'red',
        flexGrow: 1,
        borderRadius: 0,
    },

    cancelBtn : {
        flexGrow: 1,
        marginRight: 15,
    },

    btnContainer : {
        display: 'flex',
        padding: [ 10, 15],
    },

    modalPaddings : {
        padding: [ 20,  0,  0, ],
        backgroundColor: colors.darkAmaranth,
        borderRadius: 0,

        [breakpoints.md]: {
            borderRadius: 10,
        }
    },

    confirmMessage : {
        padding: [ 10, 10 ],
    }
};
