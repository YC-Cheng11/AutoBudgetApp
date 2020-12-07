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
import * as Location from 'expo-location';
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
    color: '#DC5112',
    fontSize: 20,
    fontWeight: '600',
    alignSelf: 'center',
    paddingBottom: 12
  },
  notes: {
    paddingTop: 10,
    color: '#DC5112',
    fontSize: 18,
    fontWeight: '600',
  },
  locationValue: {
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

const pickerStyle = {
  inputIOS: {
    color: 'black',
    fontSize: 18,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
  },
  inputAndroid: {
    color: 'black',
    fontSize: 18,
  },
  placeholderColor: 'white',
  underline: { borderTopWidth: 0 },
  icon: {
    position: 'absolute',
    backgroundColor: 'transparent',
    borderTopWidth: 5,
    borderTopColor: '#00000099',
    borderRightWidth: 5,
    borderRightColor: 'transparent',
    borderLeftWidth: 5,
    borderLeftColor: 'transparent',
    width: 0,
    height: 0,
    top: 20,
    right: 15,
  },
};
class InputForm extends React.Component {
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
    locationAddress: '',
    keyboardHeight: 0,
    visibleHeight: Dimensions.get('window').height,
    alarmTime: moment().format(),
    isDateTimePickerVisible: false,
    timeType: '',
    creatTodo: {},
    createEventAsyncRes: '',
    hkEast: '',
    hkNorth: '',
    locationList: []
  }
  async componentDidMount() {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
    }
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
    const { state: { amount, notesText, item, category } } = this;
    const { currentDate, createEventData, page } = this.props;
    let photo = this.props.page == "Expense" ? this.props.expensePhoto : (this.props.page == "Income" ? this.props.incomePhoto : this.props.otherPhoto);
    let location = this.props.page == "Expense" ? this.props.expenseLocation : this.props.otherLocation;
    if (page == "Other") {
      const createItem = {
        key: uuid(),
        amount: amount,
        notes: notesText,
        item: item,
        category: category,
        locationAddress: location
      };
      await value.updateItem(createItem);
    } else {
      const createTodo = {
        key: uuid(),
        date: currentDate,
        todoList: [
          {
            key: uuid(),
            amount: photo ? "20" : amount,
            notes: notesText,
            item: photo ? "Cheese wafer roll" : item,
            category: photo ? "food" : category,
            locationAddress: location,
            type: page,
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
    }

    this.props.dispatch({
      type: 'global/removeLocation',
      payload: { page }
    })
    this.props.dispatch({
      type: 'global/removePhoto',
      payload: { page }
    })

    this.setState({
      amount: '',
      notesText: '',
      category: '',
      item: '',
      locationAddress: ''
    });
    // await updateCurrentTask(currentDate);
    // navigation.navigate('Calendar');
    createEventData();
  };


  _handleSizeChange = event => {
    this.setState({
      inputHeight: event.nativeEvent.contentSize.height
    });
  };

  //https://reactnativemaster.com/react-native-camera-expo-example
  // Local path to file on the device
  render() {
    const { navigation, page, dispatch } = this.props;
    let photo = this.props.page == "Expense" ? this.props.expensePhoto : (this.props.page == "Income" ? this.props.incomePhoto : this.props.otherPhoto);
    let location = this.props.page == "Expense" ? this.props.expenseLocation : this.props.otherLocation;
    console.log("locationrender", location);
    console.log(this.state.item);
    console.log("this.state.category");
    console.log(this.state.category);
    return (
      <Context.Consumer>
        {value => (
          <>
            <ScrollView>
              <View style={styles.taskContainer}>
                {page == "Other" ? null : <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.date}>Date: {this.props.currentDate}</Text>
                </View>}
                {page != "Income" ?
                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                      style={{
                        alignSelf: 'flex-end',
                        alignItems: 'center',
                      }}
                      onPress={() =>
                        navigation.navigate('camera', {
                          returnPage: page
                        })
                      }>
                      {photo ?
                        <Image source={{ uri: photo.uri }} style={{ width: 200, height: 150 }} />
                        : <></>
                      }
                      <Text style={styles.notes}>
                        Photo
                    </Text>
                      <FontAwesome
                        name="camera"
                        style={{ color: "black", fontSize: 20 }}
                      />
                    </TouchableOpacity>
                    {photo ?
                      <TouchableOpacity
                        style={{
                          alignSelf: 'flex-end',
                          alignItems: 'center',
                        }}
                        onPress={() =>
                          this.props.dispatch({
                            type: 'global/removePhoto',
                            payload: { page }
                          })
                        }>
                        <FontAwesome
                          name="remove"
                          style={{ color: "black", fontSize: 20 }}
                        />
                      </TouchableOpacity> : <></>}
                  </View> : <></>}
                <View>
                  <Text style={styles.notes}>Category</Text>
                  <RNPickerSelect
                    style={pickerStyle}
                    value={photo && page == "Expense" ? "food" : this.state.category}
                    onValueChange={(value) => this.setState({ category: value })}
                    items={page != "Income" ? [
                      { label: 'Household', value: 'household' },
                      { label: 'Food', value: 'food' },
                      { label: 'Transportation', value: 'transportation' },
                      { label: 'Social Life', value: 'socialLife' },
                      { label: 'Beauty', value: 'beauty' }
                    ] :
                      [
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
                    value={photo && page == "Expense" ? "Cheese wafer roll" : this.state.item}
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
                    value={photo && page == "Expense" ? "20" : this.state.amount}
                    placeholder="Amount"
                    keyboardType="decimal-pad"
                  />
                </View>
                {page != "Income" ? <View>
                  <Text style={styles.notes}>Location</Text>

                  <TouchableOpacity
                    style={{
                      alignSelf: 'flex-start',
                      alignItems: 'center',
                    }}
                    onPress={() =>
                      navigation.navigate('location', {
                        returnPage: page
                      })
                    }>
                    <FontAwesome
                      name="map-marker"
                      style={{ color: "black", fontSize: 25 }}
                    />
                  </TouchableOpacity>
                  {/* <TextInput
                    style={{
                      height: Math.max(35, this.state.inputHeight),
                      fontSize: 19,
                      marginTop: 3,
                    }}
                    onContentSizeChange={(event) => this._handleSizeChange(event)}
                    onChangeText={text =>
                      this.setState({ locationAddress: text })
                    }
                    multiline={true}
                    value={this.state.locationAddress}
                    placeholder="Location"
                  /> */}
                  <Text style={styles.locationValue}>{location ? location.name : ''}</Text>
                  {/* <Text>{JSON.stringify(this.state.location)}</Text>
                   */}
                </View> : <></>}
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
                disabled={photo ? false : this.state.amount === '' || this.state.item === ''}// || this.state.category === ''}
                style={[
                  styles.createTaskButton,
                  {
                    backgroundColor:
                      photo ? '#2E66E7' : this.state.amount === '' || this.state.item === '' //|| this.state.category === ''
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
  expensePhoto: state.global.expensePhoto,
  incomePhoto: state.global.incomePhoto,
  otherPhoto: state.global.otherPhoto,
  expenseLocation: state.global.expenseLocation,
  otherLocation: state.global.otherLocation,
}))(InputForm);