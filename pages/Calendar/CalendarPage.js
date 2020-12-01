import React, { useState, Fragment } from 'react';
import dva, { connect } from 'dva';
import { StyleSheet, View, Image, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import _ from 'lodash';



class CalendarPage extends React.PureComponent {
  state = {
    selected: '',
    datesWhitelist: [
      {
        start: moment(),
        end: moment().add(365, 'days'), // total 4 days enabled
      },
    ],
    todoList: [],
    markedDate: [],
    currentDate: `${moment().format('YYYY')}-${moment().format(
      'MM'
    )}-${moment().format('DD')}`,
    isModalVisible: false,
    selectedTask: null,
    isDateTimePickerVisible: false,
  }

  onDayPress = (day) => {
    this.setState({
      selected: day.dateString
    })
  };

  getDisabledDates = (startDate, endDate, daysToDisable) => {
    const disabledDates = {};
    const start = moment(startDate);
    const end = moment(endDate);
    for (let m = moment(start); m.diff(end, 'days') <= 0; m.add(1, 'days')) {
      if (_.includes(daysToDisable, m.weekday())) {
        disabledDates[m.format('YYYY-MM-DD')] = { disabled: true };
      }
    }
    return disabledDates;
  };


  _updateCurrentTask = async currentDate => {
    try {
      const value = await AsyncStorage.getItem('TODO');
      if (value !== null) {
        const todoList = JSON.parse(value);
        const markDot = todoList.map(item => item.markedDot);
        const todoLists = todoList.filter(item => {
          if (currentDate === item.date) {
            return true;
          }
          return false;
        });
        if (todoLists.length !== 0) {
          this.setState({
            markedDate: markDot,
            todoList: todoLists[0].todoList,
          });
        } else {
          this.setState({
            markedDate: markDot,
            todoList: [],
          });
        }
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  renderCalendarWithSelectableDate = () => {
    const { selected, currentDate } = this.state;
    const { navigation } = this.props;
    return (
      <Fragment>
        <Fragment></Fragment>
        <Calendar
          current={new Date()}
          // style={styles.calendar}
          hideExtraDays
          onDayPress={this.onDayPress}
          markedDates={{
            [selected]: {
              selected: true,
              disableTouchEvent: true,
              selectedColor: 'orange',
              selectedTextColor: 'white',
            },
          }}
        />
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('CreateTask', {
              updateCurrentTask: this._updateCurrentTask,
              currentDate,
              createNewCalendar: this._createNewCalendar,
            })
          }
          style={styles.viewTask}
        >
          <Image
            source={require('../../assets/plus.png')}
            style={{
              height: 30,
              width: 30,
            }}
          />
        </TouchableOpacity>
      </Fragment>
    );
  };
  render() {
    return (
      <SafeAreaView showsVerticalScrollIndicator={false} >
        { this.renderCalendarWithSelectableDate()}
      </SafeAreaView>
    );
  };
}
export default connect(state => ({
  loading: state.loading,
  effects: state.loading.effects
}))(CalendarPage);

const styles = StyleSheet.create({
  calendar: {
    marginBottom: 10,
  },
  text: {
    textAlign: 'center',
    padding: 10,
    backgroundColor: 'lightgrey',
    fontSize: 16,
  },
});