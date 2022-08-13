import React, { useContext } from 'react';
import { Link } from "react-router-dom";

//styles
import styles from "./ShopCart.module.css";

//components
import Cart from './shared/Cart';

//Contexts
import { CartContext } from '../contexts/CartContextProvider';
const ShopCart = () => {

    const { state, dispatch } = useContext(CartContext);

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
                        <button className={styles.clear} onClick={() => dispatch({type: "CHECKOUT"})}>Check Out</button>
                        <button className={styles.checkout} onClick={() => dispatch({type: "CLEAR"})}>Clear</button>
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