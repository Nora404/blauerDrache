import React from 'react';

type FormattedByValueProps = {
    value: number;
};

const FormattedByValue: React.FC<FormattedByValueProps> = ({ value }) => {

    const getColorClass = () => {
        if (value > 0) return 'text-green font-bold';
        if (value < 0) return 'text-red font-bold';
        return 'text-gray';
    };

    return <span className={getColorClass()}>{value}</span>;
};

export default FormattedByValue;