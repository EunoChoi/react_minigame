import Tr from './Tr';
import { useContext } from 'react';
import { TableContext } from './App';
import { ACTION_BACK, ACTION_START_GAME, ACTION_START_COUNT } from './Reducer';
import { timer } from './Form';

const Table = () => {
    const { row, col, mine, timer, tableData, dispatch } = useContext(TableContext);

    const onClickBack = () => {
        dispatch({ type: ACTION_BACK });
    }
    const onClickRefresh = () => {
        dispatch({ type: ACTION_START_GAME, row: row, col: col, mine: mine });
        clearInterval(timer);
        timer = setInterval(() => { dispatch({ type: ACTION_START_COUNT }); }, 1000);
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
            <div>
                <button className='inGameBtn' onClick={onClickBack}>
                    <i className="fa-solid fa-arrow-left"></i>
                </button>
                <button className='inGameBtn' onClick={onClickRefresh}>
                    <i className="fa-solid fa-rotate-left"></i>
                </button>
            </div>
        </div >
    );
}

export default Table;