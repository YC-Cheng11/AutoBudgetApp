import React, { useState, useEffect, Component } from 'react';
import dva, { connect } from 'dva';
import InputForm from '../Common/InputForm';

class ExpensePage extends React.PureComponent {
  _createEventData = async () => {
    const { route, navigation } = this.props;
    const { currentDate, updateCurrentTask } = route.params;
    await updateCurrentTask(currentDate);
    navigation.navigate('Calendar');
  };


  render() {
    const { route, navigation } = this.props;
    const { currentDate } = route.params;

    return (
      <InputForm page="Expense" currentDate={currentDate} createEventData={this._createEventData} navigation={navigation}></InputForm>
    )
  }
}
export default connect(state => ({
  loading: state.loading,
  effects: state.loading.effects
}))(ExpensePage);