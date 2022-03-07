import Tr from './Tr';
import { memo } from 'react';

const Table = ({ tableData, stop, dispatch, os }) => {
    console.log('table page refresh');

    return (
        <>
            <table>
                <tbody>
                    {Array(tableData.length).fill().map((tr, i) => <Tr
                        stop={stop}
                        dispatch={dispatch}
                        os={os}
                        tableData={tableData}
                        key={i}
                        rowIndex={i} />)}
                </tbody>
            </table>
        </>
    );
}

export default memo(Table);