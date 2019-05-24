import React from 'react';
import {View} from 'react-native';

import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';
import TextInputField from '../components/TextInputField';
import inputDialogStyles from '../styles/InputDialogStyles.js';

/**
 * Props:
 * visible - is component visible
 * hide - behaviour to hide component
 * action - behaviour when accept clicked
 * handleChange - behaviour while writing text
 * text - text in inputField 
 */

export default class InputDialog extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View>
                 <Dialog
                        visible={this.props.visible}
                        onTouchOutside={() => {
                        this.setState({ visible: false });
                        }}
                        footer={
                            <DialogFooter>
                              <DialogButton
                                text="Anuluj"
                                onPress={this.props.hide}
                              />
                              <DialogButton
                                text="Zatwierdź"
                                onPress={this.props.action}
                              />
                            </DialogFooter>
                          }
                    >
                        <DialogContent style={inputDialogStyles.dialogContent}>
                            <View>
                                <TextInputField
                                 setStateHandler={this.props.handleChange}
                                 keyboardType = {this.props.keyboardType}
                                 returnKeyType = 'next'
                                 placeholder = {this.props.text}
                                 secureTextEntry = {false}
                            />
                            </View>
                        
                        </DialogContent>
                    </Dialog>
            </View>
        );
    }
}