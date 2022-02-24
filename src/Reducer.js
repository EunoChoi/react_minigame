import { CODE } from "./App";

//Reducer initialState
export const initialState = {
    tableData: [],
    timer: 0,
    result: 0,
    stop: true,
};
//Recuder action
export const ACTION_START_GAME = 'ACTION_START_GAME';
export const ACTION_OPEN_CELL = 'ACTION_OPEN_CELL';
export const ACTION_MAKE_FLAG = 'ACTION_MAKE_FLAG';
export const ACTION_MAKE_QS = 'ACTION_MAKE_QS';
export const ACTION_MAKE_NORMAL = 'ACTION_MAKE_NORMAL';
export const ACTION_CLICK_MINE = 'ACTION_CLICK_MINE';


//function
const mineSetting = (row, col, mine) => {
    const indexTable = Array(row * col).fill().map((v, i) => (i));

    //shuffle mine index
    let shuffle = [];
    while (indexTable.length > row * col - mine) {
        shuffle.push(indexTable.splice(Math.floor(Math.random() * indexTable.length), 1));
    }

    let data = [];
    for (let i = 0; i < row; i++) {
        let dataRow = [];
        data.push(dataRow);
        for (let j = 0; j < col; j++) {
            dataRow.push(CODE.NORMAL);
        }
    }

    for (let k = 0; k < shuffle.length; k++) {
        const j = shuffle[k] % col;
        //몫이므로 Math.floor 사용
        const i = Math.floor(shuffle[k] / col);
        data[i][j] = CODE.MINE;
    }
    return data;
}

//Reducer function
export const reducer = (state, action) => {
    switch (action.type) {
        case ACTION_START_GAME: {
            return {
                ...state,
                tableData: mineSetting(action.row, action.col, action.mine),
                stop: false,
            };
        }
        case ACTION_OPEN_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row][action.col] = CODE.OPENED;
            return {
                ...state,
                tableData,
            };
        }
        case ACTION_CLICK_MINE: {
            const tableData = [...state.tableData];
            tableData[action.row][action.col] = CODE.CLICKED_MINE;
            return {
                ...state,
                tableData,
                stop: true,
            };
        }
        case ACTION_MAKE_FLAG: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];

            if (tableData[action.row][action.col] === CODE.MINE) {
                tableData[action.row][action.col] = CODE.F_MINE;
            }
            else {
                tableData[action.row][action.col] = CODE.F_NORMAL;
            }
            return {
                ...state,
                tableData,
            };
        }
        case ACTION_MAKE_QS: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if (tableData[action.row][action.col] === CODE.F_MINE)
                tableData[action.row][action.col] = CODE.Q_MINE;
            else
                tableData[action.row][action.col] = CODE.Q_NORMAL;
            return {
                ...state,
                tableData,
            };
        }
        case ACTION_MAKE_NORMAL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];

            if (tableData[action.row][action.col] === CODE.Q_MINE)
                tableData[action.row][action.col] = CODE.MINE;
            else
                tableData[action.row][action.col] = CODE.NORMAL;
            return {
                ...state,
                tableData,
            };
        }
        default:
            return state;
    }
};