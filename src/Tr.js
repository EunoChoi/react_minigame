import Td from './Td';
import { useContext, memo } from 'react';
import { TableContext } from './App';

const Tr = memo(({ rowIndex, time }) => {
    const { tableData } = useContext(TableContext);

    return (
        <tr>
            {Array(tableData[rowIndex].length).fill().map((td, i) =>
                <Td time={time} key={i} rowIndex={rowIndex} colIndex={i} />)}
        </tr>
    );
})

export default Tr;