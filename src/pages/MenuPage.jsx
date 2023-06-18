import { onValue, ref, child, get } from 'firebase/database';
import { useEffect, useState } from 'react';
import { db } from '../firebase/config.firebase';
import { useCart } from 'react-use-cart';
import { useCallback } from "react";
import useRazorpay from "react-razorpay";
import axios from 'axios';

function MenuPage() {
    const Razorpay = useRazorpay();
    const handlePayment = useCallback(async(pay) => {
        if (pay === 0){
            return alert("add some items to order")
        }
        console.log("pay: ",pay)
        const options = {
            key: "rzp_test_rrdUJXhSJkZ1GS",
            amount: pay * 100,
            currency: "INR",
            name: "Kiosk",
            description: "Test Transaction",
            image: "https://assets.ncr.com/content/ncr/us/en/home/product-catalog/ncr-self-serv-kiosk-xk32/_jcr_content/root/container/container_429310385_/image_copy.coreimg.90.1000.jpeg/1604516530502/ncr-self-serv-kiosk-xk32.jpeg",
            
            handler: async(res) => {
                if (res.razorpay_payment_id) {
                    alert("yep")
                    const body = {
                        items,
                        "total":pay
                    };
                      
                    await fetch('http://localhost:5000/print', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(body),
                    })
                    .then((response) => response.json())
                    .then((data) => {
                      console.log(data);
                      emptyCart()
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });                                                                 
                } else {
                    console.log("failed")
                    alert("Payment failed or canceled.");
                }
                console.log(res);
            },
            prefill: {
                name: "Kiosk",
                email: "Kiosk@mail.com",
                contact: "9090909090",
            },
            notes: {
                address: "Razorpay Corporate Office",
            },
            theme: {
                color: "#3399cc",
            },
        };

        const rzpay = new Razorpay(options);
        rzpay.open();
    }, [Razorpay]);
    const [menu, setMenu] = useState([]);
    const { addItem, items, removeItem, updateItemQuantity, cartTotal, emptyCart } = useCart();

    useEffect(() => {
        const fetchMenu = async () => {
        const dbs = ref(db);
        get(child(dbs, '/menu'))
            .then((res) => {
            const data = Object.entries(res.val());
            setMenu(data);
            })
            .catch((err) => {
            console.log(err);
            });
        };

        fetchMenu();
    }, []);

    const isItemInCart = (itemId) => {
        return items.some((item) => item.id === itemId);
    };

    return (
        <div className={`${menu.length !==0 ? "bg-black" : "h-screen bg-black"}`}>
        <div className="text-white p-4">
            <h1 className="text-center font-bold text-3xl">Food Menu</h1>
            <div className="flex justify-around items-center">
            <div>
                <h1 className="text-center font-bold text-2xl mb-5">Menus</h1>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                {menu.length &&
                    menu.map(([key, value]) => (
                    <div className="flex flex-col justify-center items-center" key={key}>
                        {console.log(value)}
                        <img src={value.image} className="w-48 rounded-xl" alt="menu item" />
                        <h1 className="font-semibold">{value.name}</h1>
                        <div className="flex justify-center items-center w-full p-4">
                        {isItemInCart(key) ? (
                            <button
                            onClick={() => removeItem(key)}
                            className="bg-red-500 py-2 px-4 rounded-full"
                            >
                            Remove
                            </button>
                        ) : (
                            <button
                            onClick={() => {
                                const item = { id: key, ...value, quantity: 1 };
                                addItem(item);
                                console.log("items:", items);
                            }}
                            className="bg-green-500 py-2 px-4 rounded-full"
                            >
                            Add To Cart
                            </button>
                        )}
                        </div>
                        <h1>Price - ₹: {value.price}</h1>
                    </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col justify-around items-center overflow">
                <h1 className="text-center font-bold text-2xl mb-5">Cart</h1>
                {items.length !==0 && <button className='py-3 text-sm mb-10 font-bold hover:translate-x-3 transition-all ease-in-out duration-500 px-6 rounded-2xl bg-red-500 hover:cursor-pointer' onClick={()=>emptyCart()}>Remove All Items</button>}
                <ul id="listCart" className="listCard">
                {items.map((item) => (
                    <li key={item.id} className="mb-5 flex items-center">
                    <div>
                        <img src={item.image} className="w-10 rounded-xl mr-4" alt="cart item" />
                    </div>
                    <div className="flex flex-col">
                        {item.name} - ₹{item.price}
                        <div className="flex justify-around items-center">
                        <button
                            onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity === parseInt(item.quant)}
                            className={`${parseInt(item.quant) === item.quantity && 'cursor-not-allowed text-gray-400'}`}
                        >
                            +
                        </button>
                        {item.quantity}
                        <button
                            onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                        >
                            -
                        </button>
                        </div>
                    </div>
                    </li>
                ))}
                </ul>
                <div>Total: ₹{items.reduce((total, item) => total + item.price * item.quantity, 0)}</div>
                <button
                id="payButton"
                className="py-3 text-xl font-bold hover:translate-x-3 transition-all ease-in-out duration-500 px-14 rounded-2xl bg-green-500 hover:cursor-pointer"
                onClick={()=>handlePayment(cartTotal)}
                >
                Pay
                </button>
            </div>
            </div>
        </div>
    </div>
  );
}

export default MenuPage;