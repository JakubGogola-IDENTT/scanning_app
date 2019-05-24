import React from 'react';

import {Alert, View} from 'react-native';

import InputDialog from '../components/InputDialog';
import DataField from '../components/DataField'; 
import alertStrings from '../assets/strings/AlertStrings.js';



/**
 * Props:
 * handlePress - defining behaviour on button click
 * title - name of the type of data
 * icon - 
 * warningAlert - text in warning alert when data are invalid
 */
export default class DataEditField extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            visible: false,
            data: this.props.data,
            newData: null,
        }
    }

    hideDialog = (event) => {
        this.setState({visible: false});
    }

    showDialog = (event) => {
        this.setState({visible: true});
    }

    handleDataChange = (event) => {
        this.setState({newData: event});
    }

    updateData = () => {
        if(!this.state.newData) {
            this.showWarningAlert(alertStrings.emptyField)
        } else if(this.props.isValidated 
            && !this.props.validator(this.state.newData)) {
                this.showWarningAlert(this.props.warningAlert)
        } else { 
            this.props.updateRequest(this.props.label, this.state.newData)
            this.setState({data: this.state.newData})
            this.setState({visible: false})
        }
        
    }

    showWarningAlert(text) {
        Alert.alert(
          alertStrings.invalidData,
          text,
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          {cancelable: false},
        );
      }

    render () {
        return(
             <View>
                <InputDialog
                            visible={this.state.visible}
                            handleChange={this.handleDataChange}
                            hide={this.hideDialog}
                            text={this.props.title}
                            action={this.updateData}
                            keyboardType = {this.props.keyboardType}/>
               <DataField 
                            title = {this.props.title}
                            data = {this.state.data}
                            handlePress = {this.showDialog}
                            icon = {this.props.icon}/>
            </View> 
        );
    }
}