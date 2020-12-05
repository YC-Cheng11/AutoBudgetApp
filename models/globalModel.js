const delay = time => new Promise(resolve => setTimeout(resolve, time));
import { Router, Route, Switch, routerRedux } from 'dva/router';
export default {
  namespace: 'global',
  state: {
    userModel: "testing user model data",
    photo: null
  },
  reducers: {
    update(state, { payload }) {
      console.log("update photo",payload)
      return {
        ...state,
        ...payload,
      };
    }
  },
  effects: {
    * enterHomePage(action, { put, call }) {
      yield call(delay, 1000);
      yield put(routerRedux.push({ pathname: '/home' }));
    }
  },
  subscriptions: {
    // You can use history object in subscriptions.
    // setup({ history, dispatch }) {
    //   history.listen(({ pathname }) => {
    // if (pathname === '/home') { alert('logged in'); }
    // });
    // }
  }
}