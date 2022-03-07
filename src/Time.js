import { memo, useContext, useEffect } from "react";
import { TableContext } from "./App";

import { ACTION_TIMER_UP } from "./Reducer";

const Time = () => {
    const { timer, stop, dispatch } = useContext(TableContext);

    useEffect(() => {
        let timerInterval;
        if (!stop) {
            timerInterval = setInterval(() => {
                dispatch({ type: ACTION_TIMER_UP });
            }, 1000);
        }
        //컴포넌트가 사라질때 실행
        return () => {
            clearInterval(timerInterval);
        };
    }, [dispatch, stop]);



    return (
        <>
            <span className='subTitle'>
                {Math.floor(timer / 3600) >= 1 ? (Math.floor(timer / 3600) + ':').padStart(3, '0') : null}
                {(Math.floor(timer / 60) + ':').padStart(3, '0')}
                {(timer % 60).toString().padStart(2, '0')}
            </span>
        </>
    );
}

export default memo(Time);