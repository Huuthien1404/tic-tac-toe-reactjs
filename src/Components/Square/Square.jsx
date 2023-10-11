import "./square.css"
const Square = ({ handleClick, value }) => {
    return (
        <>
            <div className="square-container" onClick={handleClick}>
                {value}
            </div>
        </>
    );
}

export default Square;
