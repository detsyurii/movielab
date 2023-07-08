import { Link } from 'react-router-dom';
import css from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={css.notFound}>
      <p>Oops, nothing found...</p>
      <Link to="">Open home page</Link>
    </div>
  );
};

export default NotFoundPage;
