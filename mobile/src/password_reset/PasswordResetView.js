import React from 'react';
import { View, Alert, TouchableOpacity } from 'react-native';
import { Container, Text } from 'native-base';
import TextInputField from '../components/TextInputField';
import SubmitButton from '../components/SubmitButton';
import { isEmail } from '../validator/DataValidator';

import loginRegisterStyles from '../styles/LoginRegisterStyles';
import alertStrings from '../assets/strings/AlertStrings';
import buttonStrings from '../assets/strings/ButtonStrings';
import apiConfig from '../services/api/config';

export default class PasswordResetView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
        }
    }

    handleEmailChange = (event) => {
        this.setState({email: event});
    }

    handlePressReset = async () => {
        if(this.state.email !== null) {
            if (!isEmail(this.state.email)) {
                Alert.alert(alertStrings.invalidEmail);
                return;
            }
        } else {
            Alert.alert(alertStrings.emptyField);
            return; 
        }

        const { email } = this.state;

        let data = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
            })
        };

        await fetch(apiConfig.url + '/api-v1/reset-password/', data)
            .then((response) => this.setState({ status: response.status }))
            .then(() => {
                if(this.state.status === 200) {
                    // E-mail is correct
                    this.props.navigation.navigate('PasswordResetConfirm');
                } else if (this.state.status === 404) {
                    // User with this e-mail doesn't exist
                    Alert.alert(alertStrings.invalidEmail);
                    return;
                }
            })
            .catch(() => {
                Alert.alert(alertStrings.noConnectionWithServer);
            });
    }

    render = () => {
        return(
            <Container>
                <View style={loginRegisterStyles.resetHeader}>
                    <Text style={[loginRegisterStyles.title, loginRegisterStyles.resetTitle]}>
                        Zresetuj hasło
                    </Text>
                    <Text style={loginRegisterStyles.infoText}>
                        Aby zresetować swoje hasło, wpisz poniżej adres e-mail powiązany z Twoim kontem, a następnie postępuj zgodnie
                        z instrukcjami zwartymi w otrzymanej wiadomości.
                    </Text>
                </View>
                <TextInputField
                    setStateHandler={this.handleEmailChange}
                    keyboardType='email-address'
                    returnKeyType='next'
                    placeholder={'Adres e-mail'}
                    secureTextEntry={false} />
                <View style={loginRegisterStyles.buttonAndLinkContainer}>
                    <SubmitButton
                        handlePress={this.handlePressReset}
                        buttonText={buttonStrings.resetPasswordButton}
                        icon='md-refresh' />
                    <TouchableOpacity style={loginRegisterStyles.linkContainer}
                        onPress={() => this.props.navigation.navigate('PasswordResetConfirm')}>
                        <Text style={loginRegisterStyles.linkText}>Przejdź do panelu resetowania hasła</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={loginRegisterStyles.linkContainer}
                        onPress={() => this.props.navigation.navigate('SignIn')}>
                        <Text style={loginRegisterStyles.linkText}>Powrót do logowania</Text>
                    </TouchableOpacity>
                </View>
            </Container>    
        );
    }
}