/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react"

const CartContext = createContext(null)
export const useCart = () => useContext(CartContext)

const loadCart = () => {
  try {
    return JSON.parse(localStorage.getItem("cart")) || []
  } catch {
    return []
  }
}

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(loadCart)

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items))
  }, [items])

  // only the bits needed to show the cart are stored. the server checks price and stock again at checkout
  const add = (product, qty = 1) => {
    setItems((prev) => {
      const found = prev.find((i) => i._id === product._id)
      if (found) {
        return prev.map((i) =>
          i._id === product._id ? { ...i, stock: product.quantity, qty: Math.min(i.qty + qty, product.quantity) } : i
        )
      }
      return [
        ...prev,
        {
          _id: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          stock: product.quantity,
          qty: Math.min(qty, product.quantity),
        },
      ]
    })
  }

  const setQty = (id, qty) => {
    setItems((prev) =>
      prev.map((i) => (i._id === id ? { ...i, qty: Math.max(1, Math.min(qty || 1, i.stock)) } : i))
    )
  }

  const remove = (id) => setItems((prev) => prev.filter((i) => i._id !== id))
  const clear = () => setItems([])

  const count = items.reduce((sum, i) => sum + i.qty, 0)
  const total = items.reduce((sum, i) => sum + i.qty * i.price, 0)

  return (
    <CartContext.Provider value={{ items, add, setQty, remove, clear, count, total }}>
      {children}
    </CartContext.Provider>
  )
}
