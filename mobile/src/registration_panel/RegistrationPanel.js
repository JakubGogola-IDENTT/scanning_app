import React from 'react';
import {
    Alert, View, Animated, Keyboard, TouchableOpacity, TouchableWithoutFeedback, ScrollView,
    Dimensions
} from 'react-native';
import { Container, Text, ListItem, Radio, Left, Right, Content, Button, Icon } from 'native-base';
import DismissKeyboard from 'dismissKeyboard';
import SubmitButton from '../components/SubmitButton';
import TextInputField from '../components/TextInputField';

import loginRegisterStyles from '../styles/LoginRegisterStyles.js';

import alertStrings from '../assets/strings/AlertStrings.js';
import buttonStrings from '../assets/strings/ButtonStrings.js';
import registrationStrings from '../assets/strings/RegistrationStrings.js';
import { isNip, isRegon, isUsername, isEmail, isPassword, isPhoneNumber, isPostalCode } from '../validator/DataValidator.js';

import logo from '../assets/logo_with_name.png';

import apiConfig from '../services/api/config';

export default class RegistrationPanel extends React.Component {

    constructor(props) {
        super(props);

        this.imageHeight = new Animated.Value(100);
        this.keyboardHeight = new Animated.Value(30);

        this.width =

            this.state = {
                isReady: false,
                username: null,
                password1: null,
                password2: null,
                firstName: null,
                lastName: null,
                email: null,
                phoneNumber: null,
                street: null,
                companyName: null,
                postalCode: null,
                city: null,
                nip: null,
                regon: null,
                isPerson: true,
                numOfViews: 2,
                currentPageNum: 1,
                isLastPage: false,
                nextButtonDisabled: false,
                prevButtonDisabled: false,
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
        this.setScrollButtonsDisabledStatus();
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
            toValue: 0,
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
            toValue: 100,
        }).start();
        Animated.timing(this.keyboardHeight, {
            duration: 200,
            toValue: 30,
        }).start();
    }

    checkInputFields = () => {
        if (!(this.state.username && this.state.password1 && this.state.password2 && this.state.email
            && this.state.phoneNumber && this.state.firstName && this.state.lastName)) {
            return false;
        } else {
            if (!this.state.isPerson) {
                if (!(this.state.street && this.state.postalCode && this.state.city
                    && this.state.nip && this.state.regon && this.state.companyName))
                    return false;
            }
        }

        return true;
    }

    validateData = () => {
        //if sth is null
        if (!this.checkInputFields()) {
            this.showWarningAlert(alertStrings.emptyField);
        }
        //validate username
        else if (!isUsername(this.state.username)) {
            this.showWarningAlert(alertStrings.usernameToShort);
        }
        //validate e-mail
        else if (!isEmail(this.state.email)) {
            this.showWarningAlert(alertStrings.invalidEmail);
        }
        //validate passwords
        else if (!isPassword(this.state.password1)) {
            this.showWarningAlert(alertStrings.passwordToShort);
        }
        else if (this.state.password1.localeCompare(this.state.password2) != 0) {
            this.showWarningAlert(alertStrings.differentPasswords);
        }
        //validate phone number
        else if (!isPhoneNumber(this.state.phoneNumber)) {
            this.showWarningAlert(alertStrings.invalidPhoneNumber);
        }
        //validate postal code
        else if (!(this.state.isPerson) && !isPostalCode(this.state.postalCode)) {
            this.showWarningAlert(alertStrings.invalidPostalCode);
        }
        //validate nip 
        else if (!(this.state.isPerson) && !isNip(this.state.nip)) {
            this.showWarningAlert(alertStrings.invalidNIP);
        }
        //validate regon 
        else if (!(this.state.isPerson) && !isRegon(this.state.regon)) {
            this.showWarningAlert(alertStrings.invalidRegon);
        } else {
            return true;
        }

        return false;
    }

    /**
     * Handles login button press action.
     */
    handlePressRegister = () => {
        let validationResult = this.validateData();

        if (!validationResult) {
            return;
        }

        let bodyData = this.generateData();

        let data = {
            method: 'POST',
            body: bodyData,
            headers: {
                'Content-Type': 'application/json',
            },
        }

        fetch(apiConfig.url + '/api-v1/signup/', data)
            .then((response) => { this.setState({ status: response.status }) })
            .then(() => {
                if (this.state.status === 201) {
                    this.showRegisterAlert();
                    this.props.navigation.navigate("SignIn");
                } else if(this.state.status ===400) {
                    Alert.alert(alertStrings.duplicateUsername);
                } else {
                    Alert.alert(alertStrings.unexpectedError);
                }
            })
            .catch(() => {
                Alert.alert(alertStrings.noConnectionWithServer);
            });
    }

    generateData = () => {
        let address = null;
        let businessData = null;
        let data = null;

        const { username, password1, firstName, lastName, email, phoneNumber } = this.state;

        if (!this.state.isPerson) {
            result = this.getBusinessData();
            address = result[0];
            businessData = result[1];

            data = JSON.stringify({
                'username': username,
                'password': password1,
                'first_name': firstName,
                'last_name': lastName,
                'email': email,
                'phone': '+48' + phoneNumber,
                'address': address,
                'business_data': businessData,
            });
        } else {

            data = JSON.stringify({
                'username': username,
                'password': password1,
                'first_name': firstName,
                'last_name': lastName,
                'email': email,
                'phone': '+48' + phoneNumber
            });
        }

        return data;
    }

    getBusinessData = () => {
        let address = {
            'street': this.state.street,
            'zip_code': this.state.postalCode,
            'city': this.state.city,
        };

        let bussinesData = {
            'name': this.state.companyName,
            'nip': this.state.nip,
            'regon': this.state.regon,
        };

        return [address, bussinesData];
    }

    showWarningAlert(text) {
        Alert.alert(
            'Nieprawidłowe dane!',
            text,
            [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false },
        );
    }

    showRegisterAlert() {
        Alert.alert(
            'Poprawna rejestracja!',
            'Teraz musisz poczekać na akceptację.',
            [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false },
        );
    }

    setStateHandler = (state, text) => {
        this.setState({ state, text });
    }

    handleUsernameChange = (event) => {
        this.setState({ username: event });
    }

    handleFirstNameChange = (event) => {
        this.setState({ firstName: event });
    }

    handleLastNameChange = (event) => {
        this.setState({ lastName: event });
    }

    handleEmailChange = (event) => {
        this.setState({ email: event });
    }

    handlePassword1Change = (event) => {
        this.setState({ password1: event });
    }

    handlePassword2Change = (event) => {
        this.setState({ password2: event });
    }

    handlePhoneNumberChange = (event) => {
        this.setState({ phoneNumber: event });
    }

    handleStreetChange = (event) => {
        this.setState({ street: event });
    }

    handlePostalCodeChange = (event) => {
        this.setState({ postalCode: event });
    }

    handleCityChange = (event) => {
        this.setState({ city: event });
    }

    handleNipChange = (event) => {
        this.setState({ nip: event });
    }

    handleRegonChange = (event) => {
        this.setState({ regon: event });
    }

    handleCityChange = (event) => {
        this.setState({ city: event });
    }

    handleNipChange = (event) => {
        this.setState({ nip: event });
    }

    handleRegonChange = (event) => {
        this.setState({ regon: event });
    }

    handleCompanyNameChange = (event) => {
        this.setState({ companyName: event });
    }

    handleUserStatusChange = (event) => {
        if (this.state.isPerson) {
            this.setState({
                isPerson: false,
                numOfViews: 4
            });
        } else {
            this.setState({
                isPerson: true,
                numOfViews: 2
            });
        }
    }

    setScrollButtonsDisabledStatus = (pageNum) => {
        if (this.state.currentPageNum <= 1) {
            this.setState({
                prevButtonDisabled: true,
                nextButtonDisabled: false
            });
        } else if (this.state.currentPageNum >= this.state.numOfViews) {
            this.setState({
                prevButtonDisabled: false,
                nextButtonDisabled: true,
            });
        } else {
            this.setState({
                prevButtonDisabled: false,
                nextButtonDisabled: false
            });
        }
    }

    handleScrollToNextView = async () => {
        if (this.state.currentPageNum >= this.state.numOfViews) {
            return;
        }

        let pageNum = this.state.currentPageNum + 1;
        await this.setState({ currentPageNum: pageNum });

        if (pageNum === this.state.numOfViews) {
            this.setState({ isLastPage: true });
        }

        this.setScrollButtonsDisabledStatus();

        let offset = (pageNum - 1) * Dimensions.get('window').width;
        this.refs._scrollView.scrollTo({ x: offset, y: 0, animated: true });
    }

    handleScrollToPreviousView = async () => {
        if (this.state.currentPageNum <= 1) {
            return;
        }

        if (this.state.currentPageNum === this.state.numOfViews) {
            this.setState({ isLastPage: false });
        }

        let pageNum = this.state.currentPageNum - 1;
        await this.setState({ currentPageNum: pageNum });

        this.setScrollButtonsDisabledStatus();

        let offset = (pageNum - 1) * Dimensions.get('window').width;
        this.refs._scrollView.scrollTo({ x: offset, y: 0, animated: true });
    }

    render() {
        return (
            <Container>
                <TouchableWithoutFeedback
                    onPress={() => {
                        DismissKeyboard();
                    }}>
                    <Animated.View style={loginRegisterStyles.background}>
                        <View style={loginRegisterStyles.registerLogoContainer}>
                            <Animated.Image source={logo} resizeMode='contain'
                                style={
                                    { height: this.imageHeight }} />
                            <Text style={loginRegisterStyles.stepInfo}>
                                Rejestracja ({this.state.currentPageNum}/{this.state.numOfViews})
                        </Text>
                        </View>
                        <ScrollView
                            ref='_scrollView'
                            style={loginRegisterStyles.scrollView}
                            decelerationRate={0}
                            horizontal={true}
                            scrollEnabled={false}
                            snapToAlignment={"center"}
                            showsHorizontalScrollIndicator={false}
                            pagingEnabled={true}
                        >
                            <View style={loginRegisterStyles.radioButtonContainer}>
                                <ListItem style={loginRegisterStyles.radioButton}
                                    onPress={() => this.handleUserStatusChange()} >
                                    <Left>
                                        <Text>Osoba fizyczna</Text>
                                    </Left>
                                    <Right>
                                        <Radio selected={this.state.isPerson} />
                                    </Right>
                                </ListItem>
                                <ListItem style={loginRegisterStyles.radioButton}
                                    onPress={() => this.handleUserStatusChange()} >
                                    <Left>
                                        <Text>Firma</Text>
                                    </Left>
                                    <Right>
                                        <Radio selected={!(this.state.isPerson)} />
                                    </Right>
                                </ListItem>
                                <View style={loginRegisterStyles.innerContainer}>
                                    <TextInputField
                                        setStateHandler={this.handleUsernameChange}
                                        keyboardType='default'
                                        returnKeyType='next'
                                        placeholder={'Nazwa użytkownika'}
                                        secureTextEntry={false}
                                    />
                                    <TextInputField
                                        setStateHandler={this.handleFirstNameChange}
                                        keyboardType='default'
                                        returnKeyType='next'
                                        placeholder={'Imię'}
                                        secureTextEntry={false}
                                    />
                                    <TextInputField
                                        setStateHandler={this.handleLastNameChange}
                                        keyboardType='default'
                                        returnKeyType='next'
                                        placeholder={'Nazwisko'}
                                        secureTextEntry={false}
                                    />
                                </View>
                            </View>
                            <View style={loginRegisterStyles.inputFieldsContainer}>
                                <TextInputField
                                    setStateHandler={this.handleEmailChange}
                                    keyboardType='email-address'
                                    returnKeyType='next'
                                    placeholder={'Adres e-mail'}
                                    secureTextEntry={false}
                                />
                                <TextInputField
                                    setStateHandler={this.handlePhoneNumberChange}
                                    keyboardType='phone-pad'
                                    returnKeyType='next'
                                    placeholder={'Numer telefonu'}
                                    secureTextEntry={true}
                                />
                                <TextInputField
                                    setStateHandler={this.handlePassword1Change}
                                    keyboardType='default'
                                    returnKeyType='next'
                                    placeholder={'Hasło'}
                                    secureTextEntry={true}
                                />
                                <TextInputField
                                    setStateHandler={this.handlePassword2Change}
                                    keyboardType='default'
                                    returnKeyType='next'
                                    placeholder={'Powtórz hasło'}
                                    secureTextEntry={true}
                                />
                            </View>
                            {!this.state.isPerson && (
                                <View style={loginRegisterStyles.inputFieldsContainer}>
                                    <TextInputField
                                        setStateHandler={this.handleCompanyNameChange}
                                        keyboardType='default'
                                        returnKeyType='next'
                                        placeholder={'Nazwa firmy'}
                                        secureTextEntry={false}
                                    />
                                    <TextInputField
                                        setStateHandler={this.handleNipChange}
                                        keyboardType='numeric'
                                        returnKeyType='next'
                                        placeholder={'NIP'}
                                        secureTextEntry={false}
                                    />
                                    <TextInputField
                                        setStateHandler={this.handleRegonChange}
                                        keyboardType='numeric'
                                        returnKeyType='next'
                                        placeholder={'REGON'}
                                        secureTextEntry={false}
                                    />
                                </View>
                            )}

                            {!this.state.isPerson && (
                                <View>
                                    <View style={loginRegisterStyles.inputFieldsContainer}>
                                        <TextInputField
                                            setStateHandler={this.handleStreetChange}
                                            keyboardType='default'
                                            returnKeyType='next'
                                            placeholder={'Ulica i numer'}
                                            secureTextEntry={false}
                                        />
                                        <TextInputField
                                            setStateHandler={this.handlePostalCodeChange}
                                            keyboardType='numeric'
                                            returnKeyType='next'
                                            placeholder={'Kod pocztowy'}
                                            secureTextEntry={false}
                                        />
                                        <TextInputField
                                            setStateHandler={this.handleCityChange}
                                            keyboardType='default'
                                            returnKeyType='next'
                                            placeholder={'Miejscowość'}
                                            secureTextEntry={false}
                                        />
                                    </View>
                                </View>
                            )}
                        </ScrollView>
                        <View style={loginRegisterStyles.scrollButtonsContainer}>
                            <Button
                                style={!this.state.prevButtonDisabled ? loginRegisterStyles.scrollButton : loginRegisterStyles.scrollButtonDisabled}
                                disabled={this.state.prevButtonDisabled}
                                onPress={() => this.handleScrollToPreviousView()}>
                                <Text>Wróć</Text>
                            </Button>
                            <Button
                                style={!this.state.nextButtonDisabled ? loginRegisterStyles.scrollButton : loginRegisterStyles.scrollButtonDisabled}
                                disabled={this.state.nextButtonDisabled}
                                onPress={() => this.handleScrollToNextView()}>
                                <Text>Dalej</Text>
                            </Button>
                        </View>
                        <View style={loginRegisterStyles.registerButtonAndLinkContainer}>
                            {this.state.isLastPage && (
                                <SubmitButton
                                    disabled={false}
                                    handlePress={this.handlePressRegister}
                                    buttonText={buttonStrings.registrationButton}
                                    icon='md-add-circle-outline' />
                            )}
                            <TouchableOpacity style={loginRegisterStyles.linkContainer}
                                onPress={() => this.props.navigation.navigate("SignIn")}>
                                <Text style={loginRegisterStyles.linkText}>Masz już konto? Zaloguj się!</Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </Container>
        )
    }

}
