import React from 'react';
import {View, Alert, Animated, Keyboard, TouchableOpacity, TouchableWithoutFeedback, ScrollView} from 'react-native';
import {Container, Text} from 'native-base';
import DismissKeyboard from 'dismissKeyboard';
import SubmitButton from '../components/SubmitButton';

import loginRegisterStyles from '../styles/LoginRegisterStyles';
import buttonStrings from '../assets/strings/ButtonStrings';
import alertStrings from '../assets/strings/AlertStrings';
import apiConfig from '../services/api/config';

import logo from '../assets/logo.jpg';
import TextInputField from '../components/TextInputField';

/**
 * Renders login panel.
 */
export default class LoginPanel extends React.Component {
    constructor(props){
        super(props);

        this.imageHeight = new Animated.Value(200);
        this.keyboardHeight = new Animated.Value(50);

        this.state = {
            isReady: false,
            username: null,
            password: null,
        }
    }

    componentWillMount() {
      
        this.keyboardWDidShowSub = Keyboard.addListener(
            "keyboardDidShow",
            this.keyboardDidShow
        );
        this.keyboardWDidHideSub = Keyboard.addListener(
            "keyboardDidHide",
            this.keyboardDidHide
        );
    }

    componentWillUnmount() {
        this.keyboardWDidShowSub.remove();
        this.keyboardWDidHideSub.remove();
    }

    /**
     * Handles keyboard showing when screen is taped.
     */
    keyboardDidShow = () => {
        Animated.timing(this.imageHeight, {
            duration: 200, 
            toValue: 100,
        }).start();
        Animated.timing(this.keyboardHeight, {
            duration: 200, 
            toValue: 0,
        }).start();
    }

    /**
     * Handles keyboard hiding when screen is taped and keyboard is visible. 
     */
    keyboardDidHide = () => {
        Animated.timing(this.imageHeight, {
            duration: 200,
            toValue: 200,
        }).start();
        Animated.timing(this.keyboardHeight, {
            duration: 200,
            toValue: 50,
        }).start();
    }

    /**
     * Handles login button press action.
     */
    handlePressLogin = async () => {
        const { username, password } = this.state;
        let data = {
            method: 'POST',
            body: JSON.stringify({
                'username': username,
                'password': password,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        fetch(apiConfig.url + '/api-v1/login/', data)
            .then((response) => { this.setState({ status: response.status }); return response.json() })
            .then((response) => {
                if (this.state.status === 200) {
                    apiConfig.clientId = response.access;
                    this.props.navigation.navigate('SignedIn');
                } else {
                    Alert.alert(alertStrings.invalidUserOrPassword);
                }
            })
            .catch(() => {
                Alert.alert(alertStrings.noConnectionWithServer);
            });

    }

    handleUsernameChange = (event) => {
        this.setState({username: event});
    }

    handlePasswordChange = (event) => {
        this.setState({password : event});
    }

    render() {
        return(
            <Container>
                <TouchableWithoutFeedback
                    onPress={() => {
                        DismissKeyboard();
                    }}>
                    <Animated.View style={loginRegisterStyles.background}>
                        <View style={loginRegisterStyles.logoContainer}>
                            <Animated.Image source={logo} resizeMode='contain' 
                                style={[loginRegisterStyles.logoStyle, 
                                        {height: this.imageHeight}]} />
                            <Animated.Text style={[loginRegisterStyles.title, {marginBottom: this.keyboardHeight}]}>
                                Czasoprzestrzeń
                            </Animated.Text>
                        </View>
                        <TextInputField 
                            state={'username'}
                            setStateHandler={this.handleUsernameChange} 
                            keyboardType = 'email-address'
                            returnKeyType = 'next'
                            placeholder = {'Użytkownik'}
                            secureTextEntry = {false}
                        />
                        <TextInputField 
                            setStateHandler={this.handlePasswordChange} 
                            state={'password'}
                            keyboardType = 'default'
                            returnKeyType = 'next'
                            placeholder = {'Hasło'}
                            secureTextEntry = {true}
                        />
                        <View style ={loginRegisterStyles.buttonAndLinkContainer}>
                            <SubmitButton 
                                handlePress={this.handlePressLogin} 
                                buttonText={buttonStrings.loginButton} 
                                icon = 'md-log-in'/>
                            <TouchableOpacity style={loginRegisterStyles.linkContainer} 
                                onPress={() => this.props.navigation.navigate("SignUp")}>
                                <Text style={loginRegisterStyles.linkText}>Nie masz jeszcze konta? Zarejestruj się!</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={loginRegisterStyles.linkContainer} 
                                onPress={() => this.props.navigation.navigate("PasswordReset")}>
                                <Text style={loginRegisterStyles.linkText}>Zapomniałem hasła</Text>
                            </TouchableOpacity>
                      </View>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </Container>
        )
    }
}