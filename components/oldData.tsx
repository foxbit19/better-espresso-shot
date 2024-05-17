import React, { Key, useEffect, useState } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Button,
} from "@nextui-org/react";
import RatioProvider from "@/app/providers/provider";
import { RatioResult } from "@/types/ratioResult";
import dayjs from "dayjs";
import { FaTrash } from "react-icons/fa";
import Tips from "./tips";

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
    {
        key: "actions",
        label: "",
    },
];

const OldData = (props: {}) => {
    const [rows, setRows] = useState<RatioResult[]>([]);

    const handleDelete = (id: string) => {
        new RatioProvider().delete(id)
    }

    const handleCell = (ratio: RatioResult, columnKey: Key) => {
        switch (columnKey) {
            case 'date':
                return dayjs(ratio.date).format('L LT')
            case 'input':
            case 'output':
                return `${ratio[columnKey]} gr`
            case 'actions':
                return <Button onClick={() => handleDelete(ratio.id)} isIconOnly size="sm"><FaTrash /></Button>
            case 'seconds':
                return `${ratio.seconds} s`
            case 'ratio':
                return <span className="text-coffee-cream font-bold">{ratio.ratio}</span>
        }
    }

    useEffect(() => {
        const updateRows = () => setRows(new RatioProvider().getAll());

        window.addEventListener('storageUpdate', () => updateRows())

        updateRows()

        return () => window.removeEventListener('storageUpdate', () => { })
    }, []);

    return (
        <div className={rows.length > 0 ? '' : 'hidden'}>
            <Tips text="Your old data" left />
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
        </div>
    );
};

export default OldData;
