import { useReducer, useMemo, createContext, useState, useCallback, useEffect } from 'react';

import './App.css';

import Game from './Game';
import Main from './Main';

//reducer import
import { reducer, initialState } from './Reducer';


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
  console.log('app rerendering');
  //reducer
  const [state, dispatch] = useReducer(reducer, initialState);
  const [time, setTime] = useState(0);
  //time state가 app component에 있어서 app component가 시간 경과 마다 리렌더링 되는중
  const [os, setOs] = useState('');
  useEffect(() => {
    //userAgent 값 얻기
    var varUA = navigator.userAgent.toLowerCase();

    if (varUA.indexOf('android') > -1) {
      //안드로이드
      setOs('android');
    } else if (varUA.indexOf("iphone") > -1 || varUA.indexOf("ipad") > -1 || varUA.indexOf("ipod") > -1) {
      //IOS
      setOs('ios');
    } else {
      //아이폰, 안드로이드 외
      setOs('others');
    }
    //console.log(os);
  }, []);
  console.log(os);

  //cashing to prevent Rerendering
  const value = useMemo(
    () => ({
      row: state.row,
      col: state.col,
      mine: state.mine,
      timer: state.timer,
      stop: state.stop,
      tableData: state.tableData,
      finish: state.finish,
      dispatch
    }),
    [state.row, state.col, state.mine, state.timer, state.stop, state.tableData, state.finish]);

  return (
    <div className="App">

      {/* value === { tableDate: state.tableData, dispatch } */}
      <TableContext.Provider value={value}>
        {!state.start ? <Main setTime={setTime} /> : null}
        {state.start ? <Game os={os} time={time} setTime={setTime} /> : null}
      </TableContext.Provider>
    </div >
  );
}

export default App;
