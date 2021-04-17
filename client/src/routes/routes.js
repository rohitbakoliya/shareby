import NotFound from 'pages/404';
import IndexPage from 'pages/IndexPage';
import ShowShared from 'pages/ShowShared';
import { BrowserRouter, Switch } from 'react-router-dom';
import PublicRoute from './PublicRoute';

const MainRouter = () => (
  <BrowserRouter>
    <Switch>
      {/* Private Routes */}
      <PublicRoute path="/" exact component={IndexPage} />
      <PublicRoute path="/:url" exact component={ShowShared} />
      <PublicRoute component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default MainRouter;
