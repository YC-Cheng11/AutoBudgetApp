import React from 'react';
import { connect } from 'dva';
import {
  Dimensions,
  Keyboard,
  StyleSheet,
} from 'react-native';
import moment from 'moment';
import uuid from 'uuid';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ExpensePage from './ExpensePage';
import IncomePage from './IncomePage';

const Tab = createMaterialTopTabNavigator();
class CreateTask extends React.PureComponent {
  state = {}
  // Local path to file on the device
  render() {
    const { route } = this.props;
    return (
      <Tab.Navigator>
        <Tab.Screen name="Expense" component={ExpensePage} initialParams={route.params.params} />
        <Tab.Screen name="Income" component={IncomePage} initialParams={route.params.params} />
      </Tab.Navigator>
    )
  }
}
export default connect(state => ({
  loading: state.loading,
  effects: state.loading.effects
}))(CreateTask);