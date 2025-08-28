

export default function UserInput({onEdit, userInput}) {
    
    return <section id="user-input"> 
    <div className="input-group">
        <p>
            <label>Initial Investment</label>
            <input type="number" required
            value = {userInput.initialInvestment}
            onChange = { (event) => onEdit("initialInvestment", event.target.value) }
            /> 
        </p>
        <p>
            <label>Annual Investment</label>
            <input type="number" required
            value = {userInput.annualInvestment}
            onChange = { (event) => onEdit("annualInvestment", event.target.value) }
            />
        </p>
    </div>
    <div className="input-group" required>
        <p>
            <label>Expected Return</label>
            <input type="number" required
            value = {userInput.expectedReturn}
            onChange = { (event) => onEdit("expectedReturn", event.target.value) }
            />
        </p>
        <p>
            <label>Duration</label>
            <input type="number" required
            value = {userInput.duration}
            onChange = {(event) => onEdit("duration", event.target.value) }
            />
        </p>
    </div>
    </section>
}