import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import dva, { connect } from 'dva';
class SummaryPage extends React.PureComponent {
  state = {

  }

  // Local path to file on the device
  render() {
    const { dispatch, effects } = this.props;
    return (
      <SafeAreaView style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Text>Summary</Text>
      </SafeAreaView>
    )
  }
}
export default connect(state => ({
  loading: state.loading,
  effects: state.loading.effects
}))(SummaryPage);