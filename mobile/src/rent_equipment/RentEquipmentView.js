import React from 'react';
import { View, StatusBar, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import { DatePicker, Button, Text, Left } from 'native-base';
import TextInputField from '../components/TextInputField';

import apiConfig from '../services/api/config';
import textStrings from '../assets/strings/TextStrings';
import alertStrings from '../assets/strings/AlertStrings';
import qrScannerStyles from '../styles/QRScannerStyles';

export default class RentEquipmentView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
            hasCameraPermission: null,
            lastScannedQr: null,
            chosenDate: new Date(),
            itemID: null,
        }
    }

    componentDidMount = () => {
        this.requestCameraPermission();
        this.setState({ isReady: true });
    }

    requestCameraPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        if (status === 'granted') {
            this.setState({
                hasCameraPermission: true,
            });
        } else {
            this.setState({
                hasCameraPermission: false,
            })
        }
    }

    handleBarCodeRead = result => {
        if (result.data !== this.state.lastScannedQr) {
            let id = this.getItemID(result.data);
            this.setState({
                lastScannedQr: result.data,
                itemID: id,
            });
        }
    }

    handleCancelPress = () => {
        this.setState({
            lastScannedQr: null
        });
    }

    handleDateChange = (newDate) => {
        this.setState({ chosenDate: newDate });
    }

    handleIDChange = (event) => {
        this.setState({ itemID: event});
    }

    rentItem = async () => {
        let dateISOFormat = this.getDateFormat(this.state.chosenDate);
        const { itemID } = this.state;

        if (itemID === -1) {
            Alert.alert(alertStrings.invalidQR);
            return;
        }

        let data = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + apiConfig.clientId,
            },
            body: JSON.stringify({
                'expected_return': dateISOFormat,
            })
        };

        await fetch(apiConfig.url + '/api-v1/equipment/' + itemID + '/rent/', data)
            .then((response) => { this.setState({ status: response.status }); })
            .then(() => {
                if (this.state.status === 201) {
                    // Created rent
                    Alert.alert(alertStrings.rentCreated);
                } else if (this.state.status === 400) {
                    // Wrong data or avaiable=false
                    Alert.alert(alertStrings.rentWrongData);
                } else if (this.state.status === 404) {
                    // Equipment with id doesn't exists
                    Alert.alert(alertStrings.rentNoItem);
                } else if (this.state.status === 401) {
                    // Unauthorized
                    Alert.alert(alertStrings.noAuthoriatzion);
                    this.props.navigation.navigate('SignedOut');
                }
            })
            .catch(() => {
                Alert.alert(alertStrings.noConnectionWithServer);
                this.props.navigation.navigate('SignedOut')
            });

        this.setState({ 
            lastScannedQr: null,
            itemID: null,
        });

    }

    // Tricky but other solutions don't work
    getDateFormat = (date) => {
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        if (day <= 9) {
            day = '0' + day;
        }

        if (month <= 9) {
            month = '0' + month;
        }

        return year + '-' + month + '-' + day;
    }

    getItemID = (scannedData) => {
        let result = scannedData.toString().match(/\d+/i);

        if (result === null) {
            return -1;
        } else {
            return result[0];
        }
    }

    maybeRenderContent = () => {
        // if (!this.state.lastScannedQr) {
        //     return;
        // }
        return (
            <View style={qrScannerStyles.bottomBar}>
                <View style={qrScannerStyles.idInputContainer}>
                    <TextInputField
                        state={'username'}
                        setStateHandler={this.handleIDChange}
                        keyboardType='phone-pad'
                        returnKeyType='next'
                        placeholder={'ID'}
                        secureTextEntry={false}
                        value={this.state.itemID}
                    />
                </View>
                <View style={qrScannerStyles.datePickerContainer}>
                    <DatePicker
                        defaultDate={new Date()}
                        locale={'pl'}
                        timeZoneOffsetInMinutes={undefined}
                        modalTransparent={false}
                        animationType={'fade'}
                        androidMode={'default'}
                        placeHolderText='Data zwrotu'
                        textStyle={{ color: '#0d4579' }}
                        placeHolderTextStyle={{ color: "#d3d3d3" }}
                        onDateChange={(newDate) => this.handleDateChange(newDate)}
                        disabled={false}
                    />
                </View>
                <Button
                    style={qrScannerStyles.rentButton}
                    onPress={() => this.rentItem()}
                >
                    <Text>
                        Wypożycz
                    </Text>
                </Button>
            </View>
        );
    }

    render() {
        if (!this.state.isReady) {
            return <Expo.AppLoading />
        } else {
            return (
                <View>
                    {
                        this.state.hasCameraPermission === null
                            ? <Text>textStrings.loading</Text>
                            : this.state.hasCameraPermission === false
                                ? <Text>textStrings.noPermission</Text>
                                : <BarCodeScanner
                                    onBarCodeScanned={this.handleBarCodeRead}
                                    style={{
                                        height: Dimensions.get('window').height,
                                        width: Dimensions.get('window').width
                                    }}
                                />
                    }

                    {this.maybeRenderContent()}

                    <StatusBar hidden />
                </View>
            )
        }
    }
}