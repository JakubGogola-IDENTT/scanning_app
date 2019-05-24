import React from 'react';
import {Container, Text} from 'native-base';
import {Alert, View, Animated, TouchableWithoutFeedback} from 'react-native';

import profileStyles from '../styles/ProfileStyles.js';
import buttonStyles from '../styles/ButtonStyles.js';
import image from '../assets/user-in-a-square.png';

import SubmitButton from '../components/SubmitButton';
import buttonStrings from '../assets/strings/ButtonStrings.js';
import apiConfig from '../services/api/config';
import alertStrings from '../assets/strings/AlertStrings.js';


export default class ProfileView extends React.Component {

    constructor(props) {
        super(props);
        this.imageHeight = new Animated.Value(160);

        this.state = {
            isReady: false,
            username: null,
        }
    }

    handlePressDelete = () => {
        Alert.alert(
            alertStrings.warning,
            alertStrings.deleteAccount,
            [
              {
                text: 'Nie',
                style: 'cancel',
              },
              { 
                text: 'Tak',
                onPress: () => this.deleteAccount()
              },
            ],
            {cancelable: false},
          );
    }

    getId = async () => {
        let fetchedItem;
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
                fetchedItem = response;
            } else {
                Alert.alert(alertStrings.unexpectedError);
            }
        })
        .catch(() => {
            Alert.alert(alertStrings.noConnectionWithServer);
        });

        return fetchedItem.id;
    }

    deleteAccount = async () => {
        var id = await this.getId();

        const handleResponse = res => {
            if(res.ok) {
              return res.status
            } else if (res.status === 400) {
                return res.status
            }
            throw new Error('Network response was not ok.')
          }

        data = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + apiConfig.clientId, 
            },
            body: JSON.stringify({
                'token': apiConfig.clientId,
                'id': id,
            })
        }

        await fetch(apiConfig.url + '/api-v1/client/'+id+'/', data)
        .then(handleResponse)
        .then((status) => {
            if(status === 204) {
                Alert.alert(alertStrings.deletedAccount);
                this.props.navigation.navigate('SignedOut')
            } else if(status === 400) {
                Alert.alert(alertStrings.ongoingEquipmentRents);
            }  else {
                Alert.alert(alertStrings.noAuthoriatzion);
            }
        })
        .catch((err) => {
            console.error(err)
            Alert.alert(alertStrings.noConnectionWithServer);
        });
        
    }

    async componentWillMount() {
        let response = await this.getData();
        this.setState({username: response.username});

        this.setState({isReady: true});
    }

    getData = async () => {
        let fetchedData;
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
                fetchedData = response;
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

        return fetchedData;
    }


    render() {
        if(!this.state.isReady) {
            return <Expo.AppLoading />
        } else
        return(
            <Container>
                <TouchableWithoutFeedback>
                    <Animated.View style={profileStyles.background}>
                        <View style={profileStyles.imageContainer}>
                            <Animated.Image 
                                source={image} resizeMode='contain'
                                style={[{height: this.imageHeight}]} />
                        </View>
                        <Text style={profileStyles.text}>
                            {this.state.username}
                        </Text>
                        <View style={buttonStyles.buttonContainer}>
                            <SubmitButton
                                handlePress={() => this.props.navigation.navigate('ProfileDetails')}
                                buttonText={buttonStrings.profileDetailsButton}
                                icon= 'md-person'/>
                        </View>
                        <View style={buttonStyles.buttonContainer}>
                            <SubmitButton
                                handlePress={() => this.handlePressDelete()}
                                buttonText={buttonStrings.deleteAccountButton}
                                icon= 'md-trash'/>
                        </View>
                        <View style={buttonStyles.buttonContainer}>
                            <SubmitButton
                                handlePress={() => this.props.navigation.navigate('SignedOut')}
                                buttonText={buttonStrings.signOutButton}
                                icon= 'md-log-out'/>
                        </View>
                  </Animated.View>
              </TouchableWithoutFeedback>
          </Container>
        )
    }
}