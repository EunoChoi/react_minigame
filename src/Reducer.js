import { CODE } from "./App";

//Reducer initialState
export const initialState = {
    tableData: [],
    stop: true,
    finish: false,

    mine: 0,
    row: 0,
    col: 0,

    start: false,
};
//Recuder action
export const ACTION_START_TIMER = 'ACTION_START_TIMER';
export const ACTION_STOP_TIMER = 'ACTION_STOP_TIMER';
export const ACTION_STOP_TIMER2 = 'ACTION_STOP_TIMER2';


export const ACTION_START_GAME = 'ACTION_START_GAME';
export const ACTION_OPEN_CELL = 'ACTION_OPEN_CELL';
export const ACTION_MAKE_FLAG = 'ACTION_MAKE_FLAG';
export const ACTION_MAKE_QS = 'ACTION_MAKE_QS';
export const ACTION_MAKE_NORMAL = 'ACTION_MAKE_NORMAL';
export const ACTION_CLICK_MINE = 'ACTION_CLICK_MINE';
export const ACTION_BACK = 'ACTION_BACK';

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

const getAround = (table, row, col) => {
    if (table[row][col] === CODE.NORMAL) {
        let around;

        //클릭 좌표에 따라서 8방 around 배열 생성
        if (row === 0) {
            around = [
                table[row][col - 1],
                table[row][col + 1],

                table[row + 1][col - 1],
                table[row + 1][col],
                table[row + 1][col + 1],
            ];
        }
        else if (row === table.length - 1) {
            around = [
                table[row - 1][col - 1],
                table[row - 1][col],
                table[row - 1][col + 1],

                table[row][col - 1],
                table[row][col + 1]
            ];
        }
        else {
            around = [
                table[row - 1][col - 1],
                table[row - 1][col],
                table[row - 1][col + 1],

                table[row][col - 1],
                table[row][col + 1],

                table[row + 1][col - 1],
                table[row + 1][col],
                table[row + 1][col + 1],
            ];
        }
        console.log(around);
        //around배열으로 지뢰 수 계산
        table[row][col] = around.reduce((a, c) => {
            if (c === CODE.MINE || c === CODE.F_MINE || c === CODE.Q_MINE) a++;
            return a;
        }, 0);

        //around가 0이 아니면 8방 getAround 실행x
        if (table[row][col] !== 0) return;

        //8방 getAround 실행
        if (row === 0) {
            getAround(table, row, col - 1);
            getAround(table, row, col + 1);

            getAround(table, row + 1, col - 1);
            getAround(table, row + 1, col);
            getAround(table, row + 1, col + 1);
        }
        else if (row === table.length - 1) {
            getAround(table, row - 1, col - 1);
            getAround(table, row - 1, col);
            getAround(table, row - 1, col + 1);

            getAround(table, row, col - 1);
            getAround(table, row, col + 1);
        }
        else {
            getAround(table, row - 1, col - 1);
            getAround(table, row - 1, col);
            getAround(table, row - 1, col + 1);

            getAround(table, row, col - 1);
            getAround(table, row, col + 1);

            getAround(table, row + 1, col - 1);
            getAround(table, row + 1, col);
            getAround(table, row + 1, col + 1);
        }
    }
    return;
}

let timeInterval;

//Reducer function
export const reducer = (state, action) => {

    switch (action.type) {
        // case ACTION_START_TIMER: {
        //     console.log(timeInterval);
        //     return {
        //         ...state,
        //     };
        // }
        case ACTION_STOP_TIMER: {
            clearInterval(timeInterval);
            action.setTime(0);
            console.log(timeInterval);

            //stop 변수는 셀 더이상 안눌러지게 하는 용도의 상태를 나타내는 변수
            let stop = !state.stop;
            return {
                ...state,
                stop,
            }
        }
        case ACTION_STOP_TIMER2: {
            console.log(action.time);
            if (state.stop) {
                timeInterval = setInterval(() => { action.setTime((c) => c + 1) }, 1000);
            }
            else
                clearInterval(timeInterval);
            //stop 변수는 셀 더이상 안눌러지게 하는 용도의 상태를 나타내는 변수
            let stop = !state.stop;
            return {
                ...state,
                stop,
            }
        }
        case ACTION_START_GAME: {
            timeInterval = setInterval(() => { action.setTime((c) => c + 1) }, 1000);
            console.log(timeInterval);
            return {
                ...state,
                tableData: mineSetting(action.row, action.col, action.mine),
                stop: false,
                row: action.row,
                col: action.col,
                mine: action.mine,
                timer: 0,
                start: true,
                finish: false,
            };
        }
        case ACTION_OPEN_CELL: {
            if (state.stop) return { ...state };

            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            //tableData[action.row][action.col] = CODE.OPENED;

            //console.log(tableData);
            getAround(tableData, action.row, action.col);

            //열린칸수 확인
            let counter = 0;
            for (let i = 0; i < state.row; i++) {
                for (let j = 0; j < state.col; j++) {
                    if (tableData[i][j] >= 0)
                        counter++;
                }
            }

            //승리 조건 확인
            console.log(counter, state.mine, state.row * state.col)
            if (counter + state.mine === state.row * state.col) {
                clearInterval(timeInterval);
                for (let i = 0; i < state.row; i++) {
                    for (let j = 0; j < state.col; j++) {
                        if (tableData[i][j] === CODE.MINE ||
                            tableData[i][j] === CODE.F_MINE ||
                            tableData[i][j] === CODE.Q_MINE)
                            tableData[i][j] = CODE.F_MINE;
                    }
                }
                setTimeout(() => {
                    alert(`Game Complete! :)\nyour score : ${action.time}s`)
                }, 500);
                return {
                    ...state,
                    tableData,
                    stop: true,
                    finish: true,
                };
            };

            return {
                ...state,
                tableData,
                count: counter,
            };
        }
        case ACTION_CLICK_MINE: {
            clearInterval(timeInterval);
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.col] = CODE.CLICKED_MINE;

            for (let i = 0; i < state.row; i++) {
                for (let j = 0; j < state.col; j++) {
                    if (tableData[i][j] === CODE.MINE ||
                        tableData[i][j] === CODE.F_MINE ||
                        tableData[i][j] === CODE.Q_MINE)
                        tableData[i][j] = CODE.CLICKED_MINE;
                }
            }
            setTimeout(() => { alert('Game Fail :(') }, 500);

            return {
                ...state,
                tableData,
                stop: true,
                finish: true,
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
        case ACTION_BACK: {
            //start는 게임이 동작중인지 확인하는 용도의 변수
            clearInterval(timeInterval);
            return {
                ...state,
                start: false,
            }
        }
        default:
            return state;
    }
};

