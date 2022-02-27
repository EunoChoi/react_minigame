import Tr from './Tr';
import { useContext } from 'react';
import { TableContext } from './App';
import { ACTION_BACK, ACTION_START_GAME, ACTION_STOP_TIMER, ACTION_STOP_TIMER2 } from './Reducer';

const Game = ({ time, setTime }) => {
    const { finish, stop, row, col, mine, tableData, dispatch } = useContext(TableContext);

    const onClickBack = () => {
        dispatch({ type: ACTION_STOP_TIMER, setTime: setTime });
        dispatch({ type: ACTION_BACK });
    }
    const onClickRefresh = () => {
        dispatch({ type: ACTION_STOP_TIMER, setTime: setTime });
        dispatch({ type: ACTION_START_GAME, setTime: setTime, row: row, col: col, mine: mine });
    }
    const onClickPauseTogle = () => {
        dispatch({ type: ACTION_STOP_TIMER2, time: time, setTime: setTime, row: row, col: col, mine: mine });
    }
    return (
        <div className='gamePage'>
            <span className='title'>Minesweeper</span>
            <span className='subTitle'>{time}s</span>

            <table>
                <tbody>
                    {Array(tableData.length).fill().map((tr, i) => <Tr time={time} key={i} rowIndex={i} />)}
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
                    {finish ? null :
                        (stop === true ? <i className="fa-solid fa-play"></i> : <i className="fa-solid fa-pause"></i>)}
                </button>
            </div>
        </div >
    );
}

export default Game;