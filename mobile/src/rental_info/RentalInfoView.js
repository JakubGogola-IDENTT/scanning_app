import React from 'react';
import { Container } from 'native-base';
import { View, Text, Alert } from 'react-native';
import ItemsList from '../components/ItemsList';

import equipmentListStyles from '../styles/EquipmentListStyle';

export default class RentalInfoView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isReady: false,
        }
    }

    componentWillMount = () => {
        this.addItems();
        this.setState({isReady: true});
    }


    addItems = () => {
        let itemsList = [];
        
        for (let i = 0; i < 10; i++) {
            itemsList.push(
                {
                    name: 'An item',
                    type: 'Type',
                    rent_date: '01-01-2019',
                    expected_return_date: '01-01-2019',
                }
            )
        }

        this.setState({items: itemsList});
    }

    render() {
        if(!this.state.isReady) {
            return <Expo.AppLoading />
        } else {
            return(
                <Container style={equipmentListStyles.container}>
                    <ItemsList
                        type='rented'
                        items={this.state.items} />
                </Container>
            )
        }
    }
}