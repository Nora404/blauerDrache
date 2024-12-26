import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { SYSTEM } from '../../../data/colorfullStrings';

type TransitProps = {
};

const Transit: React.FC<TransitProps> = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { target } = useParams<{ target: string }>();
    const { from } = useParams<{ from: string }>();
    const { to } = useParams<{ to: string }>();
    const { steps } = useParams<{ steps: string }>();
    const initialSteps = Number(steps) || 5;

    const [currentSteps, setCurrentSteps] = useState<number>(initialSteps);

    useEffect(() => {
        if (currentSteps <= 0) {
            navigate(`/${target}`, { replace: true });
        }
        if (currentSteps >= initialSteps + 1) {
            navigate(`/${location}`, { replace: true });
        }
    }, [steps, navigate, target]);

    const handleGoForward = () => {
        setCurrentSteps(prev => prev - 1);
    };

    const handleGoBack = () => {
        setCurrentSteps(prev => prev + 1);
    };

    return (
        <div>
            <h2>Von {from} nach {to}</h2>
            <p className='mb-1 text-left'>
                Es sind noch {currentSteps} Schritte bis zu deinem Ziel.
            </p>
            {currentSteps > 0 && (
                <div className='flex-row max-width'>
                    <div onClick={handleGoBack} style={{ width: "50%" }}>
                        {SYSTEM.zurück}
                    </div>
                    <div onClick={handleGoForward} style={{ width: "50%" }}>
                        {SYSTEM.weiter}
                    </div>
                </div>
            )}
            {currentSteps <= 0 && <p>Du hast dein Ziel erreicht ...</p>}
        </div>
    );
};

export default Transit;