import React, { useState, useEffect, Component } from 'react';
import dva, { connect } from 'dva';
import InputForm from '../Common/InputForm';

class ProvideDataPage extends React.PureComponent {
  _createEventData = async createTodo => {
    alert("Item saved. Thanks for provide data.");
  };


  render() {
    const { route, navigation } = this.props;
    return (
      <InputForm page="Other" createEventData={this._createEventData}  navigation={navigation}></InputForm>
    )
  }
}
export default connect(state => ({
  loading: state.loading,
  effects: state.loading.effects
}))(ProvideDataPage);