import React from 'react';
import {Container} from 'native-base';
import {View, Animated, TouchableWithoutFeedback, Alert} from 'react-native';
import SubmitButton from '../components/SubmitButton';

import homeStyles from '../styles/HomeStyles.js';
import buttonStyles from '../styles/ButtonStyles.js';
import logo from '../assets/logo.jpg';
import buttonStrings from '../assets/strings/ButtonStrings.js';
import alertStrings from '../assets/strings/AlertStrings.js';

import apiConfig from '../services/api/config';

export default class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.imageHeight = new Animated.Value(200);
        this.state = {
            isAuthorized: false,
        };
    }

    componentWillMount = async () => {
        await this.getClientUsername();
        if (this.state.isAuthorized) {
            Alert.alert(alertStrings.authorizationInfo + ' ' + apiConfig.clientUsername);
        }
    }

    getClientUsername = async () => {
        const token = apiConfig.clientId;

        let data = {
            method: 'POST',
            body: JSON.stringify({
               'token': token,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }

        await fetch(apiConfig.url + '/api-v1/verify/', data)
            .then((response) => { this.setState({ status: response.status }); return response.json() })
            .then((response) => {
                if (this.state.status === 200) {
                    apiConfig.clientUsername = response.username;
                    this.setState({isAuthorized: true});
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
    }

    render() {
        return(
            <Container>
                <TouchableWithoutFeedback>
                    <Animated.View style={homeStyles.background}>
                        <View style={homeStyles.logoContainer}>
                            <Animated.Image source={logo} resizeMode='contain'
                                style={[homeStyles.logoStyle,
                                      {height: this.imageHeight}]} />
                            <Animated.Text style={homeStyles.title}>
                              Czasoprzestrzeń
                            </Animated.Text>
                      </View>
                      <View style={buttonStyles.buttonContainer}>
                        <SubmitButton 
                            handlePress={() => this.props.navigation.navigate('Rent')} 
                            buttonText={buttonStrings.rentButton} 
                            icon='md-add-circle-outline'/>
                        </View>
                        
                        <View style={buttonStyles.buttonContainer}>
                        <SubmitButton 
                            handlePress={() => this.props.navigation.navigate('Return')} 
                            buttonText={buttonStrings.returnButton}
                            icon='md-time' />
                        </View>
                        <View style={buttonStyles.buttonContainer}>
                            <SubmitButton 
                            handlePress={() => this.props.navigation.navigate('Equipment')} 
                            buttonText={buttonStrings.equipmentListButton}
                            icon='md-list' />
                        </View>
                  </Animated.View>
              </TouchableWithoutFeedback>
          </Container>
        )
    }
}