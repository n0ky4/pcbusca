import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { X } from 'lucide-react'
import type { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'
import { RoundButton } from './../button/RoundButton'

interface ModalProps extends PropsWithChildren {
    show: boolean
    onClose: () => void
    title: string
    description?: string
}

export function Modal({ show, onClose, children, title, description }: ModalProps) {
    return (
        <Dialog open={show} onClose={onClose} className='relative z-50'>
            <DialogBackdrop
                transition
                className='fixed inset-0 bg-slate-950/75 duration-200 ease-out data-[closed]:opacity-0 backdrop-blur-lg'
            />
            <div
                className={twMerge(
                    'fixed top-0 left-0 flex',
                    'w-screen h-screen justify-center p-4 lg:pt-32 pt-16'
                )}
            >
                <DialogPanel
                    transition
                    className={twMerge(
                        'duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0',
                        'max-w-screen-sm h-fit w-full p-8 rounded-lg',
                        'bg-slate-900 border border-slate-800',
                        'flex flex-col gap-4',
                        'shadow-lg'
                    )}
                >
                    <div>
                        <div className='flex items-center w-full justify-between'>
                            <DialogTitle className='font-bold text-3xl'>{title}</DialogTitle>
                            <RoundButton
                                theme='ghost'
                                onClick={onClose}
                                size='sm'
                                className='rounded-lg'
                            >
                                <X size={22} />
                            </RoundButton>
                        </div>
                        {description && (
                            <Description className='text-slate-500 mt-2'>{description}</Description>
                        )}
                    </div>
                    {children}
                </DialogPanel>
            </div>
        </Dialog>
    )
}
