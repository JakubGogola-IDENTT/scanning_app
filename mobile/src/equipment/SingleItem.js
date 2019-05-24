import React from 'react';
import { View, Text, } from 'react-native';

export default class SingleItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View>
                <Text>It's another screen of app!</Text>
            </View>
        )
    }
}