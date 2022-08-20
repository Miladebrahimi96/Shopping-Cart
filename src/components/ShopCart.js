import React from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux/es/exports';

//styles
import styles from "./ShopCart.module.css";

//components
import Cart from './shared/Cart';

//ACTIONS
import { checkout, clear } from '../redux/cart/cartAction';

const ShopCart = () => {

    const state = useSelector(state => state.cartState);
    const dispatch = useDispatch();

    return (
        <div className={styles.container}>
            <div className={styles.cartContainer}>
                {state.selectedItems.map(item => <Cart key={item.id} data={item}/>)}
            </div>
            {
                state.itemsCounter > 0 && <div className={styles.payments}>
                    <p><span>Total Items:</span> {state.itemsCounter}</p>
                    <p><span>Total Payment:</span> {state.total} $</p>
                    <div className={styles.buttonContainer}>
                        <button className={styles.clear} onClick={() => dispatch(checkout())}>Check Out</button>
                        <button className={styles.checkout} onClick={() => dispatch(clear())}>Clear</button>
                    </div>
                 </div>
            }
            {
                !state.checkout && state.itemsCounter === 0 && <div className={styles.complete}>
                    <h3>Want to Buy?</h3>
                    <Link to="/products">Go to Shop</Link>
                </div>
            }
            {
                state.checkout && <div className={styles.complete}>
                    <h3>Checked Out Successfully</h3>
                    <Link to="/products">Buy More</Link>
                </div>
            }
        </div>
    );
};

export default ShopCart;