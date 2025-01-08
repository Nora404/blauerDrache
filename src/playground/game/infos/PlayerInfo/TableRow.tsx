// Neue Datei: StatRow.tsx
import React from 'react';
import FormattedByValue from '../../../../utility/FormattedByValue';
import { GradientText } from '../../../../utility/GradientText';


type TableRowProps = {
    label: React.ReactNode;
    base: number;
    buff: number;
    debuff: number;
    feeling: number;
    weapon: number;
    armor: number;
    total: number;
};

const TableRow: React.FC<TableRowProps> = ({
    label,
    base,
    buff,
    debuff,
    feeling,
    weapon,
    armor,
    total,
}) => {
    return (
        <tr>
            <td data-label="Attribut" className='border-bd padding-left'>
                <span>{label}</span>
            </td>
            <td data-label="Grundwerte" className='text-center border-bd'>
                <span>{base}</span>
            </td>
            <td data-label="Buffs" className='text-center border-bd'>
                <span><FormattedByValue value={buff} /></span>
            </td>
            <td data-label="Debuffs" className='text-center border-bd'>
                <span><FormattedByValue value={debuff} /></span>
            </td>
            <td data-label="Feeling" className='text-center border-bd'>
                <span><FormattedByValue value={feeling} /></span>
            </td>
            <td data-label="Waffe" className='text-center border-bd'>
                <span><FormattedByValue value={weapon} /></span>
            </td>
            <td data-label="Rüstung" className='text-center border-bd'>
                <span><FormattedByValue value={armor} /></span>
            </td>
            <td data-label="Gesamt" className='text-center border-bd'>
                <span><GradientText>{total}</GradientText></span>
            </td>
        </tr>
    );
};

export default TableRow;
