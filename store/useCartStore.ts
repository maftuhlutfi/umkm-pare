import create, { GetState, SetState, StoreApi } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { CartItem } from '../ts/types/Cart'
import { addItemToCart, removeItemFromCart } from '../utils/cartUtils'

type CartStoreType = {
    cart: CartItem[]
    addToCart: (item: CartItem) => void
    removeItem: (item: CartItem) => void
    clearItem: (id: string) => void
    toggleChecked: (id: string) => void
}

const useCartStore = create<CartStoreType>()(
    devtools(
        persist(
            (set) => ({
                cart: [],
                addToCart: (item) =>
                    set((state) => ({
                        ...state,
                        cart: addItemToCart(state.cart, item),
                    })),
                removeItem: (item) =>
                    set((state) => ({
                        ...state,
                        cart: removeItemFromCart(state.cart, item),
                    })),
                clearItem: (id) =>
                    set((state) => ({
                        ...state,
                        cart: state.cart.filter((item) => item.id !== id),
                    })),
                toggleChecked: (id) =>
                    set((state) => ({
                        ...state,
                        cart: state.cart.map((item) =>
                            item.id === id
                                ? { ...item, isChecked: !item.isChecked }
                                : item
                        ),
                    })),
            }),
            { name: 'cart' }
        )
    )
)

export default useCartStore
