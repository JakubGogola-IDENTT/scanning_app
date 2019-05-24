import React from 'react';
import { Container } from 'native-base';
import { View, Text, Alert } from 'react-native';
import ItemsList from '../components/ItemsList';

import equipmentListStyles from '../styles/EquipmentListStyle';
import apiConfig from '../services/api/config';
import alertStrings from '../assets/strings/AlertStrings';

export default class HistoryView extends React.Component {

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

        await fetch(apiConfig.url + '/api-v1/rentalinfo/?status=finished', data)
            .then((response) => {this.setState({status: response.status}); return response.json()})
            .then((response) => {
                if(this.state.status === 200) {
                    fetchedItems = response.slice(Math.max(response.length - 20, 0));
                    console.log(fetchedItems);
                } else {
                    Alert.alert(alertStrings.unexpectedError);
                    this.props.navigation.navigate('SignIn');
                }
            })
            .catch(() => {
                Alert.alert(alertStrings.noConnectionWithServer);
                this.props.navigation.navigate('SignedOut');
            });

            this.setState({items: fetchedItems});
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
                        type='history'
                        onRefresh={this.onRefresh}
                        items={this.state.items} />
                </Container>
            )
        }
    }
}