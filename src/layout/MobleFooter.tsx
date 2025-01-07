import React from 'react';
import ActionButton from './ActionButtons/ActionButton';

type MobileFooterProps = {
};

const MobileFooter: React.FC<MobileFooterProps> = () => {
    const handleTest = () => {
        console.log("piep");
    }
    return (
        <>
            <ActionButton onClick={handleTest} label='Game' />
            <ActionButton onClick={handleTest} label='Info' />
            <ActionButton onClick={handleTest} label='Navi' />
            <ActionButton onClick={handleTest} label='Player' />
        </>
    );
};

export default MobileFooter;