import React, { ReactNode } from 'react';
import './Header.css'

type HeaderSmallProps = {
    children: ReactNode;
};

const HeaderSmall: React.FC<HeaderSmallProps> = ({ children }) => {

    return (
        <div>
            <h3 className='headerSmall'>{children}</h3>
            <hr className='hrSmall' />
        </div>
    );
};

export default HeaderSmall;