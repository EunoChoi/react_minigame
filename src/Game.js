import Tr from './Tr';
import { useContext, useEffect } from 'react';
import { TableContext } from './App';
import { ACTION_BACK, ACTION_START_GAME, ACTION_STOP_TIMER, ACTION_TIMER_UP } from './Reducer';

const Game = () => {

    const { timer, finish, stop, row, col, mine, tableData, dispatch } = useContext(TableContext);

    console.log('game page refresh');

    //stop이 바뀔때마다 useEffect 부분이 재실행된다.
    //따라서 stop이 true로 변하면 안의 코드들이 재실행되면서 이전 setInterval이 return되어 
    //clearInterval(timerInterval);이 실행되고 true면 다시 setInterval이 시작된다
    //reducer의 stop state가 토글됨에 따라 timerInterval이 사라지고 다시 생성된다.
    useEffect(() => {
        let timerInterval;
        if (!stop) {
            timerInterval = setInterval(() => {
                dispatch({ type: ACTION_TIMER_UP });
            }, 1000);
        }

        //컴포넌트가 사라질때 실행
        return () => {
            clearInterval(timerInterval);
        };
    }, [dispatch, stop]);


    const onClickBack = () => {
        //reducer의 start state가 토글됨
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
        <div className='gamePage'>
            <span className='title'>Minesweeper</span>

            <span className='subTitle'>
                {/* padStart사용하여 빈곳에 0 넣는 방법 */}
                {Math.floor(timer / 3600) >= 1 ? (Math.floor(timer / 3600) + ':').padStart(3, '0') : null}
                {(Math.floor(timer / 60) + ':').padStart(3, '0')}
                {(timer % 60).toString().padStart(2, '0')}

                {/* 앞에 0을추가하고 slice를 통해서 뒤 두자리 수만 잘라오는 방법 */}
                {/* {('00' + Math.floor(time / 60)).slice(-2) + ':'} */}
            </span>

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
                {finish ? null :
                    <button className='inGameBtn' onClick={onClickPauseTogle}>
                        {stop === true ? <i className="fa-solid fa-play"></i> : <i className="fa-solid fa-pause"></i>}
                    </button>
                }
            </div>
        </div >
    );
}

export default Game;