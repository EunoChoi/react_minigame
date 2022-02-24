import Td from './Td';
import { useContext, memo } from 'react';
import { TableContext } from './App';

const Tr = memo(({ rowIndex }) => {
    const { tableData } = useContext(TableContext);

    return (
        <tr>
            {Array(tableData[rowIndex].length).fill().map((td, i) =>
                <Td key={i} rowIndex={rowIndex} colIndex={i} />)}
        </tr>
    );
})

export default Tr;