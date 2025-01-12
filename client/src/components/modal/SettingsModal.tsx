import { useSettings } from '@/contexts/settings/SettingsContext'
import { getStoreLabel } from '@/lib/common'
import { PropsWithChildren, useMemo, useState } from 'react'
import { ALL_STORES, Store, storeSchema } from 'shared'
import { twMerge } from 'tailwind-merge'
import { Checkbox } from '../Checkbox'
import { SettingsInput } from '../SettingsInput'
import { t } from '../Toaster'
import { Button } from './../button/Button'
import { ClearHistoryButton } from './../button/ClearHistoryButton'
import { BaseModalProps, Modal } from './Modal'

interface SettingsItemProps extends PropsWithChildren {
    title: string
    description?: string
}

function SettingsItem({ title, description, children }: SettingsItemProps) {
    return (
        <div className='flex flex-col gap-2'>
            <div>
                <h3 className='text-lg font-bold'>{title}</h3>
                {description && (
                    <p className='text-slate-500 md:text-base text-sm'>{description}</p>
                )}
            </div>
            {children}
        </div>
    )
}

export function SettingsModal({ show, onClose }: BaseModalProps) {
    const { settings, setSettings, savedSearch } = useSettings()
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

    const toggleKeepHistory = () => setSettings({ ...settings, keepHistory: !settings.keepHistory })
    const handleStoreChange = (store_str: string) => {
        const { success } = storeSchema.safeParse(store_str)
        if (!success) return

        const store = store_str as Store

        let res = settings.stores

        if (settings.stores.includes(store as Store)) {
            // se a loja já estiver na lista, remover
            res = settings.stores.filter((s) => s !== store)
        } else {
            // se não, adicionar
            res = [...settings.stores, store]
        }

        if (res.length === 0) return t.error('Selecione ao menos uma loja!')

        setSettings({ ...settings, stores: res })
    }

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
                    className={twMerge(
                        'w-full flex items-center gap-2 sm:justify-normal justify-center sm:flex-row flex-col'
                    )}
                    onSubmit={(e) => {
                        e.preventDefault()
                        onAdd()
                    }}
                >
                    <SettingsInput
                        type='text'
                        placeholder='Digite o termo da pesquisa'
                        value={input}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setInput(e.target.value)
                        }
                    />
                    <Button onClick={onAdd} disabled={!canAdd} className='sm:w-fit w-full'>
                        Adicionar
                    </Button>
                </form>
            </SettingsItem>
            <SettingsItem title='Histórico'>
                <div className='flex flex-wrap items-center justify-between gap-4'>
                    <Checkbox enabled={settings.keepHistory} setEnabled={toggleKeepHistory}>
                        Manter histórico
                    </Checkbox>
                    <ClearHistoryButton />
                </div>
            </SettingsItem>
            <SettingsItem
                title='Tamanho do ranking'
                description='Quantidade de itens a serem exibidos no ranking de menores preços'
            >
                <SettingsInput
                    type='number'
                    value={settings.rankingSize}
                    min={1}
                    placeholder='Digite a quantidade de itens a serem exibidos'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setSettings({ ...settings, rankingSize: Number(e.target.value) || 10 })
                    }
                />
            </SettingsItem>
            <SettingsItem title='Lojas' description='Selecione as lojas que deseja pesquisar'>
                <div className='flex items-center justify-between gap-4 flex-wrap'>
                    {ALL_STORES.map((store) => (
                        <Checkbox
                            key={store}
                            enabled={settings.stores.includes(store)}
                            setEnabled={() => handleStoreChange(store)}
                        >
                            {getStoreLabel(store)}
                        </Checkbox>
                    ))}
                </div>
            </SettingsItem>
        </Modal>
    )
}
