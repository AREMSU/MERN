import { Link } from "react-router-dom"
import { money } from "../config"

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`} className="product">
      <div className="product-image">
        {product.image ? <img src={product.image} alt={product.name} /> : <span>{product.name.charAt(0)}</span>}
      </div>
      <div className="small muted">{product.category}</div>
      <div className="product-name">{product.name}</div>
      <div>
        {money(product.price)}
        {product.quantity <= 0 && <span className="muted"> (out of stock)</span>}
      </div>
    </Link>
  )
}

export default ProductCard
