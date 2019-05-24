import { StyleSheet } from 'react-native';

const homeStyles = StyleSheet.create({

    title: {
        paddingTop: 10,
        fontSize: 30,
        fontWeight: 'bold',
    },

   background: {
    flex: 1,
    },

   logoContainer: {
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 30,
    },

    logoStyle: {
        width: 190,
        height: 80,
    },
    icons: {
        fontSize: 27,
        color: '#d9e1e8',
    },
});

module.exports = homeStyles;
