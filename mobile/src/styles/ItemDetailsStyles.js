
import { StyleSheet } from 'react-native';

const itemDetailsStyles = StyleSheet.create({

    background: {
        flex: 1,
        alignItems: 'center',
        },
    
    imageContainer: {
        marginTop: 80,
    },

    text: {
        marginTop: 5,    
    },

    nameText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#3b82c4',
    },

    typeText: {
        //fontWeight: 'bold',
        //color: '#0d4579',
        marginTop: 5
    },

    availableText: {
        color: '#008000'
    },

    unavailableText: {
        color: '#FF0000'
    },

    desciptionContainer: {
        marginTop: 20,
    },

    desciptionTitle: {
        color: '#0d4579',
    },

    desciptionText: {
        marginTop: 5,
    },

    textContainer: {
        alignContent: 'flex-start',
        marginLeft: 10,
        marginTop: 20,
        width: 300,
    } 
    
});

module.exports = itemDetailsStyles;