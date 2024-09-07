import { Component } from "react";
import styles from "./cycle.module.css";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      products: [],
      counter: 0,
      params: {
        limit: 9,
        skip: 0,
      },
    };
    this.prevSkip = 0; // Track the previous skip value
  }

  async componentDidMount() {
    await this.fetchProducts(this.state.params); // Fetch products when component mounts
  }
  

  
  async componentDidUpdate(prevProps, prevState) {
    if (this.state.params.skip !== prevState.params.skip) {
      await this.fetchProducts(this.state.params); // Call fetchProducts when skip changes
    }
  }

  async fetchProducts(params) {
    const { limit = 10, skip = 0 } = params;
    try {
      this.setState({ loading: true });
      const result = await fetch(
        `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
      );
      const data = await result.json();
      this.setState({ products: data.products });
    } catch (error) {
      console.log("error > ", error);
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    return (
      <div class= "background"className={styles.container}>
        <h1 className={styles.heading}>Products</h1>
        <div>
          {this.state.loading ? (
            "loading..."
          ) : (
            <div className={styles.productsContainer}>
              {this.state.products?.map((item, idx) => (
                <div key={idx} className={styles.productsItem}>
                  <img
                    className={styles.productsItemCover}
                    src={item.images?.[0]}
                    alt={`product-cover-${idx}`}
                  />
                  <span>{item.title}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={styles.paginationContainer}>
          <button className="btnTeal"
            type="button"
            onClick={() =>
              this.setState((state) => ({
                ...state,
                params: {
                  ...state.params,
                  skip: Math.max(state.params.skip - 9, 0),
                },
              }))
            }
          >
            Prev
          </button>
          <button className="btnTeal"
            type="button"
            onClick={() =>
              this.setState((state) => ({
                ...state,
                params: {
                  ...state.params,
                  skip: state.params.skip + 9,
                },
              }))
            }
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}


export default Products;
