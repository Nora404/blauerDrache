import React from 'react';
import MultiColoredLetters from '../../utility/Formatted/MultiColoredLetters';
import { blueColors, darkBlueColors, greenColors, orangeColors, redColors, yellowColors } from '../../data/helper/colorMappingData';
import { GradientText } from '../../utility/Formatted/GradientText';
import { parseDescription } from '../../utility/Helper/ParseTextToJSX';
import { SYSTEM } from '../../data/helper/colorfullStrings';
import Talk from '../../utility/Formatted/Talk';

type ActionButtonProps = {
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    label: string;
    disable?: boolean;
    color?: string[];
    result?: string;
};

const ActionButton: React.FC<ActionButtonProps> = ({
    onClick,
    label,
    disable,
    color = blueColors,
    result }) => {

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(e);
    }

    return (
        <button className="btn-border" onClick={handleClick} disabled={disable} >
            {disable
                ? <GradientText colors={['#999999']}>{label}</GradientText>
                : <MultiColoredLetters colors={color}>{label}</MultiColoredLetters>}
            {result && <span className='text-blue-dark font-small'>{' '}({parseDescription(result)})</span>}
        </button>
    );
};

export default ActionButton;

type DefaultButtonsProps = {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disable?: boolean;
    result?: number;
    active?: boolean;
};

//#region [BUY]
export const BuyButton: React.FC<DefaultButtonsProps> = ({ onClick, disable, result }) => {
    const [showSuccess, setShowSuccess] = React.useState(false);
    const originalLabel = "Kaufen";
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!disable) {
            setShowSuccess(true);
            onClick(e);
            setTimeout(() => setShowSuccess(false), 1000);
        }
    };

    const displayLabel = showSuccess ? "Erfolg" : originalLabel;
    const displayColor = showSuccess ? greenColors : yellowColors;
    const resultText = result && !showSuccess ? `{Talk|rot}${-result}{/Talk} {SYSTEM.Gold}` : '';

    return <ActionButton onClick={handleClick} label={displayLabel} disable={disable} color={displayColor} result={resultText} />;
}

export const SmallBuyButton: React.FC<DefaultButtonsProps> = ({ onClick, disable, result = 0 }) => {
    const [showSuccess, setShowSuccess] = React.useState(false);

    const resultLabel = <><Talk color='rot'>{-result}</Talk> {SYSTEM.Gold}</>
    const originalLabel = <><MultiColoredLetters colors={blueColors}>Kaufen:</MultiColoredLetters> {resultLabel}</>;
    const disableLabel = <><Talk color='gray'>Zu teuer: {-result} Gold</Talk></>;
    const displayLabel = showSuccess ? <Talk color='grün'>Erfolg</Talk> : originalLabel;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!disable) {
            setShowSuccess(true);
            onClick(e);
            setTimeout(() => setShowSuccess(false), 1000);
        }
    };
    return (<button className='btn-small-right' onClick={handleClick} disabled={disable}>
        {disable ? disableLabel : displayLabel}</button>);
}
//#endregion

//#region [SWAP]
export const SwapButton: React.FC<DefaultButtonsProps> = ({ onClick, disable, result }) => {
    const [showSuccess, setShowSuccess] = React.useState(false);
    const originalLabel = "Tauschen";

    console.log(result);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!disable) {
            setShowSuccess(true);
            onClick(e);
            setTimeout(() => setShowSuccess(false), 1000);
        }
    };

    const displayLabel = showSuccess ? "Erfolg" : originalLabel;
    const displayColor = showSuccess ? greenColors : orangeColors;
    const resultText = result && !showSuccess
        ? (result > 0
            ? `{Talk|rot}${-result}{/Talk}`
            : `{Talk|grün}+${-result}{/Talk}`)
        + " {SYSTEM.Gold}"
        : '';

    return <ActionButton onClick={handleClick} label={displayLabel} disable={disable} color={displayColor} result={resultText} />;
};

