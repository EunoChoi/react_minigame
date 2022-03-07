import { useReducer, useMemo, createContext, useEffect } from 'react';

import './App.css';

import Game from './Game';
import Main from './Main';

//reducer import
import { reducer, initialState, SET_OS } from './Reducer';


//context create
export const TableContext = createContext({
  tableData: [],
  dispatch: () => { },
});

export const CODE = {
  NORMAL: -1,
  Q_NORMAL: -2,
  F_NORMAL: -3,
  Q_MINE: -4,
  F_MINE: -5,
  CLICKED_MINE: -6,
  MINE: -7,
  OPENED: 0,
  //0~8 OPENED,  mean around mine number
}
function App() {
  // console.log('app rerendering');
  //reducer
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    //userAgent 값 얻기
    var varUA = navigator.userAgent.toLowerCase();
    console.log('app page refresh');
    if (varUA.indexOf('android') > -1) {
      //안드로이드
      dispatch({ type: SET_OS, os: 'android' })
    } else if (varUA.indexOf("iphone") > -1 || varUA.indexOf("ipad") > -1 || varUA.indexOf("ipod") > -1) {
      //IOS
      dispatch({ type: SET_OS, os: 'ios' })
    } else {
      //아이폰, 안드로이드 외
      dispatch({ type: SET_OS, os: 'others' })
    }
  }, []);

  const value = useMemo(
    () => ({
      row: state.row,
      col: state.col,
      mine: state.mine,
      timer: state.timer,
      stop: state.stop,
      tableData: state.tableData,
      finish: state.finish,
      dispatch,
      os: state.os,
    }),
    [state.row, state.col, state.mine, state.timer, state.stop, state.tableData, state.finish, state.os]);

  return (
    <div className="App">

      {/* value === { tableDate: state.tableData, dispatch } */}
      <TableContext.Provider value={value}>
        {!state.start ? <Main /> : null}
        {state.start ? <Game /> : null}
      </TableContext.Provider>
    </div >
  );
}

export default App;
