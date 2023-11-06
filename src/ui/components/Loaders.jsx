import { LoadingIcon } from '@/icons'

export const ContainerLoader = ({ loading }) =>
  loading && (
    <div className="center fixed top-0 left-0 right-0 bottom-0 z-50 bg-black/25">
      <LoadingIcon className="animate-spin duration-500 h-10 w-10" />
    </div>
  )
