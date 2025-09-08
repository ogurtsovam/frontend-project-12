import { useTranslation } from 'react-i18next'

const Header = ({ authButton }) => {
  const { t } = useTranslation()
  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">{t('header.nav')}</a>
        <div className="d-flex ms-auto">
          {authButton}
        </div>
      </div>
    </nav>
  )
}

export default Header
