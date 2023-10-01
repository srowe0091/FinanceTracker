import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from './ui/dialog'

import { cn } from 'ui/utils'

export const Modal = ({ children, header, trigger, triggerRef, ...rest }) => {
  return (
    <Dialog {...rest}>
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
