import { useSettings } from '@/contexts/settings/SettingsContext'
import { Modal } from './Modal'
import { NotFound } from './NotFound'

interface HistoryModalProps {
    show: boolean
    onClose: () => void
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
            description={
                history.length > 0 ? `Você tem ${history.length} itens no histórico.` : undefined
            }
        >
            {history.length === 0 ? (
                <NotFound customMessage='Nenhum histórico encontrado.' />
            ) : (
                <>
                    <div className='max-h-80 overflow-auto'>
                        {reversedHistory.map(({ id, entry }) => (
                            <div key={id} className='pr-1'>
                                <div className='text-sm flex items-center justify-between group hover:bg-slate-800 px-1 rounded'>
                                    <div className='flex flex-wrap items-center gap-2 text-slate-400'>
                                        <button
                                            className='group-hover:text-white hover:underline w-fit text-left'
                                            onClick={() => handleClickLink(entry)}
                                        >
                                            {entry}
                                        </button>
                                        <span className='text-slate-500'>—</span>
                                        <span className='text-slate-500'>
                                            {new Date(parseInt(id)).toLocaleString()}
                                        </span>
                                    </div>
                                    <button
                                        className='hover:underline'
                                        onClick={() => historyHandler.remove(id)}
                                    >
                                        Remover
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </Modal>
    )
}
