import { VariableSizeGrid, GridChildComponentProps } from "react-window";
import {useState} from "react";

const record: Record = {
    id: 1,
    firstName: 'aaaa',
    lastName: 'aaaa',
    email: 'aaaa@aaa.com',
    city: 'aaaa'
}

export default function Home() {
    const [records, setRecords] = useState(new Array(100000).fill(record))
    const remove = () => setRecords([])

    return (
        <>
            <GridWithItemData records={records} />
            <button onClick={remove}>remove</button>
            {/*<ul>*/}
            {/*    {records.map((record, i) => {*/}
            {/*        return <li key={i}>{record.firstName} {record.lastName} {record.email} {record.city}</li>*/}
            {/*    })}*/}
            {/*</ul>*/}
        </>
    )
}

type Record = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    city: string;
};

const columnWidths = {
    id: 40,
    firstName: 100,
    lastName: 100,
    email: 300,
    city: 100,
};

type Data = Record[];

const Cell = ({columnIndex, rowIndex, style, data}: GridChildComponentProps) => {
    const record = (data as Data)[rowIndex];
    const key = (Object.keys(record) as Array<keyof Record>)[columnIndex];

    return (
        <div className="cell" style={style}>
            {record[key]}
        </div>
    );
};

const GridWithItemData = (props: { records: Array<Record>}) => {
    const { records } = props;

    return (
        <VariableSizeGrid
            className="grid"
            columnCount={5}
            columnWidth={(index) => {
                return columnWidths[
                    (Object.keys(records[0]) as Array<keyof Record>)[index]
                    ];
            }}
            height={300}
            rowCount={records.length}
            rowHeight={(index) => 50}
            width={200}
            itemData={records}
        >
            {Cell}
        </VariableSizeGrid>
    );
};