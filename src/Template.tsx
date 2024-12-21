import React from 'react';

type MyComponentProps = {
    title?: string;
    onClick?: () => void;
};

const MyComponent: React.FC<MyComponentProps> = ({ title = 'Standard Titel', onClick }) => {

    return (
        <div className="my-component">
            <h2>{title}</h2>
            <button onClick={onClick}>
                Klicke mich
            </button>
        </div>
    );
};

export default MyComponent;
