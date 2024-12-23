import React, { ReactNode } from 'react';
import './Header.css'

type HeaderProps = {
    children: ReactNode;
};

const Header: React.FC<HeaderProps> = ({ children }) => {

    return (
        <div>
            <h3 className='header'>{children}</h3>
            <hr />
        </div>
    );
};

export default Header;