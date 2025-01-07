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
            <ActionButton onClick={handleTest}>Game</ActionButton>
            <ActionButton onClick={handleTest}>Info</ActionButton>
            <ActionButton onClick={handleTest}>Navi</ActionButton>
            <ActionButton onClick={handleTest}>Player</ActionButton>
        </>
    );
};

export default MobileFooter;