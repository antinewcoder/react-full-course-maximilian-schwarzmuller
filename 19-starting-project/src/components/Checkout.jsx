import { useContext } from "react"
import CartContext from '../store/CartContext.jsx'
import Modal from './ui/Modal.jsx'
import UserProgressContext from '../store/UserProgressContext.jsx'
import { currencyFormatter } from '../util/formatting.js'
import Input from './Input.jsx'
import Button from './ui/Button.jsx'
import useHttp from "./hooks/useHttp.js"

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
}

export default function Checkout(){
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    const cartTotal = cartCtx.items.reduce((total, item) => total + item.quantity * item.price, 0);

    const { data, isLoading: isSending, error, sendRequest, clearData } = useHttp('http://localhost:3000/orders', requestConfig);

    function handleCloseCheckout() {
        userProgressCtx.hideCheckout();
    }

    function handleFinish() {
        userProgressCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();

    }


    function handleSubmit(event){
        event.preventDefault();

        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());

        sendRequest(JSON.stringify({
            order:{
                items: cartCtx.items,
                customer: customerData
                
            }
        }));
        
        
    }
    let actions = (
        <>
            <Button type="button" textOnly onClick={handleCloseCheckout}>Close</Button>
            <Button>Submit Order</Button>
        </>
    );
    if (isSending) {
        actions = <span className="center">Sending order...</span>
    }
    if (data && !error){
        return <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleFinish}>
            <h2>Succes!</h2>
            <p>Your order was placed!</p>
            <p className="modal-actions">
                <Button onClick={handleFinish}>Close</Button>
            </p>
            </Modal>
            

    }

    return (
    <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleCloseCheckout}>
        <form onSubmit={handleSubmit}>
            <h2>Checkout</h2>
            <p>Total Amount: {currencyFormatter.format(cartTotal)} </p>
            <Input type="text" label="Full Name" id="full-name"/>
            <Input type="email" label="Email Address" id="email"/>
            <Input type="text" label="Address" id="address"/>
            <div className="control-row">
                <Input label="Postal Code" type="text" id="postal-code"/>
                <Input label="City" type="text" id="city"/>
            </div>
            {error && <Error title="Failed to submit order" message={error}/>}
            <p className="modal-actions">
                {actions}
            </p>
        </form>

    </Modal>
    )
}