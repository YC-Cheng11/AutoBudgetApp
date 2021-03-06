import React, { useState, Fragment } from 'react';
import dva, { connect } from 'dva';
import { StyleSheet, View, Image, SafeAreaView, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import _ from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RecordPage from '../RecordList/RecordPage';



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
    monthlyList: [],
    markedDate: [],
    currentDate: `${moment().format('YYYY')}-${moment().format(
      'MM'
    )}-${moment().format('DD')}`,
    isModalVisible: false,
    selectedTask: null,
    isDateTimePickerVisible: false,
  }

  UNSAFE_componentWillMount() {
    console.log("here");
    console.log(this.state.currentDate);
    this.onDayPress({ dateString: this.state.currentDate });
    this._handleDeletePreviousDayTask();
  }

  // componentDidUpdate(prevProps) {
  //   // if (prevProps.route.params?.currentDate !== this.props.route.params?.currentDate) {
  //   if (this.props.route.params?.currentDate) {
  //     const result = this.props.route.params?.currentDate;
  //     this._updateCurrentTask(result);
  //   }
  // }

  _handleDeletePreviousDayTask = async () => {
    const { currentDate } = this.state;
    try {
      const value = await AsyncStorage.getItem('TODO');

      if (value !== null) {
        // const todoList = JSON.parse(value);
        // const todayDate = `${moment().format('YYYY')}-${moment().format(
        //   'MM'
        // )}-${moment().format('DD')}`;
        // const checkDate = moment(todayDate);
        // await todoList.filter(item => {
        //   const currDate = moment(item.date);
        //   const checkedDate = checkDate.diff(currDate, 'days');
        //   if (checkedDate > 0) {
        //     item.todoList.forEach(async listValue => {
        //       try {
        //         await Calendar.deleteEventAsync(
        //           listValue.alarm.createEventAsyncRes.toString()
        //         );
        //       } catch (error) {
        //         console.log(error);
        //       }
        //     });
        //     return false;
        //   }
        //   return true;
        // });

        // await AsyncStorage.setItem('TODO', JSON.stringify(updatedList));
        this._updateCurrentTask(currentDate);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  onDayPress = async (day) => {
    const selectedDate = day.dateString;
    this._updateCurrentTask(selectedDate);
    this.setState({
      currentDate: selectedDate,
      selected: selectedDate
    });
    await AsyncStorage.setItem('currentDate', selectedDate);
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
            monthlyList: JSON.parse(value)
          });
        } else {
          this.setState({
            markedDate: markDot,
            todoList: [],
            monthlyList: JSON.parse(value)
          });
        }
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  renderItem = (item) => {
    return (
      <TouchableOpacity
        key={item.key}
        style={styles.taskListContent}
      >
        <View
          style={{
            marginLeft: 13,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            {/* <View
              style={{
                height: 12,
                width: 12,
                borderRadius: 6,
                backgroundColor: item.color,
                marginRight: 8,
              }}
            /> */}
            <FontAwesome
              name={item.type == "Expense" ? "arrow-down" : "arrow-up"}
              style={{ color: item.type == "Expense" ? "red" : "green", fontSize: 15 }}
            />
            <Text
              style={{
                color: '#554A4C',
                fontSize: 20,
                // fontWeight: '700',
              }}
            >
              {item.category}:{item.item} ${item.amount}
            </Text>
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                marginLeft: 20,
              }}
            >
              <Text
                style={{
                  color: '#BBBBBB',
                  fontSize: 14,
                }}
              >
                {item.notes}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  renderCalendarWithSelectableDate = () => {
    const { selected, currentDate, todoList, monthlyList } = this.state;
    const { navigation } = this.props;
    return (
      <Fragment>
        <View style={styles.calendar}>
          <Calendar
            current={new Date()}
            // hideExtraDays
            onDayPress={this.onDayPress}
            markedDates={{
              [selected]: {
                selected: true,
                disableTouchEvent: true,
                selectedColor: 'orange',
                selectedTextColor: 'white',
              },
            }}
            theme={{
              backgroundColor: 'grey',
              calendarBackground: '#ffffff',
              textSectionTitleColor: '#b6c1cd',
              textSectionTitleDisabledColor: '#d9e1e8',
              selectedDayBackgroundColor: '#00adf5',
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#00adf5',
              dayTextColor: '#2d4150',
              textDisabledColor: '#d9e1e8',
              dotColor: '#00adf5',
              selectedDotColor: '#ffffff',
              arrowColor: 'orange',
            }}
          />
        </View>
        <View>
          {/* <TouchableOpacity
            onPress={() =>
              navigation.navigate('recordList', {
                screen: 'Daily',
                params: {
                  todoList,
                  monthlyList,
                  currentDate
                }
              })
            }
            style={styles.viewDetails}
          >
            <FontAwesome
              name="list-alt"
              style={{ color: "#fff", fontSize: 30 }}
            />
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('createTask', {
                screen: 'Expense',
                params: {
                  currentDate,
                  updateCurrentTask: this._updateCurrentTask
                }
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
        </View>
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 20,
          }}
        >
          <Text>{currentDate}</Text>
          {todoList.map(item => (
            this.renderItem(item)
          ))}
        </ScrollView>
      </Fragment>

    );
  };
  render() {
    return (
      <SafeAreaView showsVerticalScrollIndicator={true} >
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
    marginBottom: 60,
  },
  text: {
    textAlign: 'center',
    padding: 10,
    backgroundColor: 'lightgrey',
    fontSize: 16,
  },
  viewTask: {
    position: 'absolute',
    bottom: 0,
    right: 17,
    height: 50,
    width: 50,
    backgroundColor: 'orange',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2E66E7',
    // shadowOffset: {
    //   width: 0,
    //   height: 5,
    // },
    // shadowRadius: 30,
    shadowOpacity: 0.5,
    elevation: 5,
    zIndex: 999,
  },
  viewDetails: {
    position: 'absolute',
    bottom: 0,
    right: 70,
    height: 50,
    width: 50,
    backgroundColor: 'orange',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2E66E7',
    // shadowOffset: {
    //   width: 0,
    //   height: 5,
    // },
    // shadowRadius: 30,
    shadowOpacity: 0.5,
    elevation: 5,
    zIndex: 999,
  },
});