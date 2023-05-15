import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import {deleteItem, deleteProduct, addCart} from '../components/redux/action/action'
import { NavLink } from 'react-router-dom'


const Cart = () => {
    const state = useSelector((state)=> state.handleCart)
    const dispatch = useDispatch()

    const incrementProduct = (item)=>{
        dispatch(addCart(item))
    }

    const decrementProduct = (item)=>{
        dispatch(deleteItem(item))
    }

    const handleClose = (item) => {
        dispatch(deleteProduct(item))
    }

    const cartItems = (cartItem) => {
        return(
            <div className="px-4 my-5 rounded-3" key={cartItem.id}>
                <div className="container py-4">
                    <button onClick={()=>handleClose(cartItem)} className="btn-close float-end" aria-label="Close"></button>
                    <div className="row justify-content-center">
                        <div className="col-md-4">
                            <img src={cartItem.image} alt={cartItem.title} height="200px" width="180px" />
                        </div>
                        <div className="col-md-4">
                            <h3>{cartItem.title}</h3>
                            <p className="lead fw-bold">{cartItem.qty} X ${cartItem.price}</p>
                            $ {cartItem.qty * cartItem.price}
                            <button className='btn btn-outline-dark m-2' onClick={()=>incrementProduct(cartItem)}>+</button>
                            <button className='btn btn-outline-dark m-2' onClick={()=>decrementProduct(cartItem)}>-</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const emptyCart = () => {
        return (
            <div className="px-4 my-5 py-5">
                <div className="container py-4">
                    <div className="row">
                        <h3>Your Cart is Empty</h3>
                    </div>
                    </div>
                </div>
        );
    }

    const button = (evt) => {
    const cnt = evt.reduce((acc, el)=>{return ((el.price * el.qty) + acc)}, 0)
        return(
            <div className="container">
            <div className="row">
             <h4>Overall: $ {cnt} </h4>
                </div>
                <div className="row">
                <NavLink className='btn btn-outline-dark'>
                    Buy
               </NavLink>
                </div>
            </div>
        );
    }

    return (
        <>
            {state.length === 0 && emptyCart()}
            {state.length !== 0 && state.map(cartItems) }
            {state.length !== 0 && button(state)}
        </>
    )
}

export default Cart
