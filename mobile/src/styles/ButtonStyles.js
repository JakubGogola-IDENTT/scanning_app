import { StyleSheet } from 'react-native';

const buttonStyles = StyleSheet.create({
    // Button styles
    actionButton: {
        alignItems: 'center',
        marginTop: 5,
        backgroundColor: '#3b82c4',
        marginRight: 50,
        marginLeft: 50,
        padding: 10,
        overflow: 'hidden',
        flexDirection: 'row',
        alignSelf: 'center',
        width: 250,
        height: 50,
    },

    buttonContainer: {  
        alignItems: 'center', 
        // shadowColor: '#0d4579',
        // shadowOpacity: 0.5,
        // shadowRadius: 10,
        // elevation: 3,
        zIndex: 999,
        padding: 20,
    },

    textContainer: {
        justifyContent: 'center', 
        alignItems: 'center', 
        width: 230,
        paddingRight: 20,
    },

    buttonText: {
        color: '#fff',
        fontSize: 25,
        alignSelf: 'center',
    },

    icons: {
        width: 20,
        fontSize: 23,
        color: '#d9e1e8',
    },

});

module.exports = buttonStyles;