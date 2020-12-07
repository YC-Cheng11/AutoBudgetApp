import React from 'react';
import {
  Platform,
  Image
} from 'react-native';
import dva, { connect } from 'dva';
import LocationFunction from './LocationFunction';
class CameraComponent extends React.PureComponent {

  setLocation = (location) => {
    const { route } = this.props;
    const { returnPage } = route.params;
    console.log(location);
    // this.props.dispatch({
    //   type: 'global/updatePhoto',
    //   payload: { photo, returnPage }
    // })
    // this.props.navigation.navigate(returnPage);
  };

  render() {
    return (
      <>
        <LocationFunction setLocation={this.setLocation} />
      </>
    )
  }
}
export default connect(state => ({
  loading: state.loading,
  effects: state.loading.effects
}))(CameraComponent);