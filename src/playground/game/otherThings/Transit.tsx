import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ColoredLetter from '../../../utility/ColoredLetter';
import { SYSTEM } from '../../../data/colorfullStrings';

type TransitProps = {
};

const Transit: React.FC<TransitProps> = () => {
    const initialSteps = 5;
    const navigate = useNavigate();
    const location = useLocation();
    const { target } = useParams<{ target: string }>();
    const { from } = useParams<{ from: string }>();
    const { to } = useParams<{ to: string }>();

    const [steps, setSteps] = useState<number>(initialSteps);

    useEffect(() => {
        if (steps <= 0) {
            navigate(`/${target}`, { replace: true });
        }
        if (steps >= initialSteps + 1) {
            navigate(`/${location}`, { replace: true });
        }
    }, [steps, navigate, target]);

    const handleGoForward = () => {
        setSteps(prev => prev - 1);
    };

    const handleGoBack = () => {
        setSteps(prev => prev + 1);
    };

    return (
        <div>
            <h2>Von {from} nach {to}</h2>
            <p className='mb-1 text-left'>
                Es sind noch {steps} Schritte bis zu deinem Ziel.
            </p>
            {steps > 0 && (
                <div className='flex-row max-width'>
                    <div onClick={handleGoBack} style={{ width: "50%" }}>
                        {SYSTEM.zurück}
                    </div>
                    <div onClick={handleGoForward} style={{ width: "50%" }}>
                        {SYSTEM.weiter}
                    </div>
                </div>
            )}
            {steps <= 0 && <p>Du hast dein Ziel erreicht ...</p>}
        </div>
    );
};

export default Transit;