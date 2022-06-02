const currencyFormatter = (price: number): string => {
    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
    })

    return formatter.format(price)
}

export default currencyFormatter
