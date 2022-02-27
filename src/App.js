import { useReducer, useMemo, createContext, useState } from 'react';

import './App.css';

import Game from './Game';
import Main from './Main';

//reducer import
import { reducer } from './Reducer';
import { initialState } from './Reducer';

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

  const [realtime, setRealTime] = useState(0);

  //reducer
  const [state, dispatch] = useReducer(reducer, initialState);

  //cashing to prevent Rerendering
  const value = useMemo(
    () => ({
      row: state.row,
      col: state.col,
      mine: state.mine,
      timer: state.timer,
      stop: state.stop,
      tableData: state.tableData,
      dispatch
    }),
    [state.row, state.col, state.mine, state.timer, state.stop, state.tableData]);

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
