import React, { useState, useEffect, Component } from 'react';
import dva, { connect } from 'dva';
import {
  Text,
  Image,
  View,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TextInput,
  Keyboard,
  Switch,
  StyleSheet,
  Alert,
  Platform,
  Picker
} from 'react-native';
import Constants from 'expo-constants';
import { Context } from '../../utils/Context';
import { Camera } from 'expo-camera';
import RNPickerSelect from 'react-native-picker-select';
import { FontAwesome } from '@expo/vector-icons';
import moment from 'moment';
import uuid from 'uuid';

const styles = StyleSheet.create({
  createTaskButton: {
    width: 252,
    height: 48,
    alignSelf: 'center',
    marginTop: 40,
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
    marginTop: 30,
    height: 400,
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
    padding: 22,
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
class ProvideDataPage extends React.PureComponent {
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
    const createItem = {
      key: uuid(),
      amount: amount,
      notes: notesText,
      item: item,
      category: category
    };
    await value.updateItem(createItem);
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
            <View style={styles.container}>
              <ScrollView
                contentContainerStyle={{
                  paddingBottom: 100,
                }}
              >
                <View style={styles.taskContainer}>
                  <Text>Thanks for provide data.</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                      style={{
                        alignSelf: 'flex-end',
                        alignItems: 'center',
                      }}
                      onPress={() =>
                        navigation.navigate('camera', {
                          returnPage: "Other"
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
                        style={{ color: "#fff", fontSize: 40 }}
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
                  {/* <View style={styles.notesContent} /> */}
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
                  disabled={this.state.amount === '' || this.state.item === ''}
                  style={[
                    styles.createTaskButton,
                    {
                      backgroundColor:
                        this.state.amount === '' || this.state.item === ''
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
                      fontSize: 18,
                      textAlign: 'center',
                      color: '#fff',
                    }}
                  >
                    ADD DATA
                </Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </>
        )
        }
      </Context.Consumer>
    )
  }
}
export default connect(state => ({
  loading: state.loading,
  effects: state.loading.effects,
  photo: state.global.otherPhoto
}))(ProvideDataPage);