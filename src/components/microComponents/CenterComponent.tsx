import { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
  className?: string
}

function CenterComponent({children, className}: Props) {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {children}
    </div>
  )
}

export default CenterComponent
