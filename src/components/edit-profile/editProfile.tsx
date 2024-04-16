import React from "react"
import { User } from "../../app/types"
type Props = {
  isOpen: boolean
  onClose: () => void
  user?: User
}
export const EditProfileComponent: React.FC<Props> = {
    isOpen,
    onClose,
    user,
}) => {
  return <div>EditProfileComponent</div>
}
