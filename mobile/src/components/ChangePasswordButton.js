import React from 'react';
import {View, Alert} from 'react-native';

import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';
import TextInputField from './TextInputField';
import inputDialogStyles from '../styles/InputDialogStyles.js';
import {isPassword} from '../validator/DataValidator.js';
import alertStrings from '../assets/strings/AlertStrings.js';
import SubmitButton from './SubmitButton';
import buttonStrings from '../assets/strings/ButtonStrings.js';


/**
 * Props:
 * visible - is component visible
 * hide - behaviour to hide component
 * action - behaviour when accept clicked
 * handleChange - behaviour while writing text
 * text - text in inputField 
 */

export default class ChangePasswordDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state={
          password: null,
          newPassword: null,
          confirmPassword: null,
          visible: false,
        }
    }
    
    handlePassChange = (event) => {
      this.setState({password: event});
    }

    handleNewPassChange = (event) => {
      this.setState({newPassword: event});
    }

    handleConfPassChange = (event) => {
      this.setState({confirmPassword: event});
    }

    checkInputFields = () => {
      if(!(this.state.password && this.state.newPassword && this.state.confirmPassword)) {
        return false;
      } else {
         return true;
      }
  }

    change = () => {
      if(!this.checkInputFields()) {
        this.showWarningAlert(alertStrings.emptyField);
      }
      else if (!isPassword(this.state.newPassword)) {
        this.showWarningAlert(alertStrings.passwordToShort);
      }
      else if (this.state.newPassword.localeCompare(this.state.confirmPassword)!=0) {
          this.showWarningAlert(alertStrings.differentPasswords);
      } 
      else {
        this.props.updatePassRequest(this.state.password, this.state.newPassword)
            this.setState({visible: false})
      }
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

  showDialog = (event) => {
    this.setState({visible: true});
  }

  hideDialog = (event) => {
    this.setState({visible: false});
  }



    render() {
        return(
            <View>
                <SubmitButton
                  buttonText={buttonStrings.newPasswordButton}
                  icon='md-refresh'
                  handlePress={this.showDialog}
                            />
                 <Dialog
                        visible={this.state.visible}
                        onTouchOutside={() => {
                        this.hideDialog}}
                        footer={
                            <DialogFooter>
                              <DialogButton
                                text="Anuluj"
                                onPress={this.hideDialog}
                              />
                              <DialogButton
                                text="Zatwierdź"
                                onPress={this.change}
                              />
                            </DialogFooter>
                          }
                    >
                        <DialogContent style={inputDialogStyles.dialogContent}>
                            <View>
                                <TextInputField
                                 setStateHandler={this.handlePassChange}
                                 keyboardType = 'default'
                                 returnKeyType = 'next'
                                 placeholder = 'Hasło'
                                 secureTextEntry = {true}
                            />
                            <TextInputField
                                 setStateHandler={this.handleNewPassChange}
                                 keyboardType = 'default'
                                 returnKeyType = 'next'
                                 placeholder = 'Nowe hasło'
                                 secureTextEntry = {true}
                            />
                            <TextInputField
                                 setStateHandler={this.handleConfPassChange}
                                 keyboardType = 'default'
                                 returnKeyType = 'next'
                                 placeholder = 'Powtórz nowe hasło'
                                 secureTextEntry = {true}
                            />
                            </View>
                        
                        </DialogContent>
                    </Dialog>
            </View>
        );
    }
}