export const SmallSwapButton: React.FC<DefaultButtonsProps> = ({ onClick, disable, result = 0 }) => {
    const [showSuccess, setShowSuccess] = React.useState(false);

    const textColor = result > 0 ? <Talk color='rot'>{-result}</Talk> : <Talk color='grün'>+{-result}</Talk>;
    const resultLabel = <>{textColor} {SYSTEM.Gold}</>
    const originalLabel = <><MultiColoredLetters colors={blueColors}>Tauschen</MultiColoredLetters>: {resultLabel}</>;
    const disableLabel = <><Talk color='gray'>Kein Tausch: {-result} Gold</Talk></>;
    const displayLabel = showSuccess ? <Talk color='grün'>Erfolg</Talk> : originalLabel;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!disable) {
            setShowSuccess(true);
            onClick(e);
            setTimeout(() => setShowSuccess(false), 1000);
        }
    };


    return (<button className='btn-small-right' onClick={handleClick} disabled={disable}>
        {disable ? disableLabel : displayLabel}</button>);
}
//#endregion

//#region [SELL]
export const SellButton: React.FC<DefaultButtonsProps> = ({ onClick, disable }) => {
    const [showSuccess, setShowSuccess] = React.useState(false);
    const originalLabel = "Verkaufen";

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!disable) {
            setShowSuccess(true);
            onClick(e);
            setTimeout(() => setShowSuccess(false), 1000);
        }
    };

    const displayLabel = showSuccess ? "Erfolg" : originalLabel;
    const displayColor = showSuccess ? greenColors : blueColors;

    return <ActionButton onClick={handleClick} label={displayLabel} disable={disable} color={displayColor} />;
};

export const SmallSellButton: React.FC<DefaultButtonsProps> = ({ onClick, result = 0 }) => {
    const [showSuccess, setShowSuccess] = React.useState(false);

    const resultLabel = <><Talk color='grün'>+{result}</Talk> {SYSTEM.Gold}</>
    const originalLabel = <><MultiColoredLetters colors={blueColors}>Verkaufen</MultiColoredLetters>: {resultLabel}</>;
    const displayLabel = showSuccess ? <Talk color='grün'>Erfolg</Talk> : originalLabel;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        setShowSuccess(true);
        onClick(e);
        setTimeout(() => setShowSuccess(false), 1000);
    }

    return <button className='btn-small-right' onClick={handleClick}>{displayLabel}</button>;
};
//#endregion

//#region [EQUIP]
export const EquipButton: React.FC<DefaultButtonsProps> = ({ onClick, disable }) => {
    const [showSuccess, setShowSuccess] = React.useState(false);
    const originalLabel = "Ausrüsten";

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!disable) {
            setShowSuccess(true);
            onClick(e);
            setTimeout(() => setShowSuccess(false), 1000);
        }
    };

    const displayLabel = showSuccess ? "Jawohl!" : originalLabel;
    const displayColor = greenColors;

    return <ActionButton onClick={handleClick} label={displayLabel} disable={disable} color={displayColor} />;
};
export const SmallEquipButton: React.FC<DefaultButtonsProps> = ({ onClick, disable, active }) => {
    const [showSuccess, setShowSuccess] = React.useState(false);
    const originalLabel = "Ausrüsten";

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!disable) {
            setShowSuccess(true);
            onClick(e);
            setTimeout(() => setShowSuccess(false), 1000);
        }
    };

    const displayLabel = showSuccess ? "Jawohl!" : originalLabel;
    const displayColor = active ? greenColors : darkBlueColors;

    return <button className={`btn-small ${active ? '' : ''}`} onClick={handleClick} disabled={disable}>
        <MultiColoredLetters colors={displayColor}>{displayLabel}</MultiColoredLetters>
    </button>;
}
//#endregion

//#region [USE]
export const UseButton: React.FC<DefaultButtonsProps> = ({ onClick, disable }) => {
    const [showSuccess, setShowSuccess] = React.useState(false);
    const originalLabel = "Benutzen";

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!disable) {
            setShowSuccess(true);
            onClick(e);
            setTimeout(() => setShowSuccess(false), 1000);
        }
    };

    const displayLabel = showSuccess ? "Hab ich!" : originalLabel;
    const displayColor = greenColors;

    return <ActionButton onClick={handleClick} label={displayLabel} disable={disable} color={displayColor} />;
};
export const SmallUseButton: React.FC<DefaultButtonsProps> = ({ onClick, disable, active }) => {
    const [showSuccess, setShowSuccess] = React.useState(false);
    const originalLabel = "Benutzen";

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!disable) {
            setShowSuccess(true);
            onClick(e);
            setTimeout(() => setShowSuccess(false), 1000);
        }
    };

    const displayLabel = showSuccess ? "Hab ich!" : originalLabel;
    const displayColor = active ? greenColors : darkBlueColors;

    return <button className='btn-small' onClick={handleClick} disabled={disable}>
        <MultiColoredLetters colors={displayColor}>{displayLabel}</MultiColoredLetters>
    </button>;
}
//#endregion

