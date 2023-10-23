import { useTranslation } from 'react-i18next';
import Navigation from '../Navigation';

const EmptyPage = () => {
  const { t } = useTranslation('translation');
  return (
    <>
      <Navigation />
      <div className="text-center">
        <img src="https://cdn2.hexlet.io/assets/error-pages/404-4b6ef16aba4c494d8101c104236304e640683fa9abdb3dd7a46cab7ad05d46e9.svg" alt={t('emptyPage.emptyPage')} className="img-fluid" id="error" />
        <h1 className="h4 text-muted">{t('emptyPage.emptyPage')}</h1>
        <p className="text-muted">
          {t('emptyPage.pageLink1')}
          {' '}
          <a href="/">{t('emptyPage.pageLink2')}</a>
        </p>
      </div>
    </>
  );
};

export default EmptyPage;
