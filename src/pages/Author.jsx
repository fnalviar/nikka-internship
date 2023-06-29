import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AuthorSkeleton from "../components/UI/AuthorSkeleton";
import AuthorItems from "../components/author/AuthorItems";
import AuthorBanner from "../images/author_banner.jpg";

const Author = () => {
  const [loading, setLoading] = useState(false);
  const [author, setAuthor] = useState();
  const [increaseFollowers, setIncreaseFollowers] = useState();
  const [followed, setFollowed] = useState(false);

  const { authorId } = useParams();

  async function fetchAuthor() {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
      );
      setAuthor(data);
      setIncreaseFollowers(data.followers);
    } finally {
      setLoading(false);
    }
  }

  function followAuthor() {
    setIncreaseFollowers((prev) => prev + 1);
    setFollowed(true);
  }

  useEffect(() => {
    fetchAuthor();
  }, []);

  return (
    <div id="wrapper">
      {loading && <AuthorSkeleton />}

      {!loading && author && (
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>

          <section
            id="profile_banner"
            aria-label="section"
            className="text-light"
            data-bgimage="url(images/author_banner.jpg) top"
            style={{ background: `url(${AuthorBanner}) top` }}
          ></section>

          <section aria-label="section">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img src={author.authorImage} alt="" />

                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {author.authorName}
                            <span className="profile_username">
                              {author.tag}
                            </span>
                            <span id="wallet" className="profile_wallet">
                              {author.address}
                            </span>
                            <button id="btn_copy" title="Copy Text">
                              Copy
                            </button>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      {!followed ? (
                        <div className="de-flex-col">
                          <div className="profile_follower">
                            {increaseFollowers} followers
                          </div>
                          <Link
                            to="#"
                            className="btn-main"
                            onClick={followAuthor}
                          >
                            Follow
                          </Link>
                        </div>
                      ) : (
                        <div className="de-flex-col">
                          <div className="profile_follower">
                            {increaseFollowers} followers
                          </div>
                          <Link to="#" className="btn-main">
                            Followed
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="de_tab tab_simple">
                    <AuthorItems
                      authorNft={author.nftCollection}
                      authorImage={author.authorImage}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default Author;
