import { useSettings } from '@/contexts/settings/SettingsContext'
import { NotFound } from '../NotFound'
import { ClearHistoryButton } from './../button/ClearHistoryButton'
import { BaseModalProps, Modal } from './Modal'

interface HistoryModalProps extends BaseModalProps {
    onSearch: (query: string, changeInput?: boolean) => void
}

export function HistoryModal({ show, onClose, onSearch }: HistoryModalProps) {
    const { settings, history: historyHandler } = useSettings()
    const { history } = settings

    const reversedHistory = history.slice().reverse()

    const handleClickLink = (query: string) => {
        onClose()
        onSearch(query, true)
    }

    return (
        <Modal
            show={show}
            onClose={onClose}
            title='Histórico'
            // description={
            //     history.length > 0 ? `Você tem ${history.length} itens no histórico.` : undefined
            // }
        >
            {history.length === 0 ? (
                <NotFound customMessage='Nenhum histórico encontrado.' />
            ) : (
                <>
                    <div className='text-slate-500 flex w-full items-center sm:justify-between flex-wrap gap-2 justify-center'>
                        <span className='sm:text-base text-sm'>
                            Você tem {history.length} ite{history.length > 1 ? 'ns' : 'm'} no
                            histórico.
                        </span>
                        <ClearHistoryButton />
                    </div>
                    <div className='max-h-80 overflow-auto'>
                        {reversedHistory.map(({ id, entry }) => {
                            const date = new Date(parseInt(id)).toLocaleString()
                            return (
                                <div key={id} className='pr-1'>
                                    <div className='text-sm flex flex-wrap items-center justify-between group hover:bg-slate-800 px-1 rounded'>
                                        <button
                                            className='text-slate-400 group-hover:text-white hover:underline w-fit text-left flex items-center gap-2 flex-wrap'
                                            onClick={() => handleClickLink(entry)}
                                        >
                                            {entry}
                                        </button>
                                        <div className='flex items-center gap-4'>
                                            <span className='text-slate-500 group-hover:text-slate-400 hidden sm:block'>
                                                {date}
                                            </span>
                                            <button
                                                className='hover:underline'
                                                onClick={() => historyHandler.remove(id)}
                                            >
                                                Remover
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </>
            )}
        </Modal>
    )
}
