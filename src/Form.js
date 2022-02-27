import { useState, useCallback, useContext } from 'react';
import { TableContext } from './App';
import { ACTION_START_GAME, ACTION_START_COUNT, ACTION_STOP_TIMER } from './Reducer';
export let timer;
const Form = () => {
    const [row, setRow] = useState(7);
    const [col, setCol] = useState(7);
    const [mine, setMine] = useState(10);
    //const [start, setStart] = useState(false);
    const [custom, setCustom] = useState(false);

    const { dispatch } = useContext(TableContext);

    //onChange 이벤트 함수들은 변화가 없으므로 useCallback으로 재선언 방지
    const onChangeRow = useCallback((e) => {
        setRow(Number(e.target.value));
    }, []);
    const onChangeCol = useCallback((e) => {
        setCol(Number(e.target.value));
    }, []);
    const onChangeMine = useCallback((e) => {
        setMine(Number(e.target.value));
    }, []);

    //click startbutton
    const onClickStart = () => {
        if (mine >= row * col) {
            alert('plaese correct number');
            clearInterval(timer);
            dispatch({ type: ACTION_STOP_TIMER });
            dispatch({ type: ACTION_START_GAME, row: 0, col: 0, mine: 0 });
            return;
        }
        dispatch({ type: ACTION_START_GAME, row: row, col: col, mine: mine });
        //이전에 생성된 타이머 setInterval 삭제
        clearInterval(timer);
        timer = setInterval(() => { dispatch({ type: ACTION_START_COUNT }); }, 1000);
    };
    const onClickLevel1 = () => {
        dispatch({ type: ACTION_START_GAME, row: 6, col: 6, mine: 6 });
        clearInterval(timer);
        timer = setInterval(() => { dispatch({ type: ACTION_START_COUNT }); }, 1000);
    }
    const onClickLevel2 = () => {
        dispatch({ type: ACTION_START_GAME, row: 8, col: 8, mine: 16 });
        clearInterval(timer);
        timer = setInterval(() => { dispatch({ type: ACTION_START_COUNT }); }, 1000);
    }
    const onClickLevel3 = () => {
        dispatch({ type: ACTION_START_GAME, row: 8, col: 8, mine: 30 });
        clearInterval(timer);
        timer = setInterval(() => { dispatch({ type: ACTION_START_COUNT }); }, 1000);
    }
    const onClickCustom = () => {
        setCustom((c) => !c);
    }
    return (
        <>
            <div className='levelSelectPage'>
                <span className='title'>Level Select</span>
                {!custom ? <div className='levelSelectPage_btn'>
                    <button className='btn' onClick={onClickLevel1}>level 1</button>
                    <button className='btn' onClick={onClickLevel2}>level 2</button>
                    <button className='btn' onClick={onClickLevel3}>level 3</button>
                </div> : null}

                <button className='btn' onClick={onClickCustom}>custom</button>

                {custom ? <div className='levelCustom'>
                    <div>
                        <span htmlFor='row'>ROW :</span>
                        <input
                            id='row'
                            type='number'
                            min="2" max="10"
                            placeholder='Row'
                            value={row}
                            onChange={onChangeRow} />
                    </div>
                    <div>
                        <span htmlFor='col'>COL :</span>
                        <input
                            id='col'
                            type='number'
                            min="2" max="10"
                            placeholder='Col'
                            value={col}
                            onChange={onChangeCol} />
                    </div>
                    <div>
                        <span htmlFor='mine'>MINE :</span>
                        <input
                            id='mine'
                            type='number'
                            min="2" max="70"
                            placeholder='Mine'
                            value={mine}
                            onChange={onChangeMine} />
                    </div>




                    <button onClick={onClickStart}>Start</button>
                </div> : null}

            </div>
        </>
    );
}

export default Form;