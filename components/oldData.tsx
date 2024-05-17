import React, { Key, useEffect, useState } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from "@nextui-org/react";
import RatioProvider from "@/app/providers/provider";
import { RatioResult } from "@/types/ratioResult";
import dayjs from "dayjs";

var localizedFormat = require('dayjs/plugin/localizedFormat')
dayjs.extend(localizedFormat)

const columns = [
    {
        key: "date",
        label: "Date",
        allowSorting: true
    },
    {
        key: "input",
        label: "Dose",
        allowSorting: true
    },
    {
        key: "output",
        label: "Output",
        allowSorting: true
    },
    {
        key: "ratio",
        label: "Ratio",
        allowSorting: true
    },
    {
        key: "seconds",
        label: "Seconds",
        allowSorting: true
    },
];

const OldData = () => {
    const [rows, setRows] = useState<RatioResult[]>([]);

    const handleCell = (ratio: RatioResult, columnKey: Key) => {
        switch (columnKey) {
            case 'date':
                return dayjs(ratio.date).format('L LT')
            case 'input':
            case 'output':
                return `${ratio[columnKey]} gr`
            default:
                return ratio[columnKey];
        }
    }

    useEffect(() => {
        const updateRows = () => setRows(new RatioProvider().getAll());

        window.addEventListener('storageUpdate', () => updateRows())

        updateRows()

        return () => window.removeEventListener('storageUpdate', () => { })
    }, []);

    return (
        <>
            <h1>Your old data</h1>
            <Table isStriped>
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.key}>{column.label}</TableColumn>
                    )}
                </TableHeader>
                <TableBody items={rows}>
                    {(item) => (
                        <TableRow key={1}>
                            {(columnKey) => (
                                <TableCell>{handleCell(item, columnKey)}</TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    );
};

export default OldData;
