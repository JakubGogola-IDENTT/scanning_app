import {StyleSheet} from 'react-native';

const qrScannerStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
      },
      bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        padding: 0,
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
      },
      url: {
        flex: 1,
      },
      urlText: {
        color: '#fff',
        fontSize: 20,
      },
      cancelButton: {
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center',
      },
      cancelButtonText: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 18,
      },
      datePickerContainer: {
        borderBottomColor: '#3b82c4',
        borderBottomWidth: 2,
        padding: 0,
        marginRight: 7,
        width: 120,
        height: 40,
        //maxHeight: 50,
      },
      rentButton: {
        backgroundColor: '#3b82c4',
        marginLeft: 7,
        marginRight: 5,
      },
      idInputContainer: {
        width: 100,
        height: 50,
        marginLeft: 0,
      },
      infoText: {
        paddingTop: 5,
        fontSize: 22,
      }, 
});

module.exports = qrScannerStyles;