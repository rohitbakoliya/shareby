import NotFound from 'pages/404';
import IndexPage from 'pages/IndexPage';
import RecentPastes from 'pages/RecentPastes';
import RichEditor from 'pages/RichEditor';
import ShowShared from 'pages/ShowShared';
import { BrowserRouter, Switch } from 'react-router-dom';
import PublicRoute from './PublicRoute';

const MainRouter = () => (
  <BrowserRouter>
    <Switch>
      {/* Public Routes */}
      <PublicRoute path="/" exact component={IndexPage} />
      <PublicRoute path="/r" exact component={RichEditor} />
      <PublicRoute path="/recent" exact component={RecentPastes} />
      <PublicRoute path="/r/:url" exact component={ShowShared} />
      <PublicRoute path="/:url" exact component={ShowShared} />
      <PublicRoute component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default MainRouter;
