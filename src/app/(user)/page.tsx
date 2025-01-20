import Banner from "@/components/Banner";
import { groq } from "next-sanity";
import { client } from "@/lib/client";
import NewArrival from "@/components/NewArrival";
import HomeBanner from "@/components/HomeBanner";
import BestSellers from "@/components/BestSellers";
import YearProduct from "@/components/YearProduct";

export const revalidate = 10;

const bannerQuery = groq`*[_type == 'banner']{
  image,
  _id
} | order(_createdAt asc)`;

const newArrivalQuery = groq`*[_type == 'product' && position == 'New Arrivals']{
...
} | order(_createdAt asc)`;

const bestSellersQuery = groq`*[_type == 'product' && position == 'bestsellers']{
  ...
 } | order(_createdAt asc)`;
const specialOffersQuery = groq`*[_type == 'product' && position == 'specialoffers']{
  ...
 } | order(_createdAt asc)`;

const HomePage = async () => {
  const banners = await client.fetch(bannerQuery);
  const newArrivalProducts = await client.fetch(newArrivalQuery);
  const bestSellersProducts = await client.fetch(bestSellersQuery);
  const specialOffersProducts = await client.fetch(specialOffersQuery);

  return (
    <main className="text-sm overflow-hidden min-h-screen">
      <Banner banners={banners} />
      <NewArrival products={newArrivalProducts} />
      <HomeBanner />
      <BestSellers products={bestSellersProducts} title="Our Bestsellers" />
      <YearProduct />
      <BestSellers products={specialOffersProducts} title="Special Offers" />
    </main>
  );
};

export default HomePage;
