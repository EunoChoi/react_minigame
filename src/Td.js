import { useContext, useCallback, memo } from "react";
import { CODE, TableContext } from "./App";
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
            return '🔥';
        case CODE.F_NORMAL:
        case CODE.F_MINE:
            return '🚩';
        case CODE.Q_NORMAL:
        case CODE.Q_MINE:
            return '?';
        case CODE.OPENED:
            return '';
        default:
            return code;
    }
}

const Td = memo(({ rowIndex, colIndex }) => {
    const { tableData, stop, dispatch } = useContext(TableContext);

    const onClick = useCallback(() => {
        //stop이 true면 셀 처리 X
        if (stop) {
            return;
        }

        //누르는 칸의 상황에 따라 동작이 다르도록
        switch (tableData[rowIndex][colIndex]) {
            case CODE.OPENED:
            case CODE.F_NORMAL:
            case CODE.F_MINE:
            case CODE.Q_NORMAL:
            case CODE.Q_MINE:
                break;
            case CODE.MINE:
                dispatch({ type: ACTION_CLICK_MINE, row: rowIndex, col: colIndex });
                break;
            case CODE.NORMAL:
                dispatch({ type: ACTION_OPEN_CELL, row: rowIndex, col: colIndex });
                break;
            default:
                break;
        }
    }, [colIndex, dispatch, rowIndex, stop, tableData]);
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

    return (
        <td
            style={getTdStyle(tableData[rowIndex][colIndex])}
            onContextMenu={onRightClick}
            onClick={onClick}>
            {getTdText(tableData[rowIndex][colIndex])}
        </td>
    );
})

export default Td;