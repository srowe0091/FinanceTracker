import { useCallback } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useBoolean } from 'react-use'

import { Button, Fab, Input, Modal, ModalContent, ModalFooter } from '@/ui'
import { AddIcon } from '@/icons'

import { NewTransactionSchema } from './util'

const CreateNew = ({ onClose }) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm({
    resolver: NewTransactionSchema,
    defaultValues: {
      amount: '',
      memo: ''
    }
  })

  const onSubmit = useCallback(
    async values => {
      try {
        console.log(values)
        // const data = await mutateAsync(values)
      } catch (err) {
        onClose()
        console.error(err)
      }
    },
    [onClose]
  )

  return (
    <>
      <ModalContent>
        <Controller
          name="amount"
          control={control}
          render={({ field, fieldState }) => <Input autoFocus label="Amount" error={fieldState.error} {...field} />}
        />

        <Controller
          name="memo"
          control={control}
          render={({ field, fieldState }) => <Input label="Memo" error={fieldState.error} {...field} />}
        />
      </ModalContent>

      <ModalFooter>
        <Button loading={isSubmitting} onClick={handleSubmit(onSubmit)}>
          Submit
        </Button>
      </ModalFooter>
    </>
  )
}

export const NewTransactionModal = () => {
  const [modalState, updateState] = useBoolean(false)

  return (
    <Modal open={modalState} onOpenChange={updateState} header="New Transaction" trigger={<Fab icon={AddIcon} />}>
      <CreateNew onClose={updateState} />
    </Modal>
  )
}
