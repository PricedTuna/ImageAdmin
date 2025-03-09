import { PropsWithChildren } from 'react'

function CenterComponent({children}: PropsWithChildren) {
  return (
    <div className="flex flex-col align-center justify-center">
      {children}
    </div>
  )
}

export default CenterComponent
