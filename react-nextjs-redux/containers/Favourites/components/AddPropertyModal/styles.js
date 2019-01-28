import config from '../../../../config';

const {
    styles: {
        colors,
        typography,
        space,
        gutter,
        fontstacks,
        breakpoints,
    },
} = config;

export default {
    container: {
        padding: [26, 20, 26, 26],
        backgroundColor: 'white',
        borderRadius: 0,
        height: '100vh',

        [breakpoints.md]: {
            borderRadius: 10,
            minHeight: '380px',
            height: 'calc(100vh - 130px)',
        }
    },

    close: {
        display: 'inline-block',
        padding: 20,
        margin: [-20, 0, 0, -20],
        cursor: 'pointer',
        backgroundColor: 'white',
    },

    closeIcon: {
        fill: colors.charcoal,
        outline: 'none!important',
        color: 'white',
        marginRight:10,
    },

    title: {
        display: 'block',
        marginBottom: `${space[3]}px!important`,
        color:'black',
        fontSize: `32px!important`,
        fontFamily: fontstacks.baseBold,
        lineHeight: '32px!important'
    },

    formError: {
        '& input': {
            border: `1px solid ${colors.darkAmaranth}!important`,
        },
    },

    error: {
        display: 'flex',
        flex: 1,
        alignSelf: 'flex-start',
        paddingBottom: '5px',
        fontSize: '15px',
        lineHeight: '16px',
        color: colors.darkAmaranth,
        fontFamily: fontstacks.baseBold,
    },

    options: {
        maxHeight: 300,
        padding: 0,
        margin: [0, 15, 0, 0],
        listStyle: 'none',
    },

    option: {
        borderTop: `1px solid ${colors.linkwater}`,
        textTransform: 'capitalize',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',

        '&:first-child': {
            borderTop: 0,
        },

        '&:hover': {
            backgroundColor: `${colors.whiteHover}!important`,
        },
    },

    optionTitle: {
        display: 'block',
        textTransform: 'capitalize',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        paddingRight: '40px',
        paddingLeft: '2px',
    },

    wishlistButton: {
        display: 'block!important',
        width: '100%',
        margin: 0,
        padding: `14px 0!important`,
        position: 'relative',
        ...typography.regular,
        textAlign: 'left',
        cursor: 'pointer',
        outline: 'none!important',
        backgroundColor: 'transparent',
    },

    optionIcon: {
        position: 'absolute',
        right: 0,
        marginRight: '5px',
        top: '50%',
        transform: 'translate(0, -50%)',
        fill: colors.midnightblue,
        width: '26px!important',
    },

    optionIconFill: {
        fill: colors.darkAmaranth,
    },

    createLink: {
        display: 'block',
        marginBottom: 10,
        fontWeight: 500,
        color: '#008B8B',
    },

    buttons: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: [space[2], 0],
    },

    closeButtonContainer: {
        flex: 1,
        width: '100%',
        padding: [5, 15],
        backgroundColor: 'white',
        display: 'block!important',
        alignItems: 'center',
        bottom: 0,
        left: 0,
        marginBottom: '15px',
        position: 'absolute',
        boxShadow: 'none',

        [breakpoints.md]: {
            display: 'none!important',
        }
    },

    closeButton: {
        flex: 1,
        width: '100%'
    },

    button: {
        flexGrow: 1,
        '&:last-child': {
            marginLeft: 10,
        },
    },

    confirmation : {
        textAlign: 'center',
        color: 'white',
        paddingBottom: 20,
    },

    confirm : {
        background: 'white',
        color: 'red',
        flexGrow: 1,
        borderRadius: 0,
    },

    cancelBtn : {
        background: 'red',
        color: 'white',
        flexGrow: 1,
        borderRadius: 0,
    },

    btnContainer : {
        display: 'flex',
    },

    modalPaddings : {
        padding: [ 20,  0,  0, ],

    },

};
