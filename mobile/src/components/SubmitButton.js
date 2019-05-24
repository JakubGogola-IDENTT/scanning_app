import React from 'react';

import { View} from 'react-native';
import { Text, Button } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

import buttonStyles from '../styles/ButtonStyles.js';


/**
 * Props:
 * handlePress - defining behaviour on button click
 * buttonText - text on button
 * icon - icon name
 */
export default class SubmitButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            // <TouchableOpacity onPress={this.props.handlePress} disabled={this.props.disabled}>
            //     <View style={buttonStyles.actionButton}>
            //         <Icon name={this.props.icon} style={buttonStyles.icons}/>
            //         <View style={buttonStyles.textContainer}>
            //             <Text style={buttonStyles.buttonText}>{this.props.buttonText}</Text>
            //         </View >
            //     </View>  
            // </TouchableOpacity>
            <Button iconLeft
                style={buttonStyles.actionButton}
                onPress={this.props.handlePress}
                disabled={this.props.disabled}>
                <Icon name={this.props.icon} style={buttonStyles.icons} />
                <View style={buttonStyles.textContainer}>
                    <Text style={buttonStyles.buttonText}>{this.props.buttonText}</Text>
                </View>
            </Button>
        );
    }
}