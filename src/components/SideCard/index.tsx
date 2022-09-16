import closeIcon from 'assets/close.svg'

interface Props {
  open?: boolean
  onClose?: () => void
  children?: React.ReactNode
}

export const SideCard: React.FC<Props> = ({ open, onClose, children }) => {
  return !open ? null : (
    <div className='fixed top-0 left-0 w-full h-full bg-stone-400/20 z-20'>
      <div 
        className='w-[480px] h-full p-4 absolute top-0 right-0 bg-white z-50 border-4 border-gray-900 shadow-2xl'
      >
        <div className='mb-8 flex justify-end'>
          <button onClick={onClose}>
            <img 
              className='w-[25px] h-[25px] object-contain'
              src={closeIcon}
              alt='close icon'
              width='25'
              height='25' />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}