"use client"
import Image from "next/image";
import { FiTrash2, FiTag } from "react-icons/fi";
import wiring from "@/assets/Home/wiring.png";
import { Button } from "@/components/ui/button";
import { P } from "@/components/ui/paragraph";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";
import Link from "next/link";

interface CartItem {
  productId: number;
  sku: string;
  quantity: number;
  price: number;
  discountPrice: number;
  subTotal: number;
  sellerShopName: string;
  sellerId: number;
  productName: string;
  productImage: string;
}

const ShoppingCart = () => {
  const [cartItem, setCartItem] = useState<CartItem[]>([]);
  
  useEffect(() => {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      try {
        const parsedCart: CartItem[] = JSON.parse(cartData);
        console.log("Cart data from localStorage:", parsedCart);
        setCartItem(parsedCart);
      } catch (error) {
        console.error("Error parsing cart data:", error);
      }
    } else {
      console.log("No cart data found in localStorage");
    }
  }, []); 

  const updateCartItemQuantity = (productId: number, sku: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cartItem.map(item => {
      if (item.productId === productId && item.sku === sku) {
        return {
          ...item,
          quantity: newQuantity,
          subTotal: newQuantity * item.price
        };
      }
      return item;
    });
    
    setCartItem(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleIncrement = (productId: number, sku: string) => {
    const item = cartItem.find(item => item.productId === productId && item.sku === sku);
    if (item) {
      updateCartItemQuantity(productId, sku, item.quantity + 1);
    }
  };

  const handleDecrement = (productId: number, sku: string) => {
    const item = cartItem.find(item => item.productId === productId && item.sku === sku);
    if (item) {
      updateCartItemQuantity(productId, sku, item.quantity - 1);
    }
  };

const handleDeleteItem = (productId: number, sku: string) => {
  try {
    const deletedItem = cartItem.find(
      item => item.productId === productId && item.sku === sku
    );

    const updatedCart = cartItem.filter(
      item => !(item.productId === productId && item.sku === sku)
    );
    
    setCartItem(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    if (deletedItem) {
      toast.success(`${deletedItem.productName} removed from cart`);
    } else {
      toast.success("Item removed from cart");
    }
  } catch (error) {
    console.error("Error removing item from cart:", error);
    toast.error("Failed to remove item from cart. Please try again.");
  }
};

  // Calculate order summary values
  const subtotal = cartItem.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  // const totalDiscount = cartItem.reduce((sum, item) => sum + (item.discountPrice * item.quantity), 0);

  const deliveryFee = 0; // Fixed delivery fee
  const total = subtotal ;

  return (
    <div className="mt-16 lg:pt-[40px] max-w-[1280px] mx-auto px-4 mb-10 lg:mb-[136px] ">
      <h2 className="text-[18px] font-medium mb-[51px] text-gray-300  dark:text-white">
        Home / Shop details / Gang Light{" "}
        <span className="text-[#EE5A2C]">/ Cart {cartItem?.length}</span>{" "}
      </h2>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8  dark:text-white">
        {/* Products Table */}
        <div className="flex-1 lg:max-w-[715px] ">
          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:bg-black dark:text-white">
            <table className="min-w-full divide-y divide-gray-200 dark:bg-black dark:text-white">
              <thead className="bg-[#FDEFEA] dark:bg-black dark:text-white">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs md:text-sm font-medium text-gray-700 dark:bg-black dark:text-white">Product</th>
                  <th scope="col dark:bg-black dark:text-white" className="px-4 py-3 text-left text-xs md:text-sm font-medium text-gray-700 dark:bg-black dark:text-white">Price</th>
                  <th scope="col dark:bg-black dark:text-white" className="px-4 py-3 text-left text-xs md:text-sm font-medium text-gray-700 dark:bg-black dark:text-white">Quantity</th>
                  <th scope="col dark:bg-black dark:text-white" className="px-4 py-3 text-left text-xs md:text-sm font-medium text-gray-700 dark:bg-black dark:text-white">Warranty</th>
                  <th scope="col dark:bg-black dark:text-white" className="px-4 py-3 text-left text-xs md:text-sm font-medium text-gray-700 dark:bg-black dark:text-white">Subtotal</th>
                  <th scope="col dark:bg-black dark:text-white" className="px-4 py-3 text-left text-xs md:text-sm font-medium text-gray-700 dark:bg-black dark:text-white">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-black dark:text-white">
                {cartItem.length > 0 ? (
                  cartItem.map((item) => (
                    <tr key={`${item.productId}-${item.sku}`}>
                      <td className="px-4 py-4 whitespace-nowrap dark:bg-black dark:text-white">
                        <div className="flex items-center gap-3 dark:bg-black dark:text-white">
                          <div className="flex-shrink-0 h-12 w-12 border dark:bg-black dark:text-white border-gray-200 rounded-md overflow-hidden">
                            <Image
                              src={item.productImage || wiring}
                              alt={item.productName}
                              className="h-full w-full object-cover"
                              width={60}
                              height={60}
                            />
                          </div>
                          <div>
                            <P className="text-xs md:text-sm font-medium dark:bg-black dark:text-white">{item.productName}</P>
                            <P className="text-xs text-gray-500 dark:bg-black dark:text-white">{item.sku.length > 20 ? `${item.sku.slice(0, 20)}...` : item.sku}</P>
                            <P className="text-xs text-gray-500 dark:bg-black dark:text-white">Seller: {item.sellerShopName}</P>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-primary dark:bg-black dark:text-white">
                        {item.price}Tk
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap dark:bg-black dark:text-white">
                        <div className="flex items-center border border-gray-300 rounded-md w-fit">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="px-2 md:px-3"
                            onClick={() => handleDecrement(item.productId, item.sku)}
                          >
                            -
                          </Button>
                          <span className="px-2 text-sm">{item.quantity}</span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="px-2 md:px-3"
                            onClick={() => handleIncrement(item.productId, item.sku)}
                          >
                            +
                          </Button>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:bg-black dark:text-white">1 Year</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:bg-black dark:text-white">
                        {(item.price * item.quantity).toFixed(2)}Tk
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-destructive hover:bg-destructive/10"
                            >
                              <FiTrash2 className="h-4 w-4 dark:text-red-600" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will remove {item.productName} from your cart.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteItem(item.productId, item.sku)}
                                className="bg-destructive hover:bg-destructive/90"
                              >
                                Remove
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-4 py-4 text-center text-gray-500">
                      Your cart is empty
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:max-w-[400px] xl:max-w-[505px]">
          <div className="border border-gray-200 rounded-xl lg:-mt-2 p-4 md:p-6 space-y-6">
            <h2 className="text-lg md:text-xl font-bold">Order Summary</h2>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500  dark:text-white">Subtotal</span>
                <span className="font-medium">{subtotal.toFixed(2)}Tk</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500  dark:text-white">Discount</span>
                <span className="text-primary">-{0}Tk</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500  dark:text-white">Delivery Fee</span>
                <span className="font-medium">{deliveryFee.toFixed(2)}Tk</span>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between font-bold text-base md:text-lg">
                <span>Total</span>
                <span>{total.toFixed(2)}Tk</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1 dark:bg-black dark:text-white">
                <FiTag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 " />
                <input
                  type="text"
                  placeholder="Add promo code"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-1 focus:ring-primary dark:bg-black dark:text-white"
                />
              </div>
              <Button className="bg-[#EE5A2C] mt-[2px] text-white px-4 py-2 max-w-[126px] max-h-[48px] whitespace-nowrap">
                Apply Code
              </Button>
            </div>

            <Link href={"/checkout"}>
            <Button className="w-full bg-[#EE5A2C] hover:bg-orange-800 hover:text-white text-white py-2 rounded-md">
              Proceed To Pay
            </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;