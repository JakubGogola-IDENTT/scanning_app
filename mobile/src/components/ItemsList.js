import React from 'react';

import { TextInput, View, RefreshControl } from 'react-native';
import { Container, Content, List } from 'native-base';
import SingleListItem from './SingleListItem';
import TypePicker from '../components/TypePicker';
import inputFieldsStyles from '../styles/InputFieldsStyles';
import textStrings from '../assets/strings/TextStrings';

import itemsListStyles from '../styles/ItemsListStyles';
export default class ItemsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
            items: [],
            searchedPhrase: null,
            searchedType: null,
            refreshing: false,
            types: null,
        }
    }

    async componentWillMount() {
        this.setState({ searchedPhrase: null });
        await this.addItems();
        this.setState({ refreshing: false });
        this.setState({ isReady: true });
    }

    onSearchedPhraseChange = async (event) => {
        if (event === '') {
            event = null;
        }
        await this.setState({ searchedPhrase: event });
        await this.addItems();
    }

    onTypePickerValueChange = async (value) => {
        if (value === -1) {
            value = null;
        }
        await this.setState({ searchedType: value });
        await this.addItems();
    }

    filter = async () => {
        let filteredItems = [];

        if (this.state.searchedPhrase === null && this.state.searchedType === null) {
            return this.props.items;
        }

        filteredItems = this.filterByPhrase(this.props.items);
        filteredItems = this.filterByType(filteredItems);

        return filteredItems;
    }

    filterByPhrase = (items) => {
        if (this.state.searchedPhrase === null) {
            return items;
        }

        let filteredItems = [];
        let phrase = this.state.searchedPhrase.toLowerCase();

        items.forEach((item) => {
            let itemName = item.name.toLowerCase();
            if (itemName.includes(phrase)) {
                filteredItems.push(item);
            }
        });

        return filteredItems;
    }

    filterByType = (items) => {
        if (this.state.searchedType === null) {
            return items;
        }

        let filteredItems = [];
        items.forEach((item) => {
            if (item.type.id === this.state.searchedType) {
                filteredItems.push(item);
            }
        });

        return filteredItems;
    }

    addItems = async () => {
        let itemsList = [];
        let filteredItems = await this.filter();
        filteredItems.forEach((item, index) => {
            itemsList.push(<SingleListItem
                type={this.props.type}
                key={index}
                item={item}
                id={item.id}
                navigationProps={this.props.navigationProps}
                onReturnButtonHandler={() => this.props.onReturnButtonHandler(item.equipment_data.id, item.equipment_data.name)}
            />);
        });

        this.setState({ items: itemsList });
    }

    onRefresh = async () => {
        this.setState({
            refreshing: true,
            items: []
        });
        await this.props.onRefresh();
        await this.addItems();
        this.setState({ refreshing: false });
    }

    render() {
        if (!this.state.isReady) {
            return <Expo.AppLoading />
        } else {
            if (this.props.type === 'equipment') {
                return (
                    <Container>
                        <View style={inputFieldsStyles.input}>
                            <TextInput style={inputFieldsStyles.inputField}
                                onChangeText={(text) => this.onSearchedPhraseChange(text)}
                                keyboardType='default'
                                returnKeyType='next'
                                placeholder={textStrings.searchingPlaceholder}
                                secureTextEntry={false}
                                placeholderTextColor='#a2aabc'
                                underlineColorAndroid='transparent'
                            />
                        </View>
                        <View style={itemsListStyles.typePickerContainer}>
                            <TypePicker
                                types={this.props.types}
                                onValueChange={this.onTypePickerValueChange} />
                        </View>
                        <Content
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={() => this.onRefresh()} />
                            }>
                            <List>
                                {this.state.items}
                            </List>
                        </Content>
                    </Container>
                );
            } else {
                return (
                    <Content
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={() => this.onRefresh()} />
                        }>
                        <List>
                            {this.state.items}
                        </List>
                    </Content>
                );
            }
        }
    }
}