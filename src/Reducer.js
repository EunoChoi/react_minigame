import { useState } from "react";
import { CODE } from "./App";

//Reducer initialState
export const initialState = {
    tableData: [],
    timer: 0,
    result: 0,
    stop: true,

    mine: 0,
    row: 0,
    col: 0,
};
//Recuder action
export const ACTION_START_COUNT = 'ACTION_START_COUNT';
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


const getAround = (table, row, col) => {
    if (table[row][col] === CODE.NORMAL) {
        let around;

        //클릭 좌표에 따라서 8방 around 계산
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

        table[row][col] = around.reduce((a, c) => {
            if (c === CODE.MINE) a++;
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

//Reducer function
export const reducer = (state, action) => {
    switch (action.type) {
        case ACTION_START_COUNT: {
            if (state.stop === true) return { ...state };
            return {
                ...state,
                timer: state.timer + 1,
            };
        }
        case ACTION_START_GAME: {
            return {
                ...state,
                tableData: mineSetting(action.row, action.col, action.mine),
                stop: false,
                row: action.row,
                col: action.col,
                mine: action.mine,
                timer: 0,
            };
        }
        case ACTION_OPEN_CELL: {
            const tableData = [...state.tableData];
            //tableData[action.row][action.col] = CODE.OPENED;
            tableData[action.row] = [...state.tableData[action.row]];

            getAround(tableData, action.row, action.col);

            let counter = 0;
            for (let i = 0; i < state.row; i++) {
                for (let j = 0; j < state.col; j++) {
                    if (tableData[i][j] >= 0)
                        counter++;
                }
            }

            //승리 조건 확인
            if (counter + state.mine === state.row * state.col) {
                alert('Game Complete! :)');
                return {
                    ...state,
                    tableData,
                    stop: true,
                };
            };

            return {
                ...state,
                tableData,
                count: counter,
            };
        }
        case ACTION_CLICK_MINE: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.col] = CODE.CLICKED_MINE;

            for (let i = 0; i < state.row; i++) {
                for (let j = 0; j < state.col; j++) {
                    if (tableData[i][j] === CODE.MINE)
                        tableData[i][j] = CODE.CLICKED_MINE;
                }
            }
            setTimeout(() => { alert('Game Fail :(') }, 500);

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
