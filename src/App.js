import { useReducer, useMemo, createContext } from 'react';

import './App.css';

import Table from './Table';
import Form from './Form';

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


  //reducer
  const [state, dispatch] = useReducer(reducer, initialState);

  //cashing to prevent Rerendering
  const value = useMemo(() => ({ stop: state.stop, tableData: state.tableData, dispatch }), [state.stop, state.tableData]);
  return (
    <div className="App">
      {/* value === { tableDate: state.tableData, dispatch } */}
      <TableContext.Provider value={value}>
        <Form />
        <div>timer : {state.timer}</div>
        <Table />
        <div>result : {state.result}</div>
      </TableContext.Provider>
    </div >
  );
}

export default App;
