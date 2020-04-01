import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/components/redux/store';
import {Text, View} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStore} from 'redux';
// import store from './src/components/redux/store';
import HomeScreen from './src/components/screen/Home/HomeScreen';
import Setting from './src/components/screen/Setting/Setting';
import Cart from './src/components/screen/Cart';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ProductAdd from './src/components/screen/Product/ProductAdd';
import ProductEditScreen from './src/components/screen/Product/ProductEdit';
import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen from './src/components/screen/Auth/LoginScreen';
import RegisterScreen from './src/components/screen/Auth/RegisterScreen';
const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen,
});
const AppStack = createStackNavigator({
  Home: HomeScreen,
  EditProduct: ProductEditScreen,
});
const TabNavigator = createBottomTabNavigator({
  Home: {
    screen: AppStack,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({tintColor}) => (
        <Icon name="home" color={tintColor} size={25} />
      ),
    },
  },
  Cart: {
    screen: Cart,
    navigationOptions: {
      tabBarLabel: 'Cart',
      tabBarIcon: ({tintColor}) => (
        <Icon name="cart-arrow-down" color={tintColor} size={25} />
      ),
    },
  },
  Product: {
    screen: ProductAdd,
    navigationOptions: {
      tabBarLabel: 'Add product',
      tabBarIcon: ({tintColor}) => (
        <Icon name="cart-plus" color={tintColor} size={25} />
      ),
    },
  },
  Setting: {
    screen: Setting,
    navigationOptions: {
      tabBarLabel: 'Setting',
      tabBarIcon: ({tintColor}) => (
        <Icon name="settings" color={tintColor} size={25} />
      ),
    },
  },
});

const AppContainer = createAppContainer(
  createSwitchNavigator({
    Auth: AuthStack,
    App: TabNavigator,
  }),
);
// const AppContainer = createAppContainer(TabNavigator);
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContainer />
      </PersistGate>
    </Provider>
  );
}
export default App;
