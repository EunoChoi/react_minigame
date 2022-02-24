import Tr from './Tr';
import { useContext } from 'react';
import { TableContext } from './App';

const Table = () => {
    const { tableData } = useContext(TableContext);

    return (
        <table>
            <tbody>
                {Array(tableData.length).fill().map((tr, i) => <Tr key={i} rowIndex={i} />)}
            </tbody>
        </table>
    );
}

export default Table;