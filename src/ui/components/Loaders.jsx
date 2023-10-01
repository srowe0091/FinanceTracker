import { LoadingIcon } from '@/icons'

export const ContainerLoader = ({ loading }) =>
  loading && (
    <div className="center absolute top-0 left-0 right-0 bottom-0 z-50">
      <LoadingIcon className="animate-spin duration-500 h-10 w-10" />
    </div>
  )
