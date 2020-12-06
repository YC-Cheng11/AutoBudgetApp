const delay = time => new Promise(resolve => setTimeout(resolve, time));
import { Router, Route, Switch, routerRedux } from 'dva/router';
export default {
  namespace: 'global',
  state: {
    userModel: "testing user model data",
    expensePhoto: null,
    incomePhoto: null,
    otherPhoto: null
  },
  reducers: {
    updatePhoto(state, { payload }) {
      console.log("update photo", payload)
      if (payload.returnPage == "Income") {
        state.incomePhoto = payload.photo;
      } else if (payload.returnPage == "Expense") {
        state.expensePhoto = payload.photo;
      } else if (payload.returnPage == "Other") {
        state.otherPhoto = payload.photo;
      }
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