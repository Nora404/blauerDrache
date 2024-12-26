import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

type TransitProps = {
};

const Transit: React.FC<TransitProps> = () => {
    const initialSteps = 5;
    const navigate = useNavigate();
    const { target } = useParams<{ target: string }>();
    const location = useLocation();

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
            <h2>Von {location.state?.from || 'Unbekannt'} nach {target}</h2>
            <p className='mb-1 text-left'>
                Es sind noch {steps} Schritte bis zu deinem Ziel.
            </p>
            {steps > 0 && (
                <div>
                    <button onClick={handleGoBack}>
                        Einen Schritt zurück
                    </button><br />
                    <button onClick={handleGoForward}>
                        Einen Schritt weiter
                    </button>
                </div>
            )}
            {steps <= 0 && <p>Du hast dein Ziel erreicht ...</p>}
        </div>
    );
};

export default Transit;