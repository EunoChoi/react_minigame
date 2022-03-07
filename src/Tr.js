import Td from './Td';
import { memo } from 'react';

const Tr = memo(({ tableData, rowIndex, stop, dispatch, os }) => {
    console.log('tr page refresh');

    return (
        <tr>
            {Array(tableData[rowIndex].length).fill().map((td, i) =>
                <Td
                    stop={stop}
                    dispatch={dispatch}
                    os={os}
                    tableData={tableData}
                    key={i}
                    rowIndex={rowIndex}
                    colIndex={i}
                />)}
        </tr>
    );
});

export default Tr;