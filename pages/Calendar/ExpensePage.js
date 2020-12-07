import React, { useState, useEffect, Component } from 'react';
import dva, { connect } from 'dva';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TextInput,
  Keyboard,
  StyleSheet,
  Image
} from 'react-native';
// import { Select, Option } from 'react-native-select-lists';
import RNPickerSelect from 'react-native-picker-select';
import Constants from 'expo-constants';
import { Context } from '../../utils/Context';
import moment from 'moment';
import uuid from 'uuid';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
const styles = StyleSheet.create({
  createTaskButton: {
    width: 180,
    height: 40,
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 5,
    justifyContent: 'center',
  },
  seperator: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#979797',
    alignSelf: 'center',
    marginVertical: 20,
  },
  date: {
    color: 'orange',
    fontSize: 16,
    fontWeight: '600',
    paddingLeft: 10
  },
  notes: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
  },
  notesContent: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#979797',
    alignSelf: 'center',
    marginVertical: 20,
  },
  learn: {
    height: 23,
    width: 51,
    backgroundColor: '#F8D557',
    justifyContent: 'center',
    borderRadius: 5,
  },
  design: {
    height: 23,
    width: 59,
    backgroundColor: '#62CCFB',
    justifyContent: 'center',
    borderRadius: 5,
    marginRight: 7,
  },
  readBook: {
    height: 23,
    width: 83,
    backgroundColor: '#4CD565',
    justifyContent: 'center',
    borderRadius: 5,
    marginRight: 7,
  },
  title: {
    height: 25,
    borderColor: '#5DD976',
    borderLeftWidth: 1,
    paddingLeft: 8,
    fontSize: 19,
  },
  taskContainer: {
    marginTop: 5,
    height: 'auto',
    width: 327,
    alignSelf: 'center',
    borderRadius: 20,
    shadowColor: '#2E66E7',
    backgroundColor: '#ffffff',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowRadius: 20,
    shadowOpacity: 0.2,
    elevation: 5,
    padding: 15,
  },
  calenderContainer: {
    marginTop: 30,
    width: 350,
    height: 350,
    alignSelf: 'center',
  },
  newTask: {
    alignSelf: 'center',
    fontSize: 20,
    width: 120,
    height: 25,
    textAlign: 'center',
  },
  backButton: {
    flexDirection: 'row',
    marginTop: 60,
    width: '100%',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#eaeef7',
  },
});
class ExpensePage extends React.PureComponent {
  state = {
    selectedDay: {
      [`${moment().format('YYYY')}-${moment().format('MM')}-${moment().format(
        'DD'
      )}`]: {
        selected: true,
        selectedColor: '#2E66E7',
      },
    },
    inputHeight: 0,
    currentDay: moment().format(),
    amount: '',
    notesText: '',
    category: '',
    item: '',
    keyboardHeight: 0,
    visibleHeight: Dimensions.get('window').height,
    alarmTime: moment().format(),
    isDateTimePickerVisible: false,
    timeType: '',
    creatTodo: {},
    createEventAsyncRes: '',
  }

  componentWillUnmount() {
    Keyboard.removeListener('keyboardDidShow', this._keyboardDidShow);
    Keyboard.removeListener('keyboardDidHide', this._keyboardDidHide);
  }

  _keyboardDidShow = e => {
    this.setState({
      keyboardHeight: e.endCoordinates.height,
      visibleHeight:
        Dimensions.get('window').height - e.endCoordinates.height - 30,
    });
  };

  _keyboardDidHide = () => {
    this.setState({
      visibleHeight: Dimensions.get('window').height,
    });
  };
  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleCreateEventData = async value => {
    const { state: { amount, notesText, item, category }, props: { navigation, route } } = this;
    const { currentDate, updateCurrentTask } = route.params;
    const createTodo = {
      key: uuid(),
      date: currentDate,
      todoList: [
        {
          key: uuid(),
          amount: amount,
          notes: notesText,
          item: item,
          category: category,
          type: "Expense",
          color: `rgb(${Math.floor(
            Math.random() * Math.floor(256)
          )},${Math.floor(Math.random() * Math.floor(256))},${Math.floor(
            Math.random() * Math.floor(256)
          )})`,
        },
      ],
      markedDot: {
        date: currentDate,
        dots: [
          {
            key: uuid(),
            color: '#2E66E7',
            selectedDotColor: '#2E66E7',
          },
        ],
      },
    };
    await value.updateTodo(createTodo);
    await updateCurrentTask(currentDate);
    navigation.navigate('Calendar');
  };


