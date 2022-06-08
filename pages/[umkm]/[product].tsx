import { createClient } from '../../prismicio'
import React, { useMemo, useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import { ProductsResponse, ProductType } from '../../ts/types/Product'
import productsDataMapper from '../../utils/mapper/productsDataMapper'
import BreadCrumbs from '../../components/shared/BreadCrumbs'
import Image from 'next/image'
import currencyFormatter from '../../utils/currencyFormatter'
import { PrismicRichText } from '@prismicio/react'
import VariantListButton from '../../components/ProductPage/VariantListButton'
import Button from '../../components/shared/Button'
import Link from 'next/link'
import useCartStore from '../../store/useCartStore'

type Props = {
    product: ProductType
}

const ProductPage = ({
    product: {
        name,
        description,
        price,
        variants,
        pictures,
        material,
        umkm,
        id,
    },
}: Props) => {
    const { addToCart } = useCartStore()

    const breadCrumbsLinks = [
        {
            title: 'Beranda',
            href: '/',
        },
        {
            title: 'Produk',
            href: '/products',
        },
        {
            title: name,
            href: `#`,
        },
    ]

    const getMappedVariants = () => {
        if (!variants[0].name) {
            return undefined
        }

        let newVariants: {
            name: string
            variants: { value: string; price: number; isActive: boolean }[]
        }[] = []

        variants.forEach((variant) => {
            const index = newVariants.findIndex(
                (newVariant) => newVariant.name === variant.name
            )
            if (index >= 0) {
                newVariants[index] = {
                    ...newVariants[index],
                    variants: [
                        ...newVariants[index].variants,
                        {
                            value: variant.value,
                            price: variant.price,
                            isActive: false,
                        },
                    ],
                }
            } else {
                newVariants = [
                    ...newVariants,
                    {
                        name: variant.name,
                        variants: [
                            {
                                value: variant.value,
                                price: variant.price,
                                isActive: true,
                            },
                        ],
                    },
                ]
            }
        })

        return newVariants
    }

    const [mappedVariants, setMappedVariants] = useState(getMappedVariants)

    const handleChange = (index: number, name: string) => {
        setMappedVariants((prev) =>
            prev?.map((variant) =>
                variant.name === name
                    ? {
                          ...variant,
                          variants: variant.variants.map((v, i) => ({
                              ...v,
                              isActive: i === index ? true : false,
                          })),
                      }
                    : { ...variant }
            )
        )
    }

    const handleAddToCart = () => {
        const selectedVariant = mappedVariants
            ? mappedVariants[0].variants.find((variant) => variant.isActive)
                  ?.value
            : undefined
        addToCart({
            id: `${id}-${selectedVariant}`,
            name,
            variant: selectedVariant,
            price,
            picture: pictures[0],
        })
    }

    return (
        <MainLayout>
            <BreadCrumbs links={breadCrumbsLinks} />
            <section className="relative flex">
                <div className="sticky top-32 h-fit shrink-0 border-2 border-gray-900">
                    <Image
                        src={pictures[0].url}
                        width={480}
                        height={480}
                        alt={pictures[0].alt}
                        objectFit="cover"
                        objectPosition="center"
                    />
                </div>
                <div className="ml-20 w-full">
                    <h2 className="mb-4 text-[32px] font-semibold">{name}</h2>
                    <h1 className="mb-6 text-4xl">
                        {mappedVariants
                            ? currencyFormatter(
                                  mappedVariants[0].variants.find(
                                      (variant) => variant.isActive
                                  )?.price as number
                              )
                            : currencyFormatter(price)}
                    </h1>
                    <PrismicRichText field={description} />
                    {mappedVariants?.map((variants, index) => (
                        <div className="mt-8" key={index}>
                            <h5 className="mb-4 text-xl font-semibold">
                                {variants.name}
                            </h5>
                            <VariantListButton
                                onChange={(index) =>
                                    handleChange(index, variants.name)
                                }
                                variants={variants.variants}
                            />
                        </div>
                    ))}
                    {material.length !== 0 && (
                        <div className="mt-8">
                            <h5 className="mb-2 text-xl font-semibold">
                                Bahan
                            </h5>
                            <PrismicRichText
                                field={material}
                                components={{
                                    list: ({ children }) => (
                                        <ul className="ml-5 list-disc">
                                            {children}
                                        </ul>
                                    ),
                                }}
                            />
                        </div>
                    )}
                    <div className="mt-8 mb-14 grid w-fit grid-flow-col gap-6">
                        <Button
                            className="py-3 text-base"
                            onClick={handleAddToCart}
                        >
                            + Keranjang
                        </Button>
                        <Button
                            type="outlined"
                            href={`https://wa.me/${umkm.whatsapp}?text=Hai%20${umkm.name}%2C%20saya%20ingin%20bertanya%20tentang%20produk%20${name}.`}
                            className="py-3 text-base"
                            target="_blank"
                        >
                            Tanya Dulu
                        </Button>
                    </div>
                    <div className="mt-10 flex items-center">
                        <Image
                            src={umkm.picture.url}
                            width={48}
                            height={48}
                            className="object-cover object-center"
                            alt={umkm.picture.alt}
                        />
                        <div className="mx-6 w-48">
                            <h3 className="mb-1 text-lg">{umkm.name}</h3>
                            <p className="text-xs line-clamp-1">
                                {umkm.address}
                            </p>
                        </div>
                        <Link href={`/${umkm.uid}`}>
                            <Button
                                type="outlined"
                                className="px-3 py-1.5 text-sm"
                            >
                                Lihat UMKM
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </MainLayout>
    )
}

export default ProductPage

export const getServerSideProps = async ({ previewData, ...context }: any) => {
    const { product: productUID } = context.params
    const client = createClient({ previewData })

    const product = await client.getByUID<ProductsResponse>(
        'product',
        productUID,
        {
            fetchLinks: [
                'category.name',
                'category.uid',
                'umkm.name',
                'umkm.uid',
                'umkm.whatsapp',
                'umkm.address',
                'umkm.picture',
            ],
        }
    )

    return {
        props: {
            product: productsDataMapper.toLocalList([product])[0],
        },
    }
}
