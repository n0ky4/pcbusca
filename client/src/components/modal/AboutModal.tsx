'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '../button/Button'
import { BaseModalProps, Modal } from './Modal'

function DumbLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <a
            href={href}
            target='_blank'
            rel='noopener noreferrer'
            className='underline hover:text-white transition-colors ease-out'
        >
            {children}
        </a>
    )
}

const ID = 'sans'

export function AboutModal({ show, onClose }: BaseModalProps) {
    const [crazyMode, setCrazyMode] = useState(false)
    const audioRef = useRef<HTMLAudioElement | null>(null)

    useEffect(() => {
        if (audioRef.current) return
        audioRef.current = new Audio('/audio.mp3')
    }, [])

    const crazy = () => {
        if (!audioRef.current || crazyMode) return

        setCrazyMode(true)

        audioRef.current.pause()
        audioRef.current.volume = 0.2
        audioRef.current.currentTime = 0
        audioRef.current.play()

        const el = document.getElementById(ID)
        if (!el) return

        const maxX = window.innerWidth - el.clientWidth
        const maxY = window.innerHeight - el.clientHeight

        // dvd bounce
        el.style.position = 'fixed'

        let move = true

        let x: number = Math.floor(Math.random() * maxX)
        let y: number = Math.floor(Math.random() * maxY)

        const vel = 10
        const updatePos = () => {
            el.style.left = `${x}px`
            el.style.top = `${y}px`
        }

        let xDir = 1
        let yDir = 1

        const frame = () => {
            x += vel * xDir
            y += vel * yDir

            if (x >= maxX || x <= 0) xDir *= -1
            if (y >= maxY || y <= 0) yDir *= -1

            updatePos()
            if (move) requestAnimationFrame(frame)
        }
        requestAnimationFrame(frame)

        setTimeout(() => {
            setCrazyMode(false)
            move = false
        }, 10_000)
    }

    return (
        <Modal show={show} onClose={onClose} title='pcbusca — sobre' customId={ID}>
            <div className='flex flex-col gap-4'>
                <div className='flex items-start gap-4 '>
                    <div
                        className='min-w-16 min-h-16 rounded-xl bg-cover bg-center bg-no-repeat'
                        style={{
                            backgroundImage:
                                'url("https://avatars.githubusercontent.com/u/19615514")',
                        }}
                    />
                    <div>
                        <h2 className='text-3xl'>ฅ^•ﻌ•^ฅ</h2>
                        <div className='flex flex-col gap-4'>
                            <p className='text-slate-400'>
                                oi, eu criei esse projeto :) meu github{' '}
                                <DumbLink href='https://github.com/n0ky4'>
                                    é esse aqui óó, clica aqui
                                </DumbLink>
                                . esse projeto é open source, então se você quiser ver o código, tá{' '}
                                <DumbLink href='https://github.com/n0ky4/pcbusca'>
                                    bem aqui óó clica bem aqui tá!!!!!!
                                </DumbLink>{' '}
                                TA BOM TCHAU!!!!!!
                            </p>
                            <div>
                                <Button onClick={crazy}>botao</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
