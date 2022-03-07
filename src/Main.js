import { useState, useCallback, useContext } from 'react';
import { TableContext } from './App';
import { ACTION_START_GAME } from './Reducer';

const Main = ({ setTime }) => {

    const [row, setRow] = useState(7);
    const [col, setCol] = useState(7);
    const [mine, setMine] = useState(10);
    const [custom, setCustom] = useState(false);

    const { dispatch } = useContext(TableContext);

    //onChange 이벤트 함수들은 변화가 없으므로 useCallback으로 재선언 방지
    const onChangeRow = useCallback((e) => {
        if (!isNaN(e.target.value))
            setRow(Number(e.target.value));
    }, []);
    const onChangeCol = useCallback((e) => {
        if (!isNaN(e.target.value))
            setCol(Number(e.target.value));
    }, []);
    const onChangeMine = useCallback((e) => {
        if (!isNaN(e.target.value))
            setMine(Number(e.target.value));
    }, []);

    //click startbutton
    const onClickStart = () => {
        //입력된 값들이 올바른지 확인
        //row, col 범위 조건 확인
        if (!((3 <= row && row <= 12) && (3 <= col && col <= 12))) {
            alert('The range of col number and row number is 3 to 12.');
            return;
        }
        if (mine < 2) {
            alert('The number of mine is at least 3.');
            return;
        }
        if (mine >= row * col || mine <= 1) {
            alert('There can\'t be more mines than cell number.');
            return;
        }

        dispatch({
            type: ACTION_START_GAME,
            row: row,
            col: col,
            mine: mine,
            setTime
        });
        //이전에 생성된 타이머 setInterval 삭제
        // clearInterval(timeInterval);
        // timeInterval = setInterval(() => { dispatch({ type: ACTION_TIME_COUNT }); }, 1000);
    };
    const onClickLevel1 = () => {
        dispatch({
            type: ACTION_START_GAME,
            row: 5,
            col: 5,
            mine: 5,
            setTime
        });
        // clearInterval(timeInterval);
        // timeInterval = setInterval(() => { dispatch({ type: ACTION_TIME_COUNT }); }, 1000);
    }
    const onClickLevel2 = () => {
        dispatch({
            type: ACTION_START_GAME,
            row: 7,
            col: 7,
            mine: 10,
            setTime
        });
        // clearInterval(timeInterval);
        // timeInterval = setInterval(() => { dispatch({ type: ACTION_TIME_COUNT }); }, 1000);
    }
    const onClickLevel3 = () => {
        dispatch({
            type: ACTION_START_GAME,
            row: 9,
            col: 9,
            mine: 18,
            setTime
        });
        // clearInterval(timeInterval);
        // timeInterval = setInterval(() => { dispatch({ type: ACTION_TIME_COUNT }); }, 1000);
    }
    const onClickCustom = () => {
        setCustom((c) => !c);
    }
    return (
        <>
            <div className='levelSelectPage'>
                <span className='title'>Minesweeper</span>
                <span className='subTitle'>Level Select</span>
                {!custom ? <div className='levelSelectPage_btn'>
                    <button className='btn' onClick={onClickLevel1}>level 1</button>
                    <button className='btn' onClick={onClickLevel2}>level 2</button>
                    <button className='btn' onClick={onClickLevel3}>level 3</button>
                </div> : null}
                {custom ? <div className='levelCustom'>
                    <span className='customTitle'>Custom</span>
                    <div>
                        <label htmlFor='row'>ROW :</label>
                        {/* onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()} */}
                        <input
                            id='row'
                            type='text'
                            inputMode='numeric'
                            pattern='[0-9]*'
                            value={row}
                            onChange={onChangeRow} />
                    </div>
                    <div>
                        <label htmlFor='col'>COL :</label>
                        <input
                            id='col'
                            type='text'
                            inputMode='numeric'
                            pattern='[0-9]*'
                            value={col}
                            onChange={onChangeCol} />
                    </div>
                    <div>
                        <label htmlFor='mine'>MINE :</label>
                        <input
                            id='mine'
                            type='text'
                            inputMode='numeric'
                            pattern='[0-9]*'
                            value={mine}
                            required
                            onChange={onChangeMine} />
                    </div>




                    <button onClick={onClickStart}>Start</button>
                </div> : null}
                <button className='btn' onClick={onClickCustom}>{!custom ? 'custom' : 'back'}</button>



            </div>
        </>
    );
}

export default Main;