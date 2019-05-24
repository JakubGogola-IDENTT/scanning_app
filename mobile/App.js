import React from 'react';
import AppContainer  from './src/router.js';
import { createAppContainer } from 'react-navigation';

// const App = createAppContainer(SwitchNavigator);
// export default App;

export default class App extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
        };
    }

    async componentWillMount() {
        await Expo.Font.loadAsync({
          Roboto: require("native-base/Fonts/Roboto.ttf"),
          Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
          Ionicons: require("native-base/Fonts/Ionicons.ttf")
        });
        this.setState({ isReady: true });
      }    

    render() {
        if(!this.state.isReady) {
            return <Expo.AppLoading />
        } else {
            return <AppContainer />
        }
    }
}
