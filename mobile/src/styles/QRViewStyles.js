import { StyleSheet } from 'react-native';

const QRViewStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemName: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#0d4579',
        marginBottom: 15,   
    },
    itemID: {
        fontSize: 13,
        marginTop: 10,
    }
});

module.exports = QRViewStyles;