import React from 'react';

type ChooseOriginProps = {
    title?: string;
    onClick?: () => void;
};

const ChooseOrigin: React.FC<ChooseOriginProps> = ({ title = 'Standard Titel', onClick }) => {

    return (
        <div className="my-component">
            <h2>{title}</h2>
            <button onClick={onClick}>
                Klicke mich
            </button>
        </div>
    );
};

export default ChooseOrigin;