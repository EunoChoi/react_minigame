import { useState, useCallback, useContext, useEffect } from 'react';
import { TableContext } from './App';
import { ACTION_START_GAME, ACTION_START_COUNT } from './Reducer';

const Form = () => {
    const [row, setRow] = useState(10);
    const [col, setCol] = useState(10);
    const [mine, setMine] = useState(15);

    const { stop, dispatch } = useContext(TableContext);

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


    //click start start button
    const onClick = () => {
        dispatch({ type: ACTION_START_GAME, row: row, col: col, mine: mine });
        let timer = null;
        clearInterval(timer);
        timer = setInterval(() => { dispatch({ type: ACTION_START_COUNT }); }, 1000);
    };

    return (
        <div>
            <input
                type='number'
                min="0" max="15"
                placeholder='Row'
                value={row}
                onChange={onChangeRow} />
            <input
                type='number'
                min="0" max="15"
                placeholder='Col'
                value={col}
                onChange={onChangeCol} />
            <input
                type='number'
                min="0" max="225"
                placeholder='Mine'
                value={mine}
                onChange={onChangeMine} />
            <button onClick={onClick}>start</button>
        </div>

    );
}

export default Form;