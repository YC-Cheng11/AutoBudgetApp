import React, { useState, Fragment } from 'react';
import dva, { connect } from 'dva';
import { StyleSheet, View, Image, SafeAreaView, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
class DailyExpense extends React.PureComponent {
  state = {

  }
  renderItem = (item) => {
    return (
      <TouchableOpacity
        key={item.key}
        style={styles.taskListContent}
      >
        <View
          style={{
            marginLeft: 13,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                height: 12,
                width: 12,
                borderRadius: 6,
                backgroundColor: item.color,
                marginRight: 8,
              }}
            />
            <Text
              style={{
                color: '#554A4C',
                fontSize: 20,
                // fontWeight: '700',
              }}
            >
              {item.category}:{item.item}
            </Text>
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                marginLeft: 20,
              }}
            >
              <Text
                style={{
                  color: '#BBBBBB',
                  fontSize: 14,
                }}
              >
                {item.notes}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  // Local path to file on the device
  render() {
    const { todoList, currentDate } = this.props;
    return (
      <View
        style={{
          width: '100%',
          height: Dimensions.get('window').height - 170,
        }}
      >
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 20,
          }}
        >
          {todoList.map(item => (
            this.renderItem(item)
          ))}
        </ScrollView>
      </View>
    )
  }
}
export default connect(state => ({
  loading: state.loading,
  effects: state.loading.effects
}))(DailyExpense);

const styles = StyleSheet.create({
  calendar: {
    marginBottom: 10,
  },
  text: {
    textAlign: 'center',
    padding: 10,
    backgroundColor: 'lightgrey',
    fontSize: 16,
  },
  viewTask: {
    position: 'absolute',
    top: 0,
    right: 17,
    height: 50,
    width: 50,
    backgroundColor: 'orange',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2E66E7',
    // shadowOffset: {
    //   width: 0,
    //   height: 5,
    // },
    // shadowRadius: 30,
    shadowOpacity: 0.5,
    elevation: 5,
    zIndex: 999,
  },
});