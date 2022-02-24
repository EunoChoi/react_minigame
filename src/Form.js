import { useState, useCallback, useContext } from 'react';
import { TableContext } from './App';
import { ACTION_START_GAME } from './Reducer';

const Form = () => {
    const [row, setRow] = useState(7);
    const [col, setCol] = useState(7);
    const [mine, setMine] = useState(15);

    const { dispatch } = useContext(TableContext);

    //onChange 이벤트 함수들은 변화가 없으므로 useCallback으로 재선언 방지
    const onChangeRow = useCallback((e) => {
        setRow(e.target.value);
    }, []);
    const onChangeCol = useCallback((e) => {
        setCol(e.target.value);
    }, []);
    const onChangeMine = useCallback((e) => {
        setMine(e.target.value);
    }, []);

    //click start start button
    const onClick = useCallback(() => {
        dispatch({ type: ACTION_START_GAME, row, col, mine })
    }, [dispatch, row, col, mine]
    );

    return (
        <div>
            <input
                type='number'
                placeholder='Row'
                value={row}
                onChange={onChangeRow} />
            <input
                type='number'
                placeholder='Col'
                value={col}
                onChange={onChangeCol} />
            <input
                type='number'
                placeholder='Mine'
                value={mine}
                onChange={onChangeMine} />
            <button onClick={onClick}>start</button>
        </div>

    );
}

export default Form;