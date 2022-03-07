import Table from './Table';
import Time from './Time';
import { memo } from 'react/cjs/react.development';
import { useContext } from 'react';
import { TableContext } from './App';
import { ACTION_BACK, ACTION_START_GAME, ACTION_STOP_TIMER } from './Reducer';

const Game = () => {

    const { os, tableData, finish, stop, row, col, mine, dispatch } = useContext(TableContext);

    console.log('game page refresh');

    //stop이 바뀔때마다 useEffect 부분이 재실행된다.
    //따라서 stop이 true로 변하면 안의 코드들이 재실행되면서 이전 setInterval이 return되어 
    //clearInterval(timerInterval);이 실행되고 true면 다시 setInterval이 시작된다
    //reducer의 stop state가 토글됨에 따라 timerInterval이 사라지고 다시 생성된다.

    const onClickBack = () => {
        //reducer의 start state가 토글됨
        dispatch({ type: ACTION_STOP_TIMER });
        dispatch({ type: ACTION_BACK });
    }
    const onClickRefresh = () => {
        dispatch({ type: ACTION_START_GAME, row: row, col: col, mine: mine });
    }
    const onClickPauseTogle = () => {
        //reducer의 stop state가 토글됨
        dispatch({ type: ACTION_STOP_TIMER });
    }


    return (
        <>
            <div className='gamePage'>
                <span className='title'>Minesweeper</span>


                <Time />
                <Table
                    stop={stop}
                    dispatch={dispatch}
                    os={os}
                    tableData={tableData} />

                <div>
                    <button className='inGameBtn' onClick={onClickBack}>
                        <i className="fa-solid fa-arrow-left"></i>
                    </button>
                    <button className='inGameBtn' onClick={onClickRefresh}>
                        <i className="fa-solid fa-rotate-left"></i>
                    </button>
                    {finish ? null :
                        <button className='inGameBtn' onClick={onClickPauseTogle}>
                            {stop === true ? <i className="fa-solid fa-play"></i> : <i className="fa-solid fa-pause"></i>}
                        </button>
                    }
                </div>
            </div >
        </>
    );
}

export default memo(Game);