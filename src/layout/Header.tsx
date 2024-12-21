import React, { ReactNode } from 'react';

type HeaderProps = {
    children: ReactNode;
};

const Header: React.FC<HeaderProps> = ({ children }) => {

    return (
        <div className="my-component">
            <h3 className='header'>{children}</h3>
            <hr />
        </div>
    );
};

export default Header;