import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from './ui/dialog'
import { useUnmount } from 'react-use'

import { useModalStore } from '@/store/ModalStore'

import { cn } from 'ui/utils'

export const Modal = ({ children, header, name, trigger, triggerRef, ...rest }) => {
  const { activeModal, toggle, closeModal } = useModalStore(state => ({
    activeModal: state.activeModal,
    toggle: state.toggleModal,
    closeModal: state.closeModal
  }))

  const props = { ...(name && { open: activeModal === name, onOpenChange: toggle(name) }), ...rest }

  useUnmount(() => closeModal())

  return (
    <Dialog {...props}>
      <DialogTrigger ref={triggerRef} asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{header}</DialogTitle>
        </DialogHeader>

        {children}
      </DialogContent>
    </Dialog>
  )
}

export const ModalContent = ({ children, className }) => (
  <div className={cn('h-full flex flex-col gap-4 overflow-hidden', className)}>{children}</div>
)

export const ModalFooter = DialogFooter
