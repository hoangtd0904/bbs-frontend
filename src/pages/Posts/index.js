import Post from "../../components/Post";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import * as postServices from "../../services/postServices.js";
import ReactPaginate from "react-paginate";
import ReactLoading from "react-loading";

import styles from "./Posts.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function Posts() {
  const [loading, setLoading] = useState(true);

  // filter for posts
  const [pageSize, setPageSize] = useState(10);
  const [view, setView] = useState("Classic");
  const [order, setOrder] = useState("desc");

  // states
  const [posts, setPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  // request handlers
  const getAll = async () => {
    const result = await postServices.getAll(currentPage, pageSize, order);
    setPosts(result.content);
    setTotalPosts(result.numberOfElements);
    setPageCount(result.totalPages);
    setLoading(false);
  };

  useEffect(() => {
    getAll();
  }, [currentPage, pageSize, order]);

  function handleChange(page) {
    setCurrentPage(page);
    setTimeout(() => {
      toTop();
    }, 30);
  }

  function changeView(e) {
    setView(e.target.value);
  }

  function changeOrder(e) {
    setOrder(e.target.value);
  }

  function changeSize(e) {
    handleChange(1); // reset to first page
    setPageSize(e.target.value);
    toTop();
  }

  function toTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <>
      {loading ? (
        <div className="position-center">
          <ReactLoading type="bars" color="#4dc89b" />
        </div>
      ) : (
        <>
          <h1 className="text-center">Posts</h1>
          {totalPosts === 0 ? (
            <p className="text-center">
              No post yet :( <br /> Create your own post now!
            </p>
          ) : (
            <>
              {/* filter */}
              <div className={cx("posts-views", "p8", "common-border")}>
                <div className={cx("sort")}>
                  Sort:
                  <div className={cx("sort-options")}>
                    <button
                      className={cx(
                        "pointer",
                        "p8",
                        order === "desc" ? "color-active" : ""
                      )}
                      value="desc"
                      onClick={changeOrder}
                    >
                      Latest
                    </button>
                    <button
                      className={cx(
                        "pointer",
                        "p8",
                        order === "asc" ? "color-active" : ""
                      )}
                      value="asc"
                      onClick={changeOrder}
                    >
                      Oldest
                    </button>
                  </div>
                </div>
                <div className={cx("view")}>
                  View options:
                  <div className={cx("view-options")}>
                    <button
                      value="Classic"
                      className={cx(
                        "pointer",
                        "p8",
                        "text-center",
                        view === "Classic" ? "color-active" : ""
                      )}
                      onClick={changeView}
                    >
                      Classic
                    </button>
                    <button
                      value="Card"
                      className={cx(
                        "pointer",
                        "p8",
                        "text-center",
                        view === "Card" ? "color-active" : ""
                      )}
                      onClick={changeView}
                    >
                      Card
                    </button>
                  </div>
                </div>
              </div>
              {/* posts */}
              {posts.map((post, index) => (
                // <div  className="mb-12">
                <Link
                  key={index}
                  to={`/posts/detail/${post.id}`}
                  className="link-none"
                >
                  <Post post={post} css={view} />
                </Link>
                // </div>
              ))}
              {/* pagination and page size */}
              <div className={cx("p8", "flex-center")}>
                <ReactPaginate
                  breakLabel="..."
                  nextLabel=">"
                  onPageChange={(e) => handleChange(e.selected + 1)}
                  forcePage={currentPage - 1}
                  pageRangeDisplayed={3}
                  marginPagesDisplayed={2}
                  pageCount={pageCount}
                  previousLabel="<"
                  //classes
                  breakClassName="pagination-btn text-center pointer common-border"
                  breakLinkClassName="pagination-link"
                  containerClassName="pagination-container flex-center"
                  activeClassName="active-border"
                  pageClassName="pagination-btn text-center pointer common-border"
                  previousClassName="pagination-btn text-center pointer common-border"
                  nextClassName="pagination-btn text-center pointer common-border"
                  pageLinkClassName="pagination-link"
                  previousLinkClassName="pagination-link"
                  nextLinkClassName="pagination-link"
                  disabledClassName="pagination-btn__disabled"
                />
                <div className={cx("pagesize")}>
                  <select
                    name="size"
                    id="size"
                    className={cx("common-border")}
                    onChange={changeSize}
                    value={pageSize}
                  >
                    <option value="1">1</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                  </select>
                </div>
              </div>
            </>
          )}
          <div className={cx("create-btn")}>
            <button
              className={cx("pointer")}
              onClick={() => {
                navigate("/posts/add");
              }}
            >
              +
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default Posts;
