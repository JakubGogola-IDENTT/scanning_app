import React from 'react'
import {Container} from 'native-base';
import {Alert, View, Animated, TouchableWithoutFeedback, ScrollView} from 'react-native';

import DataEditField from '../components/DataEditField';
import ChangePasswordButton from '../components/ChangePasswordButton';
import profileDetailsStyles from '../styles/ProfileDetailsStyles.js';
import registrationStrings from '../assets/strings/RegistrationStrings.js';
import alertStrings from '../assets/strings/AlertStrings.js';
import {isNip, isRegon, isUsername, isEmail, isPhoneNumber, isPostalCode} from '../validator/DataValidator.js';


import apiConfig from '../services/api/config';
import SubmitButton from '../components/SubmitButton';


export default class ProfileDetailsView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isReady: false,
            
            username: null,
            firstName: null,
            lastName: null,
            email: null,
            phoneNumber: null,
            street: null,
            postalCode: null,
            city: null,
            nip: null,
            regon: null,
            id: null,
            companyName: null,

            isBusiness: null,
        } 
    }

    async componentWillMount() {
        let response = await this.getData();
        this.setState({ data: response });

        this.setState({ username: response.username });
        this.setState({ firstName: response.first_name });
        this.setState({ lastName: response.last_name });
        this.setState({ email: response.email });
        this.setState({ phoneNumber: response.phone });

        await this.setState({ isBusiness: response.is_business });
        // Bussines data part
        if (this.state.isBusiness) {

            this.setState({ street: response.address.street });
            this.setState({ postalCode: response.address.zip_code });
            this.setState({ city: response.address.city });
            this.setState({ nip: response.business_data.nip });
            this.setState({ regon: response.business_data.regon });
            this.setState({ companyName: response.business_data.name })
        }

        this.setState({ id: response.id })
        this.setState({ isReady: true });
    }

    getData = async () => {
        let fetchedItems;
        data = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + apiConfig.clientId, 
            },
            body: JSON.stringify({
                'token': apiConfig.clientId,
            })
        }

        await fetch(apiConfig.url + '/api-v1/verify/', data)
        .then((response) => {this.setState({status: response.status}); return response.json()})
        .then((response) => {
            if(this.state.status === 200) {
                fetchedItems = response;
            } else if(this.state.status === 401) {
                Alert.alert(alertStrings.expiredToken);
                this.props.navigation.navigate('SignedOut')

            } else {
                Alert.alert(alertStrings.unexpectedError);
            }
        })
        .catch(() => {
            Alert.alert(alertStrings.noConnectionWithServer);
            this.props.navigation.navigate('SignedOut')

        });

        return fetchedItems;
    }

    updateData = async (label, newValue) => {
        
        let fetchedItems;

        var item = {}
            item [label] = newValue;
            var b = JSON.stringify(item);
            data = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + apiConfig.clientId, 
                },
                body: b,
            }

        await fetch(apiConfig.url + '/api-v1/client/' + this.state.id + '/', data)
        .then((response) => {this.setState({status: response.status}); return response.json()})
        .then((response) => {
            if(this.state.status === 200) {
                fetchedItems = response;
            } else if (this.state.status === 400) {
                Alert.alert(alertStrings.duplicateUsername);
            } else if (this.state.status === 401) {
                Alert.alert(alertStrings.expiredToken);
                this.props.navigation.navigate('SignedOut')
            }    else {
                Alert.alert(alertStrings.unexpectedError);
            }
        })
        .catch(() => {
            Alert.alert(alertStrings.noConnectionWithServer);
            this.props.navigation.navigate('SignedOut')
        });

        return fetchedItems;
    }

    updateAddress = async (label, newValue) => {
        
        let fetchedItems;

        var addressItem = {}
        addressItem [label] = newValue;
        var item = {}
        item ['address'] = addressItem
        var b = JSON.stringify(item);
        data = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + apiConfig.clientId, 
            },
            body: b,
        }

        await fetch(apiConfig.url + '/api-v1/client/' + this.state.id + '/', data)
        .then((response) => {this.setState({status: response.status}); return response.json()})
        .then((response) => {
            if(this.state.status === 200) {
                fetchedItems = response;
            }  else if (this.state.status === 400) {
                Alert.alert(alertStrings.duplicateUsername);
            } else if (this.state.status === 401) {
                Alert.alert(alertStrings.expiredToken);
                this.props.navigation.navigate('SignedOut')
            }  else {
                Alert.alert(alertStrings.unexpectedError);
            }
        })
        .catch(() => {
            Alert.alert(alertStrings.noConnectionWithServer);
            this.props.navigation.navigate('SignedOut')
        });

        return fetchedItems;
    }

    updateBusinessData = async (label, newValue) => {
        
        let fetchedItems;

        var addressItem = {}
        addressItem [label] = newValue;
        var item = {}
        item ['business_data'] = addressItem
        var b = JSON.stringify(item);
        data = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + apiConfig.clientId, 
            },
            body: b,
        }

        await fetch(apiConfig.url + '/api-v1/client/' + this.state.id + '/', data)
        .then((response) => {this.setState({status: response.status}); return response.json()})
        .then((response) => {
            if(this.state.status === 200) {
                fetchedItems = response;
            }  else if (this.state.status === 400) {
                Alert.alert(alertStrings.duplicateUsername);
            } else if (this.state.status === 401) {
                Alert.alert(alertStrings.expiredToken);
                this.props.navigation.navigate('SignedOut')
            } else {
                Alert.alert(alertStrings.unexpectedError);
            }
        })
        .catch(() => {
            Alert.alert(alertStrings.noConnectionWithServer);
            this.props.navigation.navigate('SignedOut')
        });

        return fetchedItems;
    }


    changePassword = async (password, newpassword) => {
        const handleResponse = res => {
            if(res.ok) {
              return res.status
            } else if (res.status === 401) {
                return res.status
            }
            throw new Error('Network response was not ok.')
          }


        data = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + apiConfig.clientId, 
            },
            body: JSON.stringify({
                'old_password': password,
                'new_password': newpassword,
            })
        }

        await fetch(apiConfig.url + '/api-v1/change-password/', data)
        .then(handleResponse)
        .then((status) => {
            if(status === 200) {
                Alert.alert(alertStrings.passwordChanged);
            } else if(status === 401) {
                Alert.alert(alertStrings.incorrectPassword);
            }  else {
                Alert.alert(alertStrings.unexpectedError);
            }
        })
        .catch(() => {
            Alert.alert(alertStrings.noConnectionWithServer);
            this.props.navigation.navigate('SignedOut')
        });
    }

    render() {
        if(!this.state.isReady) {
            return <Expo.AppLoading />
        } else
        return(
            <Container>
                <TouchableWithoutFeedback>
                    <Animated.View style={profileDetailsStyles.background}>
                        <ScrollView style={profileDetailsStyles.scrollView}>
                            <DataEditField
                                title={registrationStrings.username}
                                data={this.state.username}
                                isValidated={true}
                                validator={isUsername}
                                warningAlert={alertStrings.usernameToShort}
                                icon='md-contact'
                                keyboardType = 'default'
                                label = 'username'
                                updateRequest = {this.updateData}
                                
                            />
                            <DataEditField
                                title={registrationStrings.firstName}
                                data={this.state.firstName}
                                isValidated={false}
                                icon='md-contact'
                                keyboardType = 'default'
                                updateRequest = {this.updateData}
                                label = 'first_name'
                            />
                            <DataEditField
                                title={registrationStrings.lastName}
                                data={this.state.lastName}
                                isValidated={false}
                                icon='md-contact'
                                keyboardType = 'default'
                                updateRequest = {this.updateData}
                                label = 'last_name'
                            />
                            <DataEditField
                                title={registrationStrings.email}
                                data={this.state.email}
                                isValidated={true}
                                validator={isEmail}
                                warningAlert={alertStrings.invalidEmail}
                                icon='md-mail'
                                keyboardType = 'email-address'
                                updateRequest = {this.updateData}
                                label = 'email'
                            />
                            <DataEditField
                                title={registrationStrings.phoneNumber}
                                data={this.state.phoneNumber}
                                isValidated={true}
                                validator={isPhoneNumber}
                                warningAlert={alertStrings.invalidPhoneNumber}
                                icon='md-call'
                                keyboardType = 'phone-pad'
                                updateRequest = {this.updateData}
                                label = 'phone'
                            />
                            {this.state.isBusiness && (
                                <View>
                                    <DataEditField
                                        title={registrationStrings.street}
                                        data={this.state.street}
                                        isValidated={false}
                                        icon='md-pin'
                                        keyboardType = 'default'
                                        updateRequest = {this.updateAddress}
                                        label = 'street'
                                    />
                                    <DataEditField
                                        title={registrationStrings.postalCode}
                                        data={this.state.postalCode}
                                        isValidated={true}
                                        icon='md-pin'
                                        validator={isPostalCode}
                                        warningAlert={alertStrings.invalidPostalCode}
                                        updateRequest = {this.updateAddress}
                                        label = 'zip_code'
                                    />
                                    <DataEditField
                                        title={registrationStrings.city}
                                        data={this.state.city}
                                        isValidated={false}
                                        icon='md-pin'
                                        keyboardType = 'default'
                                        updateRequest = {this.updateAddress}
                                        label = 'city'
                                    />
                                     <DataEditField
                                        title={registrationStrings.company}
                                        data={this.state.companyName}
                                        isValidated={false}
                                        icon='md-business'
                                        keyboardType = 'default'
                                        updateRequest = {this.updateBusinessData}
                                        label = 'name'
                                    />
                                    <DataEditField
                                        title={registrationStrings.nip}
                                        data={this.state.nip}
                                        isValidated={true}
                                        validator={isNip}
                                        warningAlert={alertStrings.invalidNIP}
                                        icon='md-business'
                                        keyboardType = 'number-pad'
                                        updateRequest = {this.updateBusinessData}
                                        label = 'nip'
                                    />
                                    <DataEditField
                                        title={registrationStrings.regon}
                                        data={this.state.regon}
                                        isValidated={true}
                                        validator={isRegon}
                                        warningAlert={alertStrings.invalidRegon}
                                        icon='md-business'
                                        keyboardType = 'number-pad'
                                        updateRequest = {this.updateBusinessData}
                                        label = 'regon'
                                    />                                 
                                </View>
                            )}
                        </ScrollView>
                        <View style={profileDetailsStyles.buttonContainer}>
                            <ChangePasswordButton
                                updatePassRequest={this.changePassword}
                            />
                        </View>
                       
                    </Animated.View>
              </TouchableWithoutFeedback>
          </Container>
        )
    }
}