  _handleSizeChange = event => {
    console.log('_handleSizeChange ---->', event.nativeEvent.contentSize.height);

    this.setState({
      inputHeight: event.nativeEvent.contentSize.height
    });
  };

  //https://reactnativemaster.com/react-native-camera-expo-example
  // Local path to file on the device
  render() {
    const { navigation } = this.props;
    return (
      <Context.Consumer>
        {value => (
          <>
            <ScrollView>
              <View style={styles.taskContainer}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.date}>Date: {this.props.route.params.currentDate}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                    style={{
                      alignSelf: 'flex-end',
                      alignItems: 'center',
                    }}
                    onPress={() =>
                      navigation.navigate('camera', {
                        returnPage: "Expense"
                      })
                    }>
                    {this.props.photo ?
                      <Image source={{ uri: this.props.photo.uri }} style={{ width: 200, height: 150 }} />
                      : null
                    }
                    <Text style={styles.date}>
                      Take Photo
                        </Text>
                    <FontAwesome
                      name="camera"
                      style={{ color: "black", fontSize: 25 }}
                    />
                  </TouchableOpacity>
                </View>
                <View>
                  <Text style={styles.notes}>Category</Text>
                  <RNPickerSelect
                    onValueChange={(value) => this.setState({ category: value })}
                    items={[
                      { label: 'Household', value: 'household' },
                      { label: 'Food', value: 'food' },
                      { label: 'Transportation', value: 'transportation' },
                      { label: 'Social Life', value: 'socialLife' },
                      { label: 'Beauty', value: 'beauty' },
                      { label: 'Allowance', value: 'allowance' },
                      { label: 'Salary', value: 'salary' },
                      { label: 'Petty Cash', value: 'pettyCash' },
                      { label: 'Bonus', value: 'bonus' },
                      { label: 'Other', value: 'other' },
                    ]}
                  />
                </View>
                <View>
                  <Text style={styles.notes}>Item</Text>
                  <TextInput
                    style={{
                      height: 20,
                      fontSize: 19,
                      marginTop: 3,
                    }}
                    onChangeText={text =>
                      this.setState({ item: text })
                    }
                    value={this.state.item}
                    placeholder="Item"
                  />
                </View>
                <View>
                  <Text style={styles.notes}>Amount</Text>
                  <TextInput
                    style={{
                      height: 25,
                      fontSize: 19,
                      marginTop: 3,
                    }}
                    onChangeText={amount => this.setState({ amount: amount.replace(/[^0-9.]/g, '') })}
                    value={this.state.amount}
                    placeholder="Amount"
                    keyboardType="decimal-pad"
                  />
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.notes}>Location</Text>
                  <TouchableOpacity
                    style={{
                      alignSelf: 'flex-end',
                      alignItems: 'center',
                    }}
                    onPress={() =>
                      navigation.navigate('location', {
                        returnPage: "Expense"
                      })
                    }>
                    {this.props.photo ?
                      <Image source={{ uri: this.props.photo.uri }} style={{ width: 200, height: 150 }} />
                      : null
                    }
                    <FontAwesome
                      name="map-marker"
                      style={{ color: "black", fontSize: 40 }}
                    />
                  </TouchableOpacity>
                  {/* <Text>{JSON.stringify(this.state.location)}</Text>
                   */}
                </View>
                <View>
                  <Text style={styles.notes}>Notes</Text>
                  <TextInput
                    style={{
                      height: Math.max(35, this.state.inputHeight),
                      fontSize: 19,
                      marginTop: 3,
                    }}
                    onContentSizeChange={(event) => this._handleSizeChange(event)}
                    onChangeText={text =>
                      this.setState({ notesText: text })
                    }
                    multiline={true}
                    value={this.state.notesText}
                    placeholder="Description"
                  />
                </View>
              </View>
              <TouchableOpacity
                disabled={this.state.amount === '' || this.state.item === ''}// || this.state.category === ''}
                style={[
                  styles.createTaskButton,
                  {
                    backgroundColor:
                      this.state.amount === '' || this.state.item === '' //|| this.state.category === ''
                        ? 'rgba(46, 102, 231,0.5)'
                        : '#2E66E7',
                  },
                ]}
                onPress={async () => {
                  this._handleCreateEventData(value);
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    textAlign: 'center',
                    color: '#fff',
                  }}
                >
                  ADD YOUR EXPENSE
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </>
        )}
      </Context.Consumer>
    )
  }
}
export default connect(state => ({
  loading: state.loading,
  effects: state.loading.effects,
  photo: state.global.expensePhoto
}))(ExpensePage);