import React from 'react';
import {
    createStackNavigator, createSwitchNavigator, createBottomTabNavigator,
    createDrawerNavigator, createAppContainer
} from 'react-navigation';
import LoginPanel from './login_panel/LoginPanel';
import RegistrationPanel from './registration_panel/RegistrationPanel';
import HomeScreen from './home/HomeScreen';
import ProfileView from './profile/ProfileView';
import ProfileDetailsView from './profile_details/ProfileDetailsView';
import EquipmentList from './equipment/EquipmentList';
import SingleItem from './equipment/SingleItem';
import HistoryView from './history/HistoryView';
import RentEquipmentView from './rent_equipment/RentEquipmentView';
import ReturnEquipmentView from './return_equipment/ReturnEquipmentView';
import ItemDetailsView from './item_details/ItemDetailsView';
import RentalInfoView from './rental_info/RentalInfoView';
import Icon from 'react-native-vector-icons/Ionicons';
import SingleListItem from './components/SingleListItem';
import PasswordResetView from './password_reset/PasswordResetView';
import PasswordResetConfirmView from './password_reset/PasswordResetConfirmView';
import ReturnQRView from './return_equipment/ReturnQRView';


export const SignedOutNavigator = createStackNavigator(
    {
        SignIn: LoginPanel,
        SignUp: RegistrationPanel,
        PasswordReset: PasswordResetView,
        PasswordResetConfirm: PasswordResetConfirmView,
    },
    {
        headerMode: 'none',
    }
);

export const BottomTabNavigator = createBottomTabNavigator(
    {
        Start: HomeScreen,
        Profil: ProfileView,
        Historia: HistoryView,
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Start') {
                    iconName = 'md-home';
                } else if (routeName === 'Profil') {
                    iconName = 'md-person';
                } else if (routeName === 'Historia') {
                    iconName = 'md-time';
                }

                return <Icon name={iconName} size={25} color={tintColor} />;
            },

        }),
        tabBarOptions: {
            activeTintColor: '#3b82c4',
            inactiveTintColor: 'gray',
        },
    }
);

export const MainNavigator = createStackNavigator(
    {
        Menu: BottomTabNavigator,
        Home: HomeScreen,
        Equipment: EquipmentList,
        Item: SingleItem,
        Rent: RentEquipmentView,
        Return: ReturnEquipmentView,
        ProfileDetails: ProfileDetailsView,
        ItemDetails: ItemDetailsView,
        ReturnQR: ReturnQRView,
    }, 

    {
        headerMode: 'none',
    }
);

export const SwitchNavigator = createSwitchNavigator(
    {
        SignedOut: SignedOutNavigator,
        SignedIn: MainNavigator,
    },
    {
        initialRouteName: 'SignedOut',
    }
);


const AppContainer = createAppContainer(SwitchNavigator);
export default AppContainer; 