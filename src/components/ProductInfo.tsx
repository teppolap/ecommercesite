"use client";
import { ProductProps } from "../../type";
import Price from "./Price";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";

interface Props {
  product: ProductProps;
}
const ProductInfo = ({ product }: Props) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleBuyNow = () => {
    if (status === "authenticated") {
      // Redirect to cart page
      router.push("/cart");
    } else {
      // Redirect to sign-in page with callback to cart
      signIn(undefined, { callbackUrl: "/cart" });
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-4xl font-semibold">{product?.title}</h2>
      <div className="flex items-center gap-4">
        <p className="text-lg font-normal text-gray-500 line-through">
          <Price amount={product?.rowprice} />
        </p>

        <Price amount={product?.price} className="text-lg font-bold" />

        <p className="text-sm">
          you saved{" "}
          <Price
            className="bg-green-700 text-white px-2 rounded-md"
            amount={product?.rowprice - product?.price}
          />{" "}
          from this item
        </p>
      </div>
      <p className="text-sm tracking-wide text-gray-600">
        {product?.description}
      </p>
      <p className="text-sm text-gray-500">Be the first to leave a review.</p>
      <button className="w-full py-4 bg-primeColor hover:bg-black duration-300 text-white text-lg rounded-md">
        Add to Cart
      </button>
      <button
        onClick={handleBuyNow}
        className="w-full py-4 bg-primeColor hover:bg-black duration-300 text-white text-lg rounded-md"
      >
        Buy Now
      </button>
      <p className="font-normal text-sm">
        <span className="text-base font-medium">Categories:</span> Spring
        collection, Streetwear, Women Tags: featured SKU: N/A
      </p>
    </div>
  );
};

export default ProductInfo;