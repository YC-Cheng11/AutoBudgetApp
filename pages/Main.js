import * as React from 'react';
import dva, { connect } from 'dva';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import CalendarPage from './Calendar/CalendarPage';
import SummaryPage from './Summary/SummaryPage';
import AccountPage from './Account/AccountPage';
import CreateTask from './Calendar/CreateTaskPage';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

class MainPage extends React.PureComponent {
  state = {

  }

  HomeStack() {
    return (
      <Stack.Navigator
        initialRouteName="Calendar"
        screenOptions={{
          headerStyle: { backgroundColor: 'orange' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' }
        }}>
        <Stack.Screen
          name="Calendar"
          component={CalendarPage}
          options={{ title: 'Calendar' }} />
        <Stack.Screen
          name="Account"
          component={AccountPage}
          options={{ title: 'Account' }} />
        <Stack.Screen
          name="Summary"
          component={SummaryPage}
          options={{ title: 'Summary' }} />
        <Stack.Screen name="CreateTask" component={CreateTask} />
      </Stack.Navigator>

    );
  }

  AccountStack() {
    return (
      <Stack.Navigator
        initialRouteName="Account"
        screenOptions={{
          headerStyle: { backgroundColor: 'orange' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' }
        }}>
        <Stack.Screen
          name="Calendar"
          component={CalendarPage}
          options={{ title: 'Calendar' }} />
        <Stack.Screen
          name="Account"
          component={AccountPage}
          options={{ title: 'Account' }} />
        <Stack.Screen
          name="Summary"
          component={SummaryPage}
          options={{ title: 'Summary' }} />
        <Stack.Screen name="CreateTask" component={CreateTask} />
      </Stack.Navigator>
    );
  }

  SummaryStack() {
    return (
      <Stack.Navigator
        initialRouteName="Summary"
        screenOptions={{
          headerStyle: { backgroundColor: 'orange' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' }
        }}>
        <Stack.Screen
          name="Calendar"
          component={CalendarPage}
          options={{ title: 'Calendar' }} />
        <Stack.Screen
          name="Account"
          component={AccountPage}
          options={{ title: 'Account' }} />
        <Stack.Screen
          name="Summary"
          component={SummaryPage}
          options={{ title: 'Summary' }} />
        <Stack.Screen name="CreateTask" component={CreateTask} />
      </Stack.Navigator>
    );
  }
  // Local path to file on the device
  render() {
    const { dispatch, effects } = this.props;
    return (
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Calendar"
          tabBarOptions={{
            activeTintColor: 'orange',
          }}>
          <Tab.Screen
            name="HomeStack"
            component={this.HomeStack}
            options={{
              tabBarLabel: 'Calendar',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="home"
                  color={color}
                  size={size}
                />
              ),
            }} />
          <Tab.Screen
            name="AccountStack"
            component={this.AccountStack}
            options={{
              tabBarLabel: 'Account',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="account"
                  color={color}
                  size={size}
                />
              ),
            }} />
          <Tab.Screen
            name="SummaryStack"
            component={this.SummaryStack}
            options={{
              tabBarLabel: 'Summary',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="account-details"
                  color={color}
                  size={size}
                />
              ),
            }} />
        </Tab.Navigator>
      </NavigationContainer>
    )
  }
}
export default connect(state => ({
  loading: state.loading,
  effects: state.loading.effects
}))(MainPage);