import React from 'react';
import { Container } from 'native-base';
import { View, Text, Alert } from 'react-native';
import ItemsList from '../components/ItemsList';

import equipmentListStyles from '../styles/EquipmentListStyle';
import apiConfig from '../services/api/config';
import alertStrings from '../assets/strings/AlertStrings';

export default class ReturnEquipmentView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isReady: false,
        }
    }

    componentWillMount = async () => {
        await this.addItems();
        this.setState({isReady: true});
    }

    addItems = async () => {
        let fetchedItems = null;
        let data = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + apiConfig.clientId,
            },
        };

        await fetch(apiConfig.url + '/api-v1/rentalinfo/?status=ongoing', data)
            .then((response) => {this.setState({status: response.status}); return response.json()})
            .then((response) => {
                if(this.state.status === 200) {
                    fetchedItems = response;
                } else {
                    Alert.alert(alertStrings.unexpectedError);
                }
            })
            .catch(() => {
                Alert.alert(alertStrings.noConnectionWithServer);
                this.props.navigation.navigate('SignedOut')
            });

            this.setState({items: fetchedItems});
    }

    onReturnButtonPressed = (itemID, itemName) => {
        this.props.navigation.navigate('ReturnQR', {id: itemID, name: itemName});
    }

    onRefresh = async () => {
        await this.addItems();
    }

    render() {
        if(!this.state.isReady) {
            return <Expo.AppLoading />
        } else {
            return(
                <Container style={equipmentListStyles.container}>
                    {(!this.state.items || this.state.items.length===0) && (
                        <View style={equipmentListStyles.noDataTextContainer}>
                            <Text style={equipmentListStyles.noDataText}>Brak rekordów</Text>
                        </View>
                    )}
                    <ItemsList
                        onReturnButtonHandler={this.onReturnButtonPressed}
                        type='rented'
                        onRefresh={this.onRefresh}
                        items={this.state.items} />
                </Container>
            )
        }
    }
}