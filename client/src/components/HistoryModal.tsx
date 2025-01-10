import { useSettings } from '@/contexts/settings/SettingsContext'
import { useMemo } from 'react'
import { Modal } from './Modal'
import { NotFound } from './NotFound'

interface HistoryModalProps {
    show: boolean
    onClose: () => void
}

export function HistoryModal({ show, onClose }: HistoryModalProps) {
    const { settings, history: historyHandler } = useSettings()
    const { history } = settings

    const reversedHistory = useMemo(() => history.slice().reverse(), [history])

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
                                    <span className='text-slate-400 group-hover:text-white'>
                                        {entry}
                                    </span>
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
