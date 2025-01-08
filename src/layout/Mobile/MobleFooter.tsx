import React, { useState } from 'react';
import ActionButton from '../ActionButtons/ActionButton';
import './MobilePop.css'

type MobileFooterProps = {
};

const MobileFooter: React.FC<MobileFooterProps> = () => {
    const [showPop, setShowPop] = useState(false);

    const handleTest = () => {
        setShowPop(prev => !prev);
        console.log("piep");
    }

    return (
        <>
            <div id='handyPop' className={`custom-scrollbar ${showPop ? 'open' : 'closed'}`}>Hallo</div>

            <ActionButton onClick={handleTest} label='Game' />
            <ActionButton onClick={handleTest} label='Info' />
            <ActionButton onClick={handleTest} label='Navi' />
            <ActionButton onClick={handleTest} label='Player' />
        </>
    );
};

export default MobileFooter;