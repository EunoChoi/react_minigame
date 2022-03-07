import { CODE } from "./App";


export const initialStateTimer = {
    timer2: 0,
};


//Reducer initialState
export const initialState = {
    tableData: [],

    mine: 0,
    row: 0,
    col: 0,

    openCount: 0,
    finish: false,

    timer: 0,
    start: false,
    stop: true,
    os: '',
};

//Recuder action
export const SET_OS = 'SET_OS';

export const ACTION_STOP_TIMER = 'ACTION_STOP_TIMER';
export const ACTION_TIMER_UP = 'ACTION_TIMER_UP';

export const ACTION_START_GAME = 'ACTION_START_GAME';
export const ACTION_OPEN_CELL = 'ACTION_OPEN_CELL';
export const ACTION_CLICK_MINE = 'ACTION_CLICK_MINE';

export const ACTION_MAKE_FLAG = 'ACTION_MAKE_FLAG';
export const ACTION_MAKE_QS = 'ACTION_MAKE_QS';
export const ACTION_MAKE_NORMAL = 'ACTION_MAKE_NORMAL';

export const ACTION_BACK = 'ACTION_BACK';

let cnt = 0;


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

//내가 작성한 getAround 코드
const getAround = (table, row, col) => {
    //아래 if조건을 주는 이유는 재귀중에 normal 칸인지 확인하기 위함
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

        //around배열으로 지뢰 수 계산
        table[row][col] = around.reduce((a, c) => {
            if (c === CODE.MINE || c === CODE.F_MINE || c === CODE.Q_MINE)
                a++;
            return a;
        }, 0);

        //around가 0이 아니면 8방 getAround 실행x
        if (table[row][col] !== 0) return;

        //주변칸 getAround 실행
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

//제로초님 유튜브 영상 방식 코드
const getAround_2 = (table, row, col) => {
    //아래 조건이 없다면 재귀가 무한으로 동작한다
    if (table[row][col] === CODE.NORMAL) {
        cnt++;
        let around = [];

        //클릭한 곳 상단 row가 존재한다면 concat으로 값들을 넣어준다
        if (table[row - 1]) {
            around = around.concat(
                table[row - 1][col - 1],
                table[row - 1][col],
                table[row - 1][col + 1],
            );
        }
        //클릭한 곳 좌우를 around에 넣어준다
        //가장 왼쪽 혹은 가장 오른쪽 칸을 누른 경우 범위 밖은 undefined가 추가됨
        around = around.concat(
            table[row][col - 1],
            table[row][col + 1],
        );
        //클릭한 곳 하단 row가 존재한다면 concat으로 값들을 넣어준다
        if (table[row + 1]) {
            around = around.concat(
                table[row + 1][col - 1],
                table[row + 1][col],
                table[row + 1][col + 1],
            );
        }

        const count = around.filter((v) =>
            [CODE.MINE, CODE.F_MINE, CODE.Q_MINE].includes(v)).length;

        //주변 지뢰개수 입력
        table[row][col] = count;

        console.log('zerocho : ' + around);
        console.log('zerocho : ' + count);

        //현재 칸의 count가 0이면 주변칸 탐색을 시작한다
        if (count === 0) {
            //클릭한 곳 상단 row가 존재한다면 상단 row 셀들 getAround_2 실행
            if (table[row - 1]) {
                getAround_2(table, row - 1, col - 1);
                getAround_2(table, row - 1, col);
                getAround_2(table, row - 1, col + 1);
            }
            //클릭한 곳 좌우 getAround_2 실행
            getAround_2(table, row, col - 1);
            getAround_2(table, row, col + 1);
            //클릭한 곳 하단 row가 존재한다면 상단 row 셀들 getAround_2 실행
            if (table[row + 1]) {
                getAround_2(table, row + 1, col - 1);
                getAround_2(table, row + 1, col);
                getAround_2(table, row + 1, col + 1);
            }
        }
    }
    return;
}

export const reducerTimer = (state, action) => {
    switch (action.type) {
        case ACTION_TIMER_UP: {
            let timer = state.timer;
            timer++;

            return {
                ...state,
                timer,
            }
        }
        default:
            return state;
    }
}


//Reducer function
export const reducer = (state, action) => {
    switch (action.type) {
        case SET_OS: {
            const os = action.os;
            return {
                ...state,
                os,
            }
        }
        case ACTION_TIMER_UP: {
            let timer = state.timer;
            timer++;

            return {
                ...state,
                timer,
            }
        }

        //타이머정지
        case ACTION_STOP_TIMER: {

            //stop 변수는 셀 더이상 안눌러지게 하는 용도의 상태를 나타내는 변수
            let stop = !state.stop;
            console.log(stop);
            return {
                ...state,
                stop,
            }
        }

        case ACTION_START_GAME: {
            //game page에서 사용되는 state들이 변하여 game page가 refresh된다
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

            //클릭으로 셀 열릴때마다 cnt 0으로 값 초기화
            cnt = 0;
            const tableData = [...state.tableData];

            //다른곳에선 클릭한 칸의 row만 deep copy했는데 여기선 모든 row deep copy
            //재귀가발생하면서 클릭한 칸 row 말고 다른 row의 셀들도 변화가 발생하기 때문
            tableData.forEach((row, i) => {
                tableData[i] = [...state.tableData[i]];
            });

            getAround_2(tableData, action.row, action.col);
            //getAround(tableData, action.row, action.col);

            //cnt 변수 : 재귀가 끝난후 계산된 열린 칸 수
            console.log(cnt);

            // 비효율적인 열린칸수 확인
            // let counter = 0;
            // for (let i = 0; i < state.row; i++) {
            //     for (let j = 0; j < state.col; j++) {
            //         if (tableData[i][j] >= 0)
            //             counter++;
            //     }
            // }

            //승리 조건 확인

            console.log('오픈 수' + (state.openCount + cnt));
            console.log('마인 수 : ' + state.mine);
            console.log('셀 수 : ' + state.row * state.col);

            //승리 조건 확인
            if (state.openCount + cnt + state.mine === state.row * state.col) {

                //모든 지뢰 깃발로 표시되도록 tableData 값 변경
                for (let i = 0; i < state.row; i++) {
                    for (let j = 0; j < state.col; j++) {
                        if (tableData[i][j] === CODE.MINE ||
                            tableData[i][j] === CODE.F_MINE ||
                            tableData[i][j] === CODE.Q_MINE)
                            tableData[i][j] = CODE.F_MINE;
                    }
                }
                const score =
                    (Math.floor(state.timer / 3600) >= 1 ? (Math.floor(state.timer / 3600) + ':').padStart(3, '0') : '')
                    + (Math.floor(state.timer / 60) + ':').padStart(3, '0')
                    + (state.timer % 60).toString().padStart(2, '0');
                setTimeout(() => {
                    alert(`Game Complete! :)\nyour score : ${score}`)
                }, 500);

                return {
                    ...state,
                    tableData,
                    stop: true,
                    finish: true,
                    openCount: 0,
                };
            };

            return {
                ...state,
                tableData,
                openCount: Number(state.openCount + cnt),
            };
        }
        case ACTION_CLICK_MINE: {
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
                openCount: 0,
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
            return {
                ...state,
                start: false,
                openCount: 0,
            }
        }
        default:
            return state;
    }
};

