import Tr from './Tr';
import { useContext } from 'react';
import { TableContext } from './App';
import { ACTION_BACK } from './Reducer';

const Table = () => {
    const { timer, tableData, dispatch } = useContext(TableContext);

    const onClickBack = () => {
        dispatch({ type: ACTION_BACK });
    }
    return (
        <div className='gamePage'>
            <span className='title'>Minesweeper</span>
            <span className='timer'>{timer}s</span>
            <table>
                <tbody>
                    {Array(tableData.length).fill().map((tr, i) => <Tr key={i} rowIndex={i} />)}
                </tbody>
            </table>
            <button className='back' onClick={onClickBack}>🔙</button>
        </div>
    );
}

export default Table;