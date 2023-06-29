import Skeleton from "./Skeleton";

export default function HotCollectionsSkeleton() {
  return (
    <div>
      <div className="nft_coll">
        <div className="nft_wrap">
          <Skeleton width="100%" height="200px" />
        </div>
        <div className="nft_coll_pp">
          <Skeleton width="50px" height="50px" borderRadius="50%" />
          <i className="fa fa-check"></i>
        </div>
        <div className="nft_coll_info">
          <Skeleton width="100px" height="20px" />
          <br />
          <Skeleton width="60px" height="20px" />
        </div>
      </div>
    </div>
  );
}
