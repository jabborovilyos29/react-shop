import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux'
import { addCart } from './redux/action/action';
import { NavLink } from "react-router-dom";

export default function Products() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  let componentMounted = true;

  const dispatch = useDispatch();
  const addProduct = (product)=>{
      dispatch(addCart(product))
  }


  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const responce = await fetch("https://fakestoreapi.com/products");
      if (componentMounted) {
        setData(await responce.clone().json());
        setFilter(await responce.json());
        setLoading(false);
      }
      return (componentMounted = false);
    };
    getProducts();
  }, []);

  const Loading = () => {
    return (
      <div> 
        <h3>Loading ... </h3>
      </div>
    );
  };

  const filterProduct = (filterKey) =>{
    const newData = data.filter((product)=> product.category === filterKey)
    setFilter(newData)
  }

  const ShowProducts = () => {
    return (
      <>
        <div className="buttons mb-4">
          <button className="btn btn-outline-dark" onClick={()=>setFilter(data)}>All</button>
          <button className="btn btn-outline-dark" onClick={()=>filterProduct("men's clothing")} >Mens shopping</button>
          <button className="btn btn-outline-dark" onClick={()=>filterProduct("women's clothing")}>Womens shopping</button>
          <button className="btn btn-outline-dark" onClick={()=>filterProduct('jewelery')} >Gold shopping</button>
          <button className="btn btn-outline-dark" onClick={()=>filterProduct('electronics')}>Electronic</button>
        </div>
        {filter.map((product) => {
          return (
            <div className="col-md-3 mb-4">
              <div className="card h-100 text-center p-4" key={product.id}>
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.title}
                  height={250}
                />
                <div className="card-body">
                  <h5 className="card-title mb-0">{product.title}</h5>
                  <p className="card-text"> $ {product.price}</p>
                  <NavLink to={`/products/${product.id}`} className="btn btn-outline-dark">
                    About product
                  </NavLink>
                  <button className='btn btn-outline-dark mt-2' onClick={()=>{addProduct(product)}}>
                  Add to card
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="">Products</h2>
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </div>
  );
}
