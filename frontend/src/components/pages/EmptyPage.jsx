import { useTranslation } from 'react-i18next';
import Navigation from '../Navigation';
import routes from '../../routes';
import empty from '../../assets/404.svg';

const EmptyPage = () => {
  const { t } = useTranslation('translation');
  return (
    <>
      <Navigation />
      <div className="text-center">
        <img src={empty} alt={t('emptyPage.emptyPage')} className="img-fluid" id="error" />
        <h1 className="h4 text-muted">{t('emptyPage.emptyPage')}</h1>
        <p className="text-muted">
          {t('emptyPage.pageLink1')}
          {' '}
          <a href={routes.mainPage}>{t('emptyPage.pageLink2')}</a>
        </p>
      </div>
    </>
  );
};

export default EmptyPage;
