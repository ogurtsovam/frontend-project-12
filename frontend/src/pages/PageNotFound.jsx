import { useTranslation } from 'react-i18next';
import image from '../assets/sleepyCat.jpg';

const PageNotFound = () => {
  const { t } = useTranslation();

  return(
   <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <div className="text-center mt-5">
            <img src={image} alt="Страница не найдена" className="img-fluid h-25 mb-3" />
            <h1 className="h4 text-muted">{t('notFound.pageNotFound')}</h1>
            <p className="text-muted">
              {t('notFound.link')} <a href="/">{t('notFound.toMainPage')}</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
};

export default PageNotFound;