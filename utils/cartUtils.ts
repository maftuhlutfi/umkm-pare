import { CartItem } from '../ts/types/Cart'

export const addItemToCart = (state: CartItem[], itemToAdd: CartItem) => {
    const exists = state.find((item) => item.id === itemToAdd.id)

    if (exists) {
        return state.map((cartItem) => {
            return cartItem.id === itemToAdd.id
                ? { ...cartItem, quantity: (cartItem.quantity as number) + 1 }
                : cartItem
        })
    } else {
        return [...state, { ...itemToAdd, quantity: 1 }]
    }
}

export const removeItemFromCart = (
    state: CartItem[],
    itemToRemove: CartItem
) => {
    const exists = state.find((item) => item.id === itemToRemove.id)

    if (exists?.quantity === 1) {
        return state.filter((cartItem) => cartItem.id !== itemToRemove.id)
    }

    return state.map((cartItem) =>
        cartItem.id === itemToRemove.id
            ? { ...cartItem, quantity: (cartItem?.quantity as number) - 1 }
            : cartItem
    )
}

export const cartItemsCount = (cart: CartItem[]): number => {
    return cart.reduce(
        (total, cartItem) =>
            cartItem.quantity ? total + cartItem?.quantity : total,
        0
    )
}
