import React from 'react';
import Header from './layout/Header/Header';

type MyComponentProps = {
};

const MyComponent: React.FC<MyComponentProps> = () => {

    return (
        <div>
            <Header>Nordtor</Header>
            <p className='mb-1 text-left'>

            </p>
        </div>
    );
};

export default MyComponent;
