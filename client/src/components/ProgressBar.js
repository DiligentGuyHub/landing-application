
export const ProgressBar = ({ percentage }) => {
    return (
        <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: `${percentage}%` }} />
            <div className="progress-bar-label">{`${percentage.toFixed(0)}%`}</div>
        </div>
    );
};
