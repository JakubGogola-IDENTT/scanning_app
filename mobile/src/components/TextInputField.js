import React from 'react';
import {View, TextInput} from 'react-native';

import inputFieldsStyles from '../styles/InputFieldsStyles.js';


export default class TextInputField extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View style={inputFieldsStyles.input}>
                <TextInput style={inputFieldsStyles.inputField}
                    onChangeText = {(event) => this.props.setStateHandler(event)}
                    keyboardType = {this.props.keyboardType}
                    returnKeyType = {this.props.returnKeyType}
                    placeholder = {this.props.placeholder}
                    secureTextEntry = {this.props.secureTextEntry}
                    placeholderTextColor = '#a2aabc'
                    underlineColorAndroid = 'transparent'
                    value={this.props.value}
                />
            </View>
        );
    }
}