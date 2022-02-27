import Tr from './Tr';
import { useContext } from 'react';
import { TableContext } from './App';
import { ACTION_BACK, ACTION_START_GAME, ACTION_STOP_TIMER, ACTION_TIME_COUNT } from './Reducer';
import { timeInterval } from './Main';

const Game = () => {
    const { stop, row, col, mine, timer, tableData, dispatch } = useContext(TableContext);

    const onClickBack = () => {
        dispatch({ type: ACTION_BACK });
    }
    const onClickRefresh = () => {
        clearInterval(timeInterval);

        dispatch({ type: ACTION_START_GAME, row: row, col: col, mine: mine });
        timeInterval = setInterval(() => { dispatch({ type: ACTION_TIME_COUNT }); }, 1000);
    }
    const onClickPauseTogle = () => {
        dispatch({ type: ACTION_STOP_TIMER, row: row, col: col, mine: mine });
    }
    return (
        <div className='gamePage'>
            <span className='title'>Minesweeper</span>
            <span className='subTitle'>{timer}s</span>

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
                <button className='inGameBtn' onClick={onClickPauseTogle}>
                    {stop === true ? <i className="fa-solid fa-play"></i> : <i className="fa-solid fa-pause"></i>}
                </button>
            </div>
        </div >
    );
}

export default Game;