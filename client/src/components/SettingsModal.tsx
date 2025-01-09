import { SavedSearch, savedSearch } from '@/lib/storage'
import { useMemo, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { Modal } from './Modal'

interface SettingsModalProps {
    show: boolean
    onClose: () => void
    savedSearches: SavedSearch[]
    setSavedSearches: (searches: SavedSearch[]) => void
}

export function SettingsModal({
    show,
    onClose,
    savedSearches,
    setSavedSearches,
}: SettingsModalProps) {
    const [input, setInput] = useState('')

    const canAdd = useMemo(
        () =>
            !savedSearches.some((s) => s.search === input) &&
            input.length >= 3 &&
            savedSearches.length < 5,
        [savedSearches, input]
    )

    const onAdd = () => {
        if (!canAdd) return
        setSavedSearches(savedSearch.add(input))
        setInput('')
    }

    const remove = (search: string) => setSavedSearches(savedSearch.remove(search))

    return (
        <Modal show={show} onClose={onClose} title='Configurações'>
            <div className='flex flex-col gap-2'>
                <div>
                    <h3 className='text-lg font-bold'>Pesquisas salvas</h3>
                    <p className='text-slate-500'>
                        São as pesquisas que ficarão abaixo da barra de pesquisa (
                        {savedSearches.length}/5)
                    </p>
                </div>
                {savedSearches.length > 0 && (
                    <div className='pb-4 pt-2'>
                        {savedSearches.map(({ search, id }) => (
                            <div key={id} className='flex items-center justify-between'>
                                <span>{search}</span>
                                <button
                                    className='text-sm hover:underline'
                                    onClick={() => remove(id)}
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
                    <button
                        className={twMerge(
                            'transition-all ease-out duration-300',
                            'bg-teal-300 text-slate-900 font-medium rounded-md px-2 py-1',
                            'outline-none focus:ring-2',
                            'enabled:hover:bg-teal-500 focus:ring-teal-100',
                            'disabled:opacity-50 disabled:cursor-not-allowed',
                            'select-none'
                        )}
                        onClick={onAdd}
                        disabled={!canAdd}
                        type='submit'
                    >
                        Adicionar
                    </button>
                </form>
            </div>
        </Modal>
    )
}
