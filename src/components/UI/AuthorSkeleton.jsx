import AuthorBanner from "../../images/author_banner.jpg"
import Skeleton from "./Skeleton";
import ItemsSkeleton from "./ItemsSkeleton"

export default function AuthorSkeleton() {
  return (
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
                    <Skeleton width="150px" height="150px" borderRadius="50%" />

                    <i className="fa fa-check"></i>
                    <div className="profile_name">
                      <h4>
                        <Skeleton width="200px" />

                        <span className="profile_username">
                          <Skeleton width="100px" />
                        </span>
                        <span id="wallet" className="profile_wallet">
                          <Skeleton width="250px" />
                        </span>
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="profile_follow de-flex">
                  <div className="de-flex-col">
                    <div className="profile_follower"></div>
                    <Skeleton width="150px" height="40px" />
                  </div>
                </div>
              </div>
            </div>
            {new Array(8).fill(0).map((_, index) => (
              <div key={index} className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                <ItemsSkeleton />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
