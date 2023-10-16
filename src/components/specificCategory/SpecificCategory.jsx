import axios from 'axios';
import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { ClimbingBoxLoader } from 'react-spinners';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';

export default function SpecificCategory() {
let {slug} = useParams();


function getSpecificCategory() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
}
let {isLoading  , data} = useQuery(`specificCategory` ,()=> getSpecificCategory() );
console.log(data?.data.data[5]?.category.slug)

let {addToCart} =useContext(CartContext)
async function addProduct(id) {

let {data} = await addToCart(id);
    if (data.status === "success") {
    toast.success("Product successfully added to cart");
    } else {
    toast.error("Failed to add product to the cart");
    }
        
    }
    return (
        <div className="my-5">
            {isLoading ? (
                <div className="d-flex h-100 py-5 w-100 justify-content-center align-items-center">
                <ClimbingBoxLoader
                    height={100}
                    width={100}
                    radius={5}
                    color="#4fa94d"
                    ariaLabel="ball-triangle-loading"
                    wrapperClass={{}}
                    wrapperStyle=""
                    visible={true}
                />
                </div>
            ) : (
                <div className="row gy-3">
                {data?.data.data
                    .filter((product) => product.category.slug === slug)
                    .map((product) => (
                    <div key={product.id} className="col-md-2">
                        <div className="product cursor-pointer py-3 px-2">
                        <Link to={`/product/${product.id}`}>
                            <img
                            className="w-100"
                            src={product.imageCover}
                            alt={product.title}
                            />
                            <span className="text-main font-sm fw-bolder">
                            {product.category.name}
                            </span>
                            <h3 className="h6">
                            {product.title.split(" ").slice(0, 2).join(" ")}
                            </h3>
                            <div className="d-flex justify-content-between mt-3">
                            <span>{product.price} EGP</span>
                            <span>
                                <i className="fas fa-star rating-color"></i>{" "}
                                {product.ratingsAverage}
                            </span>
                            </div>
                        </Link>
                        <button
                            onClick={() => addProduct(product.id)}
                            className="w-100 btn btn-sm bg-main text-white mt-2"
                        >
                            {" "}
                            Add to Cart
                        </button>
                        </div>
                    </div>
                    ))}
        
                {data?.data.data.filter((product) => product.category.slug === slug)
                    .length === 0 && (
                    <div className="text-center mt-3">
                    <h4 className="text-justify text-main fw-bolder">No products available in this category</h4>
                    </div>
                )}
                </div>
            )}
            </div>
        );
    }