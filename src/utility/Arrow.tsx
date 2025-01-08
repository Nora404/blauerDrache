export const arrowMap: Record<string, string> = {
    n: "&uarr;",
    o: "&rarr;",
    s: "&darr;",
    w: "&larr;",
    no: "&nearr;",
    so: "&searr;",
    nw: "&nwarr;",
    sw: "&swarr;",
};

type ArrowProps = {
    type?: keyof typeof arrowMap;
};

const Arrow: React.FC<ArrowProps> = ({ type }) => {
    const defaultSymbol = "&#x2609;";

    return (
        <span
            className="arrow"
            dangerouslySetInnerHTML={{
                __html: type ? arrowMap[type] : defaultSymbol,
            }}
        />
    );
};

export default Arrow;
