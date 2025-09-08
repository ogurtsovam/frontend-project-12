import { useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { Button } from "react-bootstrap"

import { selectToken } from "../slices/authSlice"
import { clearAuth } from "../slices/authSlice"

const AuthButton = () => {
  const dispatch = useDispatch()
  const {t} = useTranslation()
  const token = useSelector(selectToken)

  const handleLogout = () => {
    dispatch(clearAuth())
  }

  return (
    token !== null
      ? <Button onClick={handleLogout}>{t('header.logOut')}</Button>
      : ''
  )
}

export default AuthButton
