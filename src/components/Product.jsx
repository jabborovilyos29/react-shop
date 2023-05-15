import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { addCart } from './redux/action/action';
import { NavLink, useParams } from 'react-router-dom'

export default function Product() {

    const {id} = useParams();
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const addProduct = (product)=>{
        dispatch(addCart(product))
    }

    useEffect(()=>{
        const getProduct = async () =>{
            setLoading(true);
            const responce = await fetch(`https://fakestoreapi.com/products/${id}`);
            setProduct(await responce.json());
            setLoading(false)
        }
        getProduct();
    }, []);

    const Loading = () => {
        return (
          <div> 
            <h3>Loading ... </h3>
          </div>
        );
      };
    
      const ShowProduct = () => {
        return (
          <div> 
            <div className='col-md-6'>
            <img src={product.image}  alt={product.title} height={350} width={350}/>
            </div>
            <div className='col-md-6'>
                <h4 className='text-uppercase text-black-50'>
                {product.category}
                </h4>
                <h1 className='display-5'>
                {product.title}
                </h1>
                <p className='lead'>Rating: {product.rating && product.rating.rate}</p>
                <h3 className='display-6'>$ {product.price} </h3>
                <p className='lead'>{product.description}</p>
                <button className='btn btn-outline-dark m-5' onClick={()=>{addProduct(product)}}>
                Add to card
                </button>
                <NavLink to='/cart' className='btn btn-outline-dark m-5'>
                Go to card
                </NavLink>
            </div>
          </div>
        );
      };


  return (
    <div>
        <div className='container py-5'>
        <div className='row py-4'>
        {loading ? <Loading /> : <ShowProduct />}
        </div>
        </div>      
    </div>
  )
}
