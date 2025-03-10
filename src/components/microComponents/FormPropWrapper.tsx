import { PropsWithChildren } from 'react'

function FormPropWrapper({children}: PropsWithChildren) {
  return (
    <div className="mb-2 flex items-center justify-center gap-2">
      {children}
    </div>
  )
}

export default FormPropWrapper
