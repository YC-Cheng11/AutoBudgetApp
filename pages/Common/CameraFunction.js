import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useLinkProps } from '@react-navigation/native';

export default function App(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  snap = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
      props.setPicture(photo);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type} ref={ref => {
        this.camera = ref;
      }}>
        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", margin: 20 }}>

          <TouchableOpacity style={{
            alignSelf: 'flex-end',
            alignItems: 'center',
            backgroundColor: 'transparent',
          }} onPress={this.snap} >
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
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <MaterialCommunityIcons
              name="camera-party-mode"
              style={{ color: "#fff", fontSize: 40 }}
            />
          </TouchableOpacity>
          {/* {hasPermission === null ? <View /> : (
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
                  </TouchableOpacity> */}
        </View>
      </Camera>
    </View>
  );
}