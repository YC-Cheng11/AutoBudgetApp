import React from 'react';
import dva, { connect } from 'dva';
import { View, Text, TouchableOpacity, ActivityIndicator, Button } from 'react-native';
class WelcomePage extends React.PureComponent {
  state = {

  }

  // Local path to file on the device
  render() {
    const { dispatch, effects } = this.props;
    console.log(effects['global/enterHomePage']);
    return (
      <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {
          effects['global/enterHomePage']
            ? <ActivityIndicator />
            : <TouchableOpacity onPress={() => dispatch({ type: 'global/enterHomePage' })}>
              <Text style={{ fontSize: 24 }}>Welcome</Text>
            </TouchableOpacity>
        }
      </View>
    )
  }
}
export default connect(state => ({
  user: state.user,
  loading: state.loading,
  effects: state.loading.effects
}))(WelcomePage);