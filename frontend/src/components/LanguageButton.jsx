import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { setMainLanguage, selectMainLanguage } from '../slices/langSlice'

const LanguageButton = () => {
  const { t, i18n } = useTranslation()
  const dispatch = useDispatch()
  const mainLanguage = useSelector(selectMainLanguage)

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang)
    dispatch(setMainLanguage(lang))
  }

  return (
    <>
      <Button
        variant={mainLanguage === 'ru' ? 'secondary' : 'outline-secondary'}
        onClick={() => handleLanguageChange('ru')}
        className="ms-2"
      >
        {t('languages.russian')}
      </Button>
      <Button
        variant={mainLanguage === 'en' ? 'secondary' : 'outline-secondary'}
        onClick={() => handleLanguageChange('en')}
        className="ms-2"
      >
        {t('languages.english')}
      </Button>
    </>
  )
}

export default LanguageButton
