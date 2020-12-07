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
import SearchPage from './Search/SearchPage';
import ProvideDataPage from './Other/ProvideDataPage';
import CreateTask from './Calendar/CreateTaskPage';
import TodoStore from './data/TodoStore';
import RecordPage from './RecordList/RecordPage';
import MonthlyExpense from './RecordList/MonthlyExpense';
import DailyExpense from './RecordList/DailyExpense';
import LocationComponent from './Common/LocationComponent';
import CameraComponent from './Common/CameraComponent';
console.disableYellowBox = true;
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
          name="Search"
          component={SearchPage}
          options={{ title: 'Search' }} />
        <Stack.Screen
          name="Account"
          component={AccountPage}
          options={{ title: 'Account' }} />
        <Stack.Screen
          name="Summary"
          component={SummaryPage}
          options={{ title: 'Summary' }} />
        <Stack.Screen
          name="Other"
          component={ProvideDataPage}
          options={{ title: 'Other' }} />

        <Stack.Screen name="createTask" component={CreateTask} />
        <Stack.Screen name="recordList" component={RecordPage} />
        <Stack.Screen name="camera" component={CameraComponent} />
        <Stack.Screen name="location" component={LocationComponent} />

      </Stack.Navigator>

    );
  }

  SearchStack() {
    return (
      <Stack.Navigator
        initialRouteName="Search"
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
          name="Search"
          component={SearchPage}
          options={{ title: 'Search' }} />
        <Stack.Screen
          name="Account"
          component={AccountPage}
          options={{ title: 'Account' }} />
        <Stack.Screen
          name="Summary"
          component={SummaryPage}
          options={{ title: 'Summary' }} />
        <Stack.Screen
          name="Other"
          component={ProvideDataPage}
          options={{ title: 'Other' }} />
        <Stack.Screen name="createTask" component={CreateTask} />
        <Stack.Screen name="recordList" component={RecordPage} />
        <Stack.Screen name="camera" component={CameraComponent} />
        <Stack.Screen name="location" component={LocationComponent} />
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
          name="Search"
          component={SearchPage}
          options={{ title: 'Search' }} />
        <Stack.Screen
          name="Account"
          component={AccountPage}
          options={{ title: 'Account' }} />
        <Stack.Screen
          name="Summary"
          component={SummaryPage}
          options={{ title: 'Summary' }} />
        <Stack.Screen
          name="Other"
          component={ProvideDataPage}
          options={{ title: 'Other' }} />
        <Stack.Screen name="createTask" component={CreateTask} />
        <Stack.Screen name="recordList" component={RecordPage} />
        <Stack.Screen name="camera" component={CameraComponent} />
        <Stack.Screen name="location" component={LocationComponent} />
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
          name="Search"
          component={SearchPage}
          options={{ title: 'Search' }} />
        <Stack.Screen
          name="Summary"
          component={SummaryPage}
          options={{ title: 'Summary' }} />
        <Stack.Screen
          name="Other"
          component={ProvideDataPage}
          options={{ title: 'Other' }} />
        <Stack.Screen name="createTask" component={CreateTask} />
        <Stack.Screen name="recordList" component={RecordPage} />
        <Stack.Screen name="camera" component={CameraComponent} />
        <Stack.Screen name="location" component={LocationComponent} />
      </Stack.Navigator>
    );
  }
  OtherStack() {
    return (
      <Stack.Navigator
        initialRouteName="Other"
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
          name="Search"
          component={SearchPage}
          options={{ title: 'Search' }} />
        <Stack.Screen
          name="Summary"
          component={SummaryPage}
          options={{ title: 'Summary' }} />
        <Stack.Screen
          name="Other"
          component={ProvideDataPage}
          options={{ title: 'Other' }} />
        <Stack.Screen name="createTask" component={CreateTask} />
        <Stack.Screen name="recordList" component={RecordPage} />
        <Stack.Screen name="camera" component={CameraComponent} />
        <Stack.Screen name="location" component={LocationComponent} />
      </Stack.Navigator>
    );
  }
  // Local path to file on the device
  render() {
    const { dispatch, effects } = this.props;
    return (

      <TodoStore>
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
                    name="calendar"
                    color={color}
                    size={size}
                  />
                ),
              }} />
            <Tab.Screen
              name="SearchStack"
              component={this.SearchStack}
              options={{
                tabBarLabel: 'Search',
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons
                    name="cloud-search"
                    color={color}
                    size={size}
                  />
                ),
              }} />
            {/* <Tab.Screen
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
              }} /> */}
            <Tab.Screen
              name="SummaryStack"
              component={this.SummaryStack}
              options={{
                tabBarLabel: 'Summary',
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons
                    name="chart-timeline"
                    color={color}
                    size={size}
                  />
                ),
              }} />
            <Tab.Screen
              name="OtherStack"
              component={this.OtherStack}
              options={{
                tabBarLabel: 'Other',
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons
                    name="database-plus"
                    color={color}
                    size={size}
                  />
                ),
              }} />
          </Tab.Navigator>
        </NavigationContainer>
      </TodoStore>
    )
  }
}
export default connect(state => ({
  loading: state.loading,
  effects: state.loading.effects
}))(MainPage);