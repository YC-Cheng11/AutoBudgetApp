import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { Context } from '../../utils/Context';
export default class TodoStore extends Component {
  state = {
    todo: [],
    item: [],
    currentDate: `${moment().format('YYYY')}-${moment().format(
      'MM'
    )}-${moment().format('DD')}`,
    updateTodo: async item => {
      await this._updateTodo(item);
    },
    deleteTodo: async item => {
      await this._deleteTodo(item);
    },
    updateSelectedTask: async item => {
      await this._updateSelectedTask(item);
    },
    deleteSelectedTask: async item => {
      await this._deleteSelectedTask(item);
    },
    updateDate: async day => {
      await this._updateCurrentDate(day);
    },
    updateItem: async item => {
      await this._updateItem(item);
    }
  };

  _deleteSelectedTask = async item => {
    const previousTodo = [...this.state.todo];
    const newTodo = previousTodo.map(data => {
      if (item.date === data.date) {
        const previousTodoList = [...data.todoList];
        const newTodoList = previousTodoList.filter(list => {
          if (list.key === item.todo.key) {
            return false;
          }
          return true;
        });

        data.todoList = newTodoList;
        return data;
      }
      return data;
    });
    const checkForEmpty = newTodo.filter(data => {
      if (data.todoList.length === 0) {
        return false;
      }
      return true;
    });
    try {
      await AsyncStorage.setItem('TODO', JSON.stringify(checkForEmpty));
      this.setState({
        todo: checkForEmpty,
      });
    } catch (error) {
      // Error saving data
    }
  };

  _updateSelectedTask = async item => {
    const previousTodo = [...this.state.todo];
    const newTodo = previousTodo.map(data => {
      if (item.date === data.date) {
        const previousTodoList = [...data.todoList];
        const newTodoList = previousTodoList.map(list => {
          if (list.key === item.todo.key) {
            return item.todo;
          }
          return list;
        });
        data.todoList = newTodoList;
        return data;
      }
      return data;
    });
    try {
      await AsyncStorage.setItem('TODO', JSON.stringify(newTodo));
      this.setState({
        todo: newTodo,
      });
    } catch (error) {
      // Error saving data
    }
  };

  async componentWillMount() {
    try {
      const todo = await AsyncStorage.getItem('TODO');
      if (todo !== null) {
        this.setState({
          todo: JSON.parse(todo),
        });
      }
    } catch (error) {
      // Error saving data
    }
  }

  _updateTodo = async item => {
    const datePresent = this.state.todo.find(data => {
      if (data.date === item.date) {
        return true;
      }
    });

    if (datePresent) {
      const updatedTodo = this.state.todo.map(data => {
        if (datePresent.date === data.date) {
          data.todoList = [...data.todoList, ...item.todoList];
          return data;
        }
        return data;
      });
      try {
        await AsyncStorage.setItem('TODO', JSON.stringify(updatedTodo));

        this.setState({
          todo: updatedTodo,
        });
      } catch (error) {
        console.log(error);
        // Error saving data
      }
    } else {
      const newTodo = [...this.state.todo, item];
      console.log("newTodo");
      console.log(JSON.stringify(newTodo));
      const jsonValue = JSON.stringify(newTodo);
      try {
        await AsyncStorage.setItem('TODO', jsonValue);
        AsyncStorage.setItem('TODO', jsonValue, () => {
          console.log("newTodo 2");
          console.log(jsonValue);
        })
        this.setState({
          todo: newTodo,
        });
      } catch (error) {
        console.log(error);
        // Error saving data
      }
    }
  };

  _updateItem = async item => {
    // amount: '',
    // notesText: '',
    // category: '',
    // item: '',
    const isExist = this.state.item.find(data => {
      if (data.amount === item.amount && data.notesText === item.notesText
        && data.category === item.category && data.item === item.item) {
        return true;
      }
    });

    if (!isExist) {
      try {
        const updatedItem = this.state.item.concat(item)
        await AsyncStorage.setItem('ITEM', JSON.stringify(updatedItem));

        this.setState({
          item: updatedItem,
        });
      } catch (error) {
        console.log(error);
        // Error saving data
      }
    }
  };

  _deleteTodo = () => { };


  _updateCurrentDate = async (day) => {
    try {
      await AsyncStorage.setItem('currentDate', day, () => {
        console.log(day);
      });
      this.setState({ currentDate: day })
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
