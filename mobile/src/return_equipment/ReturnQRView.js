import React from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';
import QRCode from 'react-native-qrcode';

import QRViewStyles from '../styles/QRViewStyles';

export default class ReturnQRView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
            itemID: null,
            itemName: null,
        }
    }

    componentWillMount = async () => {
        let id = await this.props.navigation.getParam('id', -1);
        let name = await this.props.navigation.getParam('name', '');
        await this.setState({itemID: id});
        await this.setState({itemName: name});
        this.setState({isReady: true});
    }

    generateQRCode = () => {
        if (this.state.itemID === null) {
            return;
        }

        let qrValue = 'Return:' + this.state.itemID;
        return(
            <QRCode
                value={qrValue}
                size={250}
                bgColor='#3b82c4'
                fgColor='#fff'
            />
        );
    }

    render = () => {
        if(!this.state.isReady) {
            return <Expo.AppLoading/>;
        }

        return (
            <View style={QRViewStyles.container}>
                <Text style={QRViewStyles.itemName}>
                    {this.state.itemName}
                </Text>
                {this.generateQRCode()}
                <Text style={QRViewStyles.itemID}>
                    (ID przedmiotu: {this.state.itemID})
                </Text>
            </View>
        );
    }
}