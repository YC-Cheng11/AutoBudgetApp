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
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
// import { FontAwesome } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
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
    hasPermission: null,
    cameraType: Camera.Constants.Type.back,
  }

  async componentDidMount() {
    this.getPermissionAsync()
  }
  getPermissionAsync = async () => {
    // Camera roll Permission 
    if (Platform.OS === 'ios') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
    // Camera Permission
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasPermission: status === 'granted' });
  }

  componentWillUnmount() {
    Keyboard.removeListener('keyboardDidShow', this._keyboardDidShow);
    Keyboard.removeListener('keyboardDidHide', this._keyboardDidHide);
  }

  useEffect = () => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
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

  handleCameraType = () => {
    const { cameraType } = this.state

    this.setState({
      cameraType:
        cameraType === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back
    })
  }

  takePicture = async () => {
    if (this.camera) {
      let photo = await this.camera.current.takePictureAsync();
    }
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
  }

  _handleSizeChange = event => {
    console.log('_handleSizeChange ---->', event.nativeEvent.contentSize.height);

    this.setState({
      inputHeight: event.nativeEvent.contentSize.height
    });
  };
  //https://reactnativemaster.com/react-native-camera-expo-example
  // Local path to file on the device
  render() {
    const { hasPermission } = this.state;
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
                  {hasPermission === null ? <View /> : (
                    hasPermission === false ? <Text>No access to camera</Text> :
                      <View style={{ flex: 1 }}>
                        <Camera style={{ flex: 1 }} type={this.state.cameraType}
                          ref={ref => {
                            this.camera = ref;
                          }}>
                          <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", margin: 20 }}>
                            <TouchableOpacity
                              style={{
                                alignSelf: 'flex-end',
                                alignItems: 'center',
                                backgroundColor: 'transparent',
                              }}>
                              <Ionicons
                                name="ios-photos"
                                style={{ color: "#fff", fontSize: 40 }}
                              />
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={{
                                alignSelf: 'flex-end',
                                alignItems: 'center',
                                backgroundColor: 'transparent',
                              }}
                              onPress={() => this.takePicture()}>
                              <FontAwesome
                                name="camera"
                                style={{ color: "#fff", fontSize: 40 }}
                              />
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={{
                                alignSelf: 'flex-end',
                                alignItems: 'center',
                                backgroundColor: 'transparent',
                              }}
                              onPress={() => this.handleCameraType()}>
                              <MaterialCommunityIcons
                                name="camera-party-mode"
                                style={{ color: "#fff", fontSize: 40 }}
                              />
                            </TouchableOpacity>
                          </View>
                        </Camera>
                      </View>
                  )}
                  <TouchableOpacity
                    style={{
                      alignSelf: 'flex-end',
                      alignItems: 'center',
                      backgroundColor: 'transparent',
                    }}
                    onPress={() => this.handleCameraType()}
                  >
                    <MaterialCommunityIcons
                      name="camera-party-mode"
                      style={{ color: "#fff", fontSize: 40 }}
                    />
                  </TouchableOpacity>
                  <View>
                    <Text style={styles.notes}>Category</Text>
                    <Picker
                      selectedValue={this.state.category}
                      // style={{ height: 50, width: 100 }}
                      onValueChange={(itemValue, itemIndex) => this.setState({ category: itemValue })}>
                      <Picker.Item label="Please select" value="" />
                      <Picker.Item label="Food" value="food" />
                      <Picker.Item label="Household" value="household" />
                      <Picker.Item label="Transportation" value="transportation" />
                      <Picker.Item label="Social Life" value="socialLife" />
                      <Picker.Item label="Beauty" value="beauty" />
                      {/* income category */}
                      {/* <Picker.Item label="Allowance" value="allowance" />
                      <Picker.Item label="Salary" value="salary" />
                      <Picker.Item label="Petty Cash" value="pettyCash" />
                      <Picker.Item label="Bonus" value="bonus" />
                      <Picker.Item label="Other" value="other" /> */}
                    </Picker>
                  </View><br />
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
                  </View><br />
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
                  </View><br />
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
                  disabled={this.state.amount === '' || this.state.item === '' || this.state.category === ''}
                  style={[
                    styles.createTaskButton,
                    {
                      backgroundColor:
                        this.state.amount === '' || this.state.item === '' || this.state.category === ''
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
        )}
      </Context.Consumer>
    )
  }
}
export default connect(state => ({
  loading: state.loading,
  effects: state.loading.effects
}))(ProvideDataPage);