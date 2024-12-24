import React from 'react';

type WhatIsProps = {
    title?: string;
    onClick?: () => void;
};

const WhatIs: React.FC<WhatIsProps> = () => {

    return (
        <div className="max-widht">
            <h2>Das erwartet dich hier ...</h2>

        </div>
    );
};

export default WhatIs;
