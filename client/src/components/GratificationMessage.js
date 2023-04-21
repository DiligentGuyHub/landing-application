import '../styles/GratificationMessage.css'
import labels from '../labels.json'
export const GratificationMessage = () => {
    return (
        <div className="gratification-message">
            <h1>{labels["gratification-header"]}</h1>
            <p>{labels["gratification-message"]}</p>
        </div>);
}