import { PropsWithChildren } from 'react'

function FormPropWrapper({children}: PropsWithChildren) {
  return (
    <div className="mb-2 flex flex-col lg:flex-row flex-1 p-3 items-start lg:items-center justify-start lg:justify-center gap-2">
      {children}
    </div>
  )
}

export default FormPropWrapper
