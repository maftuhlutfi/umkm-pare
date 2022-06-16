import { PrismicRichText } from '@prismicio/react'
import Image from 'next/image'
import React, { useState } from 'react'
import { UmkmType } from '../../../ts/types/Umkm'
import Button from '../../shared/Button'
import Modal from '../../shared/Modal'

type Props = {
    umkm: UmkmType
}

const UmkmInformation = ({
    umkm: {
        picture,
        name,
        address,
        description,
        whatsapp,
        instagram,
        facebook,
        email,
    },
}: Props) => {
    const [infoModalOpen, setInfoModalOpen] = useState(false)

    return (
        <>
            <section className="flex flex-col items-center justify-between p-5 border border-gray-900 lg:flex-row">
                <div className="flex items-center mb-8 lg:mb-0">
                    <Image
                        src={picture.url}
                        width={80}
                        height={80}
                        objectFit="cover"
                        objectPosition="center"
                    />
                    <div className="ml-5 w-96">
                        <h3 className="mb-1.5 text-xl font-semibold">{name}</h3>
                        <p className="text-sm">{address}</p>
                    </div>
                </div>
                <div className="grid items-center w-full grid-cols-2 gap-4 lg:flex lg:w-fit">
                    <Button
                        href={`https://wa.me/${whatsapp}`}
                        target="_blank"
                        className="px-5 py-3 mr-5 text-base"
                        full
                    >
                        Hubungi
                    </Button>
                    <Button
                        type="outlined"
                        className="px-5 py-3 text-base whitespace-nowrap"
                        onClick={() => setInfoModalOpen(true)}
                        full
                    >
                        Info Toko
                    </Button>
                </div>
            </section>
            <Modal
                title="Info Toko"
                show={infoModalOpen}
                onClose={() => setInfoModalOpen(false)}
            >
                <section className="grid gap-8 lg:grid-flow-col lg:gap-20">
                    <div className="flex-1">
                        <h3 className="mb-2">Deskripsi</h3>
                        <PrismicRichText field={description} />
                    </div>
                    <div className="shrink-0">
                        <h3 className="mb-2">Social Media</h3>
                        <div className="grid grid-flow-col gap-4">
                            {email && (
                                <a href={`mailto:${email}`} target="_blank">
                                    <Image
                                        src="/icons/email-black.svg"
                                        width={32}
                                        height={32}
                                    />
                                </a>
                            )}
                            {facebook && (
                                <a href={facebook} target="_blank">
                                    <Image
                                        src="/icons/facebook-black.svg"
                                        width={32}
                                        height={32}
                                    />
                                </a>
                            )}
                            {instagram && (
                                <a href={instagram} target="_blank">
                                    <Image
                                        src="/icons/instagram-black.svg"
                                        width={32}
                                        height={32}
                                    />
                                </a>
                            )}
                            {!email && !facebook && !instagram && (
                                <p>Belum ada social media</p>
                            )}
                        </div>
                    </div>
                </section>
            </Modal>
        </>
    )
}

export default UmkmInformation
