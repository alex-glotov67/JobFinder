import Home from '../pages/Home';
import SignUp from '../pages/Auth/SignUp/SignUp';
import SignIn from '../pages/Auth/SignIn/SignIn';
import Dashboard from '../pages/Dashboard/Dashboard';
import UserProfile from '../pages/Users/UserProfile/UserProfile';
import NotFound from '../pages/NotFound/NotFound';
import EditProfile from '../pages/Users/EditProfile/EditProfile';
import Users from '../pages/Users/Users/Users';
import Company from '../pages/Companies/Company/Company';
import Vacancy from '../pages/Vacancies/Vacancy/Vacancy';
import CompaniesList from '../pages/Companies/CompaniesList/CompaniesList';
import VacanciesList from '../pages/Vacancies/VacanciesList/VacanciesList';
import { RenderRoutesProps } from '../types/interfaces/Route';
import { AddCompany } from '../pages/Companies/Company/AddCompany';
import { RenderRoutes } from '../features/Routes/Routes';
import { AddVacancy } from '../pages/Vacancies/Vacancy/AddVacancy/AddVacancy';

export const routes: RenderRoutesProps = {
  path: '/',
  keyValue: 'APP',
  component: RenderRoutes,
  list: [
    {
      path: '/',
      exact: true,
      keyValue: 'APP_ROOT',
      isAuth: false,
      component: Home,
    },
    {
      path: '/dashboard',
      exact: true,
      keyValue: 'APP_ROOT',
      isAuth: true,
      component: Dashboard,
    },
    {
      path: '/sign-in',
      exact: true,
      keyValue: 'SIGN_IN',
      isAuth: false,
      component: SignIn,
    },
    {
      path: '/sign-up',
      exact: true,
      keyValue: 'SIGN_UP',
      isAuth: false,
      component: SignUp,
    },
    {
      path: '/not-found',
      keyValue: 'NOT_FOUND',
      isAuth: false,
      component: NotFound,
    },

    {
      path: '/users',
      exact: true,
      keyValue: 'USERS',
      isAuth: true,
      component: Users,
    },
    {
      path: '/companies',
      exact: true,
      keyValue: 'COMPANIES',
      isAuth: true,
      component: CompaniesList,
    },
    {
      path: '/companies/:companyUrl',
      exact: true,
      keyValue: 'COMPANY',
      isAuth: true,
      component: Company,
    },
    {
      path: '/companies/:companyUrl/add-vacancy',
      exact: true,
      keyValue: 'ADD_VACANCY',
      isAuth: true,
      isEmployer: true,
      component: AddVacancy,
    },
    {
      path: '/add-company',
      exact: true,
      keyValue: 'ADD_COMPANY',
      isAuth: true,
      isEmployer: true,
      component: AddCompany,
    },
    {
      path: '/vacancies',
      exact: true,
      keyValue: 'VACANCIES',
      isAuth: true,
      component: VacanciesList,
    },
    {
      path: '/vacancies/:vacancyId',
      exact: true,
      keyValue: 'VACANCY',
      isAuth: true,
      component: Vacancy,
    },
    {
      path: '/users/:userId',
      exact: true,
      keyValue: 'CURRENT_USER',
      isAuth: true,
      component: UserProfile,
    },
    {
      path: '/edit-profile',
      exact: true,
      keyValue: 'EDIT_PROFILE',
      isAuth: true,
      component: EditProfile,
    },
    {
      path: '*',
      keyValue: 'NOT_FOUND',
      isAuth: false,
      component: NotFound,
    },
  ],
};
