const delay = time => new Promise(resolve => setTimeout(resolve, time));
import { Router, Route, Switch, routerRedux } from 'dva/router';
export default {
  namespace: 'global',
  state: {
    userModel: "testing user model data",
    expensePhoto: null,
    incomePhoto: null,
    otherPhoto: null,
    expenseLocation: '',
    otherLocation: ''
  },
  reducers: {
    updatePhoto(state, { payload }) {
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
    },
    removePhoto(state, { payload }) {
      if (payload.page == "Income") {
        state.incomePhoto = null;
      } else if (payload.page == "Expense") {
        state.expensePhoto = null;
      } else if (payload.page == "Other") {
        state.otherPhoto = null;
      }
      return {
        ...state,
        ...payload,
      };
    },
    updateLocation(state, { payload }) {
      if (payload.returnPage == "Expense") {
        state.expenseLocation = payload.location;
      } else if (payload.returnPage == "Other") {
        state.otherLocation = payload.location;
      }
      return {
        ...state,
        ...payload,
      };

    },
    removeLocation(state, { payload }) {
      if (payload.page == "Expense") {
        state.expenseLocation = null;
      } else if (payload.page == "Other") {
        state.otherLocation = null;
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