import React from 'react';
import {
  Platform,
  Image
} from 'react-native';
import dva, { connect } from 'dva';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import CameraFunction from './CameraFunction';
class CameraComponent extends React.PureComponent {
  state = {
    hasPermission: null,
    cameraType: Camera.Constants.Type.back,

  }

  componentDidMount() {
    this.getPermissionAsync()
  }

  useEffect = () => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
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

  handleCameraType = () => {
    const { cameraType } = this.state

    this.setState({
      cameraType:
        cameraType === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back
    })
  }

  // takePicture = async () => {
  //   if (this.camera) {
  //     let photo = await this.camera.current.takePictureAsync();
  //   }
  // }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
  }
  // Local path to file on the device

  setPicture = (photo) => {
    const { route } = this.props;
    const { returnPage } = route.params;
    this.props.dispatch({
      type: 'global/updatePhoto',
      payload: { photo, returnPage }
    })
    this.props.navigation.navigate(returnPage);
  };

  render() {
    return (
      <>
        <CameraFunction setPicture={this.setPicture} />
      </>
    )
  }
}
export default connect(state => ({
  loading: state.loading,
  effects: state.loading.effects
}))(CameraComponent);