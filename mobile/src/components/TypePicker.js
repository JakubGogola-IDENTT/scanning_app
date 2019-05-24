import React from 'react';

import { View, Alert } from 'react-native';
import { Container, Picker, Content, Form } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

import alertStrings from '../assets/strings/AlertStrings';
import typePickerStyles from '../styles/TypePickerStyles';
import apiConfig from '../services/api/config';
export default class TypePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            types: null,
            pickerItems: null,
            selected: null,
            isReady: false,
        };
    }

    componentWillMount = async () => {
        await this.fetchTypes();
        await this.addTypes();
        this.setState({ isReady: true });

    }

    fetchTypes = async () => {
        this.setState({ types: this.props.types });
    }

    addTypes = async () => {
        let items = [];

        items.push(<Picker.Item
            style={typePickerStyles.pickerItem}
            key={-1}
            label={'Any'}
            value={-1} />);

        this.state.types.forEach((type) => {
            items.push(<Picker.Item
                style={typePickerStyles.pickerItem}
                key={type.id}
                label={type.type_name}
                value={type.id} />);
        })

        await this.setState({ pickerItems: items });
    }

    onValueChange = (value) => {
        this.setState({selected: value});
        this.props.onValueChange(value);
    }

    render() {
        return (
                <Form>
                    <Picker
                        mode='dropdown'
                        iosHeader='Typ'
                        iosIcon={<Icon name='md-arrow-dropdown' />}
                        style={{ width: undefined }}
                        selectedValue={this.state.selected}
                        onValueChange={(value) => this.onValueChange(value)}
                    >
                        {this.state.pickerItems}
                    </Picker>
                </Form>
        );
    }
}