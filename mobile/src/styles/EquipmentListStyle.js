import { StyleSheet } from 'react-native';

const equipmentListStyles = StyleSheet.create({
    card: {
        marginRight: 10,
        marginLeft: 10,
        fontFamily: 'Roboto_medium',
    },

    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#82868c',
    },

    cardItem: {
        padding: 0,
        margin: 0,
        /*marginRight: 10,
        marginLeft: 10,*/
        flexDirection: 'row',
    },

    itemInfo: {
        fontSize: 13,
        marginTop: 5,
        marginBottom: 5,
        flexDirection: 'row',
    },

    titleText: {
        fontSize: 15,
        marginRight: 5,
        fontWeight: '100',
    },

    description: {
        //position: 'absolute',
        fontSize: 13,
        color: '#fff',
        //right: 0,
        marginTop: 5,
        marginBottom: 5,
        marginRight: 10,
        backgroundColor: '#3b82c4', 
        borderRadius: 5,
        padding: 3,
    },
    icon: {
        fontSize: 40, 
        marginRight: 20,
        position: 'absolute',
        right: 0,
    },

    searchIcon: {
        fontSize: 35,
        marginRight: 20,
        marginBottom: 0,
    },

    container: {
        marginTop: 30,
    },

    //Style of input field for login and registration panels
    input: {
        marginRight: 30,
        marginLeft: 30,
        marginBottom: 12,
        borderColor: '#3b82c4',
        borderBottomWidth: 2,
        flexDirection: 'row',
    },

    inputField: {
        padding: 4,
        fontSize: 20,
    },

    logo: {
        width: 75,
        height: 55,
    }, 

    logoContainer: {
        alignItems: 'center',
    },

    filtersContainer: {
        paddingTop: 10,
        flexDirection: 'row',
        alignItems: 'stretch',
    },

    optionsButton: {
        position: 'absolute',
        right: 0,
    },  

    optionsIcon: {
        fontSize: 35,
        marginRight: 20,
        marginBottom: 0,
    },

    noDataTextContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    
    noDataText: {
       fontSize: 20,
    }

});

module.exports = equipmentListStyles;
