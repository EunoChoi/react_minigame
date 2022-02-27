import { useReducer, useMemo, createContext, useState } from 'react';

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

  //reducer
  const [state, dispatch] = useReducer(reducer, initialState);
  const [time, setTime] = useState(0);

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
        {!state.start ? <Main time={time} setTime={setTime} /> : null}
        {state.start ? <Game time={time} setTime={setTime} /> : null}
      </TableContext.Provider>
    </div >
  );
}

export default App;
