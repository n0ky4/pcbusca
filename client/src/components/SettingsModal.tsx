import { useSettings } from '@/contexts/settings/SettingsContext'
import { PropsWithChildren, useMemo, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { Button } from './Button'
import { Checkbox } from './Checkbox'
import { Modal } from './Modal'

interface SettingsModalProps {
    show: boolean
    onClose: () => void
}

interface SettingsItemProps extends PropsWithChildren {
    title: string
    description?: string
}

function SettingsItem({ title, description, children }: SettingsItemProps) {
    return (
        <div className='flex flex-col gap-2'>
            <div>
                <h3 className='text-lg font-bold'>{title}</h3>
                {description && <p className='text-slate-500'>{description}</p>}
            </div>
            {children}
        </div>
    )
}

export function SettingsModal({ show, onClose }: SettingsModalProps) {
    const { settings, savedSearch } = useSettings()
    const { savedSearches } = settings

    const [input, setInput] = useState('')

    const canAdd = useMemo(
        () =>
            !savedSearches.some((s) => s.entry === input) &&
            input.length >= 3 &&
            savedSearches.length < 5,
        [savedSearches, input]
    )

    const onAdd = () => {
        if (!canAdd) return
        savedSearch.add(input)
        setInput('')
    }

    const [keepHistory, setKeepHistory] = useState(true)

    return (
        <Modal show={show} onClose={onClose} title='Configurações'>
            <SettingsItem
                title='Pesquisas salvas'
                description={`São as pesquisas que ficarão abaixo da barra de pesquisa (${savedSearches.length}/5)`}
            >
                {savedSearches.length > 0 && (
                    <div className='pb-4 pt-2'>
                        {savedSearches.map(({ entry, id }) => (
                            <div key={id} className='flex items-center justify-between'>
                                <span>{entry}</span>
                                <button
                                    className='text-sm hover:underline'
                                    onClick={() => savedSearch.remove(id)}
                                >
                                    Remover
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                <form
                    className='w-full flex items-center gap-2'
                    onSubmit={(e) => {
                        e.preventDefault()
                        onAdd()
                    }}
                >
                    <input
                        type='text'
                        placeholder='Digite o termo da pesquisa'
                        className={twMerge(
                            'transition-all ease-out',
                            'w-full text-white bg-transparent rounded-md border border-slate-700 px-2 py-1 outline-none',
                            'focus:ring-2 focus:ring-teal-300'
                        )}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button onClick={onAdd} disabled={!canAdd}>
                        Adicionar
                    </Button>
                </form>
            </SettingsItem>
            <SettingsItem title='Histórico'>
                <div className='flex flex-wrap items-center justify-between gap-4'>
                    <Checkbox enabled={keepHistory} setEnabled={setKeepHistory}>
                        Ativar histórico
                    </Checkbox>
                    <Button theme='ghost'>Limpar histórico</Button>
                </div>
            </SettingsItem>
        </Modal>
    )
}
