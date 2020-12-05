import React from 'react';
import {
  Platform,
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
  // Local path to file on the device
  render() {
    const { dispatch, effects } = this.props;
    const { hasPermission } = this.state;
    return (
      // <>
      //   {hasPermission === null ? <View /> : (
      //     hasPermission === false ? <Text>No access to camera</Text> :
      //       <View style={{ flex: 1 }}>
      //         <Camera style={{ flex: 1 }} type={this.state.cameraType}
      //           ref={ref => {
      //             this.camera = ref;
      //           }}>
      //           <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", margin: 20 }}>
      //             <TouchableOpacity
      //               style={{
      //                 alignSelf: 'flex-end',
      //                 alignItems: 'center',
      //                 backgroundColor: 'transparent',
      //               }}>
      //               <Ionicons
      //                 name="ios-photos"
      //                 style={{ color: "#fff", fontSize: 40 }}
      //               />
      //             </TouchableOpacity>
      //             <TouchableOpacity
      //               style={{
      //                 alignSelf: 'flex-end',
      //                 alignItems: 'center',
      //                 backgroundColor: 'transparent',
      //               }}
      //               onPress={() => this.takePicture()}>
      //               <FontAwesome
      //                 name="camera"
      //                 style={{ color: "#fff", fontSize: 40 }}
      //               />
      //             </TouchableOpacity>
      //             <TouchableOpacity
      //               style={{
      //                 alignSelf: 'flex-end',
      //                 alignItems: 'center',
      //                 backgroundColor: 'transparent',
      //               }}
      //               onPress={() => this.handleCameraType()}>
      //               <MaterialCommunityIcons
      //                 name="camera-party-mode"
      //                 style={{ color: "#fff", fontSize: 40 }}
      //               />
      //             </TouchableOpacity>
      //           </View>
      //         </Camera>
      //       </View>
      //   )}
      //   <TouchableOpacity
      //     style={{
      //       alignSelf: 'flex-end',
      //       alignItems: 'center',
      //       backgroundColor: 'transparent',
      //     }}
      //     onPress={() => this.handleCameraType()}
      //   >
      //     <MaterialCommunityIcons
      //       name="camera-party-mode"
      //       style={{ color: "#fff", fontSize: 40 }}
      //     />
      //   </TouchableOpacity>
      // </>
      <>
        <CameraFunction />
      </>
    )
  }
}
export default connect(state => ({
  loading: state.loading,
  effects: state.loading.effects
}))(CameraComponent);