//#region [DROP]
export const DropButton: React.FC<DefaultButtonsProps> = ({ onClick, disable }) => {
    const [showSuccess, setShowSuccess] = React.useState(false);
    const originalLabel = "Ablegen";

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!disable) {
            setShowSuccess(true);
            onClick(e);
            setTimeout(() => setShowSuccess(false), 1000);
        }
    };

    const displayLabel = showSuccess ? "Ok!" : originalLabel;
    const displayColor = showSuccess ? greenColors : yellowColors;

    return <ActionButton onClick={handleClick} label={displayLabel} disable={disable} color={displayColor} />;
};
export const SmallDropButton: React.FC<DefaultButtonsProps> = ({ onClick, disable, active }) => {
    const [showSuccess, setShowSuccess] = React.useState(false);
    const originalLabel = "Ablegen";

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!disable) {
            setShowSuccess(true);
            onClick(e);
            setTimeout(() => setShowSuccess(false), 1000);
        }
    };

    const displayLabel = showSuccess ? "Ok!" : originalLabel;
    const displayColor = active ? yellowColors : darkBlueColors;

    return <button className='btn-small' onClick={handleClick} disabled={disable}>
        <MultiColoredLetters colors={displayColor}>{displayLabel}</MultiColoredLetters>
    </button>;
}
//#endregion

//#region [REMOVE]
export const RemoveButton: React.FC<DefaultButtonsProps> = ({ onClick, disable }) => {
    const [showSuccess, setShowSuccess] = React.useState(false);
    const originalLabel = "Wegwerfen";

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!disable) {
            setShowSuccess(true);
            onClick(e);
            setTimeout(() => setShowSuccess(false), 1000);
        }
    };

    const displayLabel = showSuccess ? "Ist weg!" : originalLabel;
    const displayColor = showSuccess ? greenColors : redColors;

    return <ActionButton onClick={handleClick} label={displayLabel} disable={disable} color={displayColor} />;
};
export const SmallRemoveButton: React.FC<DefaultButtonsProps> = ({ onClick, disable, active }) => {
    const [showSuccess, setShowSuccess] = React.useState(false);
    const originalLabel = "Wegwerfen";

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!disable) {
            setShowSuccess(true);
            onClick(e);
            setTimeout(() => setShowSuccess(false), 1000);
        }
    };

    const displayLabel = showSuccess ? "Ist weg!" : originalLabel;
    const displayColor = active ? redColors : darkBlueColors;

    return <button className='btn-small' onClick={handleClick} disabled={disable}>
        <MultiColoredLetters colors={displayColor}>{displayLabel}</MultiColoredLetters>
    </button>;
}
//#endregion

export const SmallScanButton: React.FC<DefaultButtonsProps> = ({ onClick, disable, active }) => {
    const [showSuccess, setShowSuccess] = React.useState(false);
    const originalLabel = "Untersuchen";

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!disable) {
            setShowSuccess(true);
            onClick(e);
            setTimeout(() => setShowSuccess(false), 1000);
        }
    };

    const displayLabel = showSuccess ? "Aha!" : originalLabel;
    const displayColor = active ? blueColors : darkBlueColors;

    return <button className='btn-small' onClick={handleClick} disabled={disable}>
        <MultiColoredLetters colors={displayColor}>{displayLabel}</MultiColoredLetters>
    </button>;
}
export const SmallBackButton: React.FC<DefaultButtonsProps> = ({ onClick, disable, active }) => {
    const [showSuccess, setShowSuccess] = React.useState(false);
    const originalLabel = "Buttons";

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!disable) {
            setShowSuccess(true);
            onClick(e);
            setTimeout(() => setShowSuccess(false), 1000);
        }
    };

    const displayLabel = showSuccess ? "Tschüs!" : originalLabel;
    const displayColor = active ? blueColors : darkBlueColors;

    return <button className='btn-small' onClick={handleClick} disabled={disable}>
        <MultiColoredLetters colors={displayColor}>{displayLabel}</MultiColoredLetters>
    </button>;
}