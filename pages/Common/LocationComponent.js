import React from 'react';
import {
  Platform,
  Image
} from 'react-native';
import dva, { connect } from 'dva';
import LocationFunction from './LocationFunction';
class LocationComponent extends React.PureComponent {

  setLocation = (location) => {
    const { route } = this.props;
    const { returnPage } = route.params;
    console.log("beforesetLocation",location);
    this.props.dispatch({
      type: 'global/updateLocation',
      payload: { location, returnPage }
    })
    this.props.navigation.navigate(returnPage);
  };

  render() {
    const { route } = this.props;
    const { locationList } = route.params;

    return (
      <>
        <LocationFunction setLocation={this.setLocation} locationList={locationList} />
      </>
    )
  }
}
export default connect(state => ({
  loading: state.loading,
  effects: state.loading.effects
}))(LocationComponent);