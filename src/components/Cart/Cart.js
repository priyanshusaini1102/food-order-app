import React, { useContext , useState } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';

const Cart = (props) => {

  const [isCheckout, setIsCheckout] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const orderHandler = () => {
      setIsCheckout(true);
  };

  const hideOrderHandler = () => {
    setIsCheckout(false);
};

const submitOrderHandler = async(userData) => {
  setIsSubmitting(true);
    const response = await fetch('https://react-foods-a9a5d-default-rtdb.firebaseio.com/orders.json', {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items
      })
    });

    if(response.ok){
      setIsSubmitting(false);
      setDidSubmit(true);
      cartCtx.clearCart();
    }
};

const cartModalContent = <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={hideOrderHandler}/>}
      {!isCheckout && <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
      </div>}
      </React.Fragment>;

      const isSubmittingModalContent = (
        <div className={classes.submitting}>
          <div className={classes.spinner}></div>
          <p>Sending Order Data...</p>
        </div>
      );

      const didSubmitModalContent = (
        <React.Fragment>
          <div className={classes.success}>
            <div className={classes.checkmark}>
              <svg viewBox="0 0 52 52">
                <circle className={classes.checkmarkCircle} cx="26" cy="26" r="25" fill="none"/>
                <path className={classes.checkmarkCheck} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
              </svg>
            </div>
            <p className={classes.successMessage}>Order Placed Successfully!</p>
            <p className={classes.successSubtext}>Your delicious meal is on its way!</p>
          </div>
          <div className={classes.actions}>
            <button className={classes.button} onClick={props.onClose}>
              Close
            </button>
          </div>
        </React.Fragment>
      );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit  && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {didSubmit && didSubmitModalContent}

    </Modal>
  );
};

export default Cart;
