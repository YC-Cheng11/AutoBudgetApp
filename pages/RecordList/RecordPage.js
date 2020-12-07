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
import DailyExpense from './DailyExpense';
import MonthlyExpense from './MonthlyExpense';

const Tab = createMaterialTopTabNavigator();
class RecordPage extends React.PureComponent {
  state = {}
  // Local path to file on the device

  compare(a, b) {
    if (a.date < b.date) {
      return -1;
    }
    if (a.date > b.date) {
      return 1;
    }
    return 0;
  }

  render() {
    const { route } = this.props;
    const { currentDate, todoList, monthlyList } = route.params.params;
    console.log(this.props.route);
    monthlyList.sort(this.compare);
    return (
      <Tab.Navigator>
        <Tab.Screen name="Daily" children={() => <DailyExpense todoList={todoList} />} options={{
          gestureEnabled: false,
        }} />
        <Tab.Screen name="Monthly" children={() => <MonthlyExpense monthlyList={monthlyList} />} options={{
          gestureEnabled: false,
        }} />
      </Tab.Navigator>
    )
  }
}
export default connect(state => ({
  loading: state.loading,
  effects: state.loading.effects
}))(RecordPage);