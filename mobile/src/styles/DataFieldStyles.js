import { StyleSheet } from 'react-native';

const dataEditFieldStyles = StyleSheet.create({
    // Button styles
    fieldContainer: {  
        alignItems: 'center', 
        flexDirection: 'row',
        margin: 15,
        width: 300,
    },

    titleContainer: {
        flexDirection: 'row',
    },

    titleText: {
        color: '#82868c',
    },

    dataText: {
        fontSize: 20,
    },

    textContainer: { 
        width: 240,
    },

    icon: {
        fontSize: 27,
        color: '#3b82c4',
        marginRight: 15,

    },

    editIcon: {
        fontSize: 35,
        color: '#0d4579',
        marginLeft: 20,
    },



});

module.exports = dataEditFieldStyles;