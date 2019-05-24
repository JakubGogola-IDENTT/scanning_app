import React from 'react';
import { View, Alert, TouchableOpacity } from 'react-native';
import { Container, Text } from 'native-base';
import TextInputField from '../components/TextInputField';
import SubmitButton from '../components/SubmitButton';
import { isEmail, isPassword } from '../validator/DataValidator';

import loginRegisterStyles from '../styles/LoginRegisterStyles';
import alertStrings from '../assets/strings/AlertStrings';
import buttonStrings from '../assets/strings/ButtonStrings';
import apiConfig from '../services/api/config';
export default class PasswordResetConfirmView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: null,
            repeatPassword: null,
            token: null
        }
    }

    handleTokenChange = (event) => {
        this.setState({token: event});
    }

    handlePasswordChange = (event) => {
        this.setState({password: event});
    }

    handleRepeatPasswordChange = (event) => {
        this.setState({repeatPassword: event});
    }

    handlePressReset = async () => {

        if(this.state.token && this.state.password && this.state.repeatPassword) {
            if (this.state.password !== this.state.repeatPassword) {
                this.showWarningAlert(alertStrings.differentPasswords);
                return;
            } else if (!isPassword(this.state.password)) {
                this.showWarningAlert(alertStrings.passwordToShort);
                return
            }
        } else {
            Alert.alert(alertStrings.emptyField);
            return; 
        }

        const { token, password } = this.state;

        let data = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: token,
                password: password,
            })
        };

        await fetch(apiConfig.url + '/api-v1/reset-password/confirm/', data)
            .then((response) => this.setState({ status: response.status }))
            .then(() => {
                if(this.state.status === 200) {
                    // E-mail is correct
                    Alert.alert(alertStrings.passwordChanged);
                    this.props.navigation.navigate('SignIn');
                } else if (this.state.status === 404) {
                    // User with this e-mail doesn't exist
                    Alert.alert(alertStrings.invalidToken);
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
                        Wprowadź nowe hasło oraz podaj token potwierdzający, które otrzymałeś na swojego e-maila.
                    </Text>
                </View>
                <TextInputField
                    setStateHandler={this.handleTokenChange}
                    keyboardType='default'
                    returnKeyType='next'
                    placeholder={'Token'}
                    secureTextEntry={false} />
                <TextInputField
                    setStateHandler={this.handlePasswordChange}
                    keyboardType='default'
                    returnKeyType='next'
                    placeholder={'Hasło'}
                    secureTextEntry={true}
                />
                <TextInputField
                    setStateHandler={this.handleRepeatPasswordChange}
                    keyboardType='default'
                    returnKeyType='next'
                    placeholder={'Powtórz hasło'}
                    secureTextEntry={true}
                />
                <View style={loginRegisterStyles.buttonAndLinkContainer}>
                    <SubmitButton
                        handlePress={this.handlePressReset}
                        buttonText={buttonStrings.newPasswordButton}
                        icon='md-checkmark-circle-outline' />
                    <TouchableOpacity style={loginRegisterStyles.linkContainer}
                        onPress={() => this.props.navigation.navigate('SignIn')}>
                        <Text style={loginRegisterStyles.linkText}>Powrót do logowania</Text>
                    </TouchableOpacity>
                </View>
            </Container>    
        );
    }
}