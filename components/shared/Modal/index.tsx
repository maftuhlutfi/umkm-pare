import { useRef } from 'react'
import useOnClickOutside from '../../../hooks/useOnClickOutside'

type Props = {
    children: React.ReactNode
    onClose: () => void
    show: boolean
    title: string
}

const Modal = ({ children, onClose, show, title }: Props) => {
    const ref = useRef(null)
    useOnClickOutside(ref, onClose)

    return (
        <div
            className={`min-h-screen w-screen overflow-y-auto bg-gray-900 bg-opacity-70 py-32 ${
                show ? 'block' : 'hidden'
            } fixed inset-0 z-50 items-center justify-center`}
        >
            <div
                ref={ref}
                className="relative mx-auto w-[768px] max-w-[90%] rounded-3xl bg-white p-10 pt-12"
            >
                <div
                    onClick={onClose}
                    className="absolute text-xl cursor-pointer top-8 right-8"
                >
                    &#10006;
                </div>
                <h3 className="mb-8 text-2xl">{title}</h3>
                {children}
            </div>
        </div>
    )
}

export default Modal
