import { useCallback, memo, useState } from "react";
import { CODE } from "./App";

import {
    ACTION_OPEN_CELL,
    ACTION_MAKE_FLAG,
    ACTION_MAKE_QS,
    ACTION_MAKE_NORMAL,
    ACTION_CLICK_MINE
} from "./Reducer";

const getTdStyle = (code) => {
    switch (code) {
        case CODE.NORMAL:
            return {
                background: 'lightcyan',
            };
        case CODE.MINE:
            return {
                background: 'lightcyan',
            };
        case CODE.OPENED:
            return {
                background: 'white',
            };
        case CODE.F_NORMAL:
        case CODE.F_MINE:
            return {
                background: 'lightPink',
            };
        case CODE.Q_NORMAL:
        case CODE.Q_MINE:
            return {
                background: 'lightYellow',
            };
        default:
            return {
                background: 'white',
            };
    }

}
const getTdText = (code) => {
    switch (code) {
        case CODE.NORMAL:
            return '';
        case CODE.MINE:
            return '';
        case CODE.CLICKED_MINE:
            return '๐ฅ';
        case CODE.F_NORMAL:
        case CODE.F_MINE:
            return '๐ฉ';
        case CODE.Q_NORMAL:
        case CODE.Q_MINE:
            return '?';
        case CODE.OPENED:
            return '';
        default:
            return code;
    }
}

const Td = memo(({ tableData, rowIndex, colIndex, stop, dispatch, os }) => {
    console.log('td page refresh');

    const [touchReject, setTouchReject] = useState(false);
    let longTouch;

    const onClick = useCallback(() => {
        if (touchReject) {
            return;
        }
        //stop์ด true๋ฉด ํด๋ฆญ์ด ๋์ํ์ง ์๋๋ค
        if (stop) {
            return;
        }

        //๋๋ฅด๋ ์นธ์ ์ํฉ์ ๋ฐ๋ผ ๋์์ด ๋ค๋ฅด๋๋ก
        switch (tableData[rowIndex][colIndex]) {
            case CODE.OPENED:
            case CODE.F_NORMAL:
            case CODE.F_MINE:
            case CODE.Q_NORMAL:
            case CODE.Q_MINE:
                break;
            case CODE.MINE:
                dispatch({
                    type: ACTION_CLICK_MINE,
                    row: rowIndex,
                    col: colIndex,
                });
                break;
            case CODE.NORMAL:
                dispatch({
                    type: ACTION_OPEN_CELL,
                    row: rowIndex,
                    col: colIndex,
                });
                break;
            default:
                break;
        }
    }, [colIndex, dispatch, rowIndex, stop, tableData, touchReject]);

    const onRightClick = useCallback((e) => {
        e.preventDefault();
        if (stop) {
            return;
        }

        switch (tableData[rowIndex][colIndex]) {
            case CODE.NORMAL:
            case CODE.MINE:
                dispatch({ type: ACTION_MAKE_FLAG, row: rowIndex, col: colIndex })
                break;
            case CODE.F_MINE:
            case CODE.F_NORMAL:
                dispatch({ type: ACTION_MAKE_QS, row: rowIndex, col: colIndex })
                break;
            case CODE.Q_MINE:
            case CODE.Q_NORMAL:
                dispatch({ type: ACTION_MAKE_NORMAL, row: rowIndex, col: colIndex })
                break;
            default:
                break;
        }
    }, [colIndex, dispatch, rowIndex, stop, tableData]);

    const onTouchStart = (e) => {
        //android๋ฉด context menu ์ด์ฉํด์ ๋์ํ๋๋ก ํฐ์น๋์์ ๋ง๋๋ค
        if (os === 'android') {
            return;
        }
        //console.log('start');
        longTouch = setTimeout(
            () => {
                //console.log('touch rejection on');
                onRightClick(e);
                setTouchReject(true);
            }, 700);
    }
    const onTouchEnd = () => {
        if (os === 'android') {
            return;
        }
        //console.log('end');
        clearTimeout(longTouch);
        setTimeout(() => {
            //console.log('touch rejection off');
            setTouchReject(false);
        }, 300);
    }

    return <td
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onClick={onClick}
        onContextMenu={onRightClick}
        style={getTdStyle(tableData[rowIndex][colIndex])}>
        {getTdText(tableData[rowIndex][colIndex])}
    </td>;

});
export default Td;