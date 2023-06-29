import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactOwlCarousel from "react-owl-carousel";
import { Link } from "react-router-dom";
import HotCollectionsSkeleton from "../UI/HotCollectionsSkeleton";
import AOS from "aos";
import "aos/dist/aos.css";

const HotCollections = () => {
  AOS.init();

  const [loading, setLoading] = useState(false);
  const [hotCollectionList, setHotCollectionList] = useState([]);

  async function fetchHotCollections() {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      );
      setHotCollectionList(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchHotCollections();
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container"
      data-aos="fade-up"
      data-aos-easing="ease"
      data-aos-delay="50">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
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
                <HotCollectionsSkeleton key={index} />
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
              {hotCollectionList.map((collection) => (
                <div key={collection.id}>
                  <div className="nft_coll ">
                    <div className="nft_wrap">
                      <Link to={`/item-details/${collection.nftId}`}>
                        <img
                          src={collection.nftImage}
                          className="lazy img-fluid"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp ">
                      <Link to={`/author/${collection.authorId}`}>
                        <img
                          className="lazy pp-coll"
                          src={collection.authorImage}
                          alt=""
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{collection.title}</h4>
                      </Link>
                      <span>ERC-{collection.code}</span>
                    </div>
                  </div>
                </div>
              ))}
            </ReactOwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
