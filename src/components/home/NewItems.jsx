import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactOwlCarousel from "react-owl-carousel";
import ItemsSkeleton from "../UI/ItemsSkeleton";
import NewItemCard from "../UI/NewItemCard";
import AOS from "aos";
import "aos/dist/aos.css";

const NewItems = () => {
  AOS.init();

  const [loading, setLoading] = useState(false);
  const [newItems, setNewItems] = useState([]);

  async function fetchNewItems() {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
      );
      setNewItems(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchNewItems();
  }, []);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container"
      data-aos="fade-up"
      data-aos-easing="ease"
      data-aos-delay="50">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {loading && (
            <ReactOwlCarousel
              className="owl-theme"
              loop
              margin={8}
              nav
              items={4}
              dots={false}
              responsive={{
                0: {
                  items: 1,
                },
                576: {
                  items: 1,
                },
                768: {
                  items: 2,
                },
                992: {
                  items: 3,
                },
                1200: {
                  items: 4,
                },
              }}
            >
              {new Array(4).fill(0).map((_, index) => (
                <div key={index}>
                  <ItemsSkeleton />
                </div>
              ))}
            </ReactOwlCarousel>
          )}

          {!loading && (
            <ReactOwlCarousel
              className="owl-theme"
              loop
              margin={8}
              nav
              items={4}
              dots={false}
              responsive={{
                0: {
                  items: 1,
                },
                576: {
                  items: 1,
                },
                768: {
                  items: 2,
                },
                992: {
                  items: 3,
                },
                1200: {
                  items: 4,
                },
              }}
            >
              {newItems &&
                newItems.map((newNFT) => {
                  return <NewItemCard  key={newNFT.nftId}  nft={newNFT} />;
                })}
            </ReactOwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
