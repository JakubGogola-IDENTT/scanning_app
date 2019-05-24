import React from 'react';

import {View, TouchableOpacity} from 'react-native';
import {Text} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

import dataFieldStyles from '../styles/DataFieldStyles.js';   


/**
 * Props:
 * handlePress - defining behaviour on button click
 * title - name of the type of data
 * data - 
 * icon - 
 */
export default class DataEditField extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        return(
             <View style={dataFieldStyles.fieldContainer}>
                <View style={dataFieldStyles.textContainer}>
                    <View style={dataFieldStyles.titleContainer}>
                        <Icon style={dataFieldStyles.icon} name= {this.props.icon}/>
                        <Text style={dataFieldStyles.titleText}>{this.props.title}</Text>
                    </View>
                    <View>
                        <Text style={dataFieldStyles.dataText}>{this.props.data}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => this.props.handlePress()}>
                    <Icon style={dataFieldStyles.editIcon} name='md-create'/>
                </TouchableOpacity>
            </View> 
        );
    }
}