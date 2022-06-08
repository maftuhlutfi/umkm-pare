export type CartItem = {
    id: string
    name: string
    variant?: string
    quantity?: number
    price: number
    picture: { url: string; alt: string }
}
