import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useParams, useHistory } from 'react-router';

import { Loader } from '../../../components/Loader/Loader';
import { DefaultPageContainer } from '../../../layouts/DefaultPage/DefaultPage';
import { DefaultPageLeftContainer } from '../../../layouts/DefaultPage/DefaultPageLeft';
import {
  DefaultPageCenterContainer,
  PageCenterBlockContainer,
} from '../../../layouts/DefaultPage/DefaultPageCenter';
import { BlockItemInfo } from '../../../components/PageBlock/BlockItemInfo';
import { fetchVacancyAction } from '../../../redux/actions/VacancyActions';
import {
  getVacancySelector,
  getVacancyStateSelector,
  addVacancyStateSelector,
} from '../../../redux/selectors/vacancySelector';
import DeleteButton from '../../../features/DeleteItem/DeleteButton';
import { fetchDeleteVacancyAction } from '../../../redux/actions/OperateVacancyActions';
import { getProfileSelector } from '../../../redux/selectors/profileSelector';

import './Vacancy.scss';

const Vacancy = () => {
  const { vacancyId } = useParams<{ vacancyId: string }>();
  const history = useHistory();
  const dispatch = useDispatch();
  const vacancy = useSelector(getVacancySelector);
  const { me } = useSelector(getProfileSelector);
  const vacancyState = useSelector(getVacancyStateSelector);
  const [companyUrl, setCompanyUrl] = useState('');
  const { isFetching, isLoading, errorMessage } = useSelector(
    addVacancyStateSelector,
  );

  useEffect(() => {
    dispatch(fetchVacancyAction(vacancyId));
  }, [dispatch, vacancyId]);

  useEffect(() => {
    if (isFetching && !isLoading && !errorMessage && companyUrl) {
      history.push(`/companies/${companyUrl}`);
      toast.success('Your vacancy was successfully deleted!', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
    }
  }, [isFetching, isLoading, errorMessage, history, companyUrl]);

  const deleteVacancy = () => {
    setCompanyUrl(vacancy.companyUrl);
    dispatch(fetchDeleteVacancyAction(vacancyId));
  };

  if (vacancyState.isLoading || isLoading) {
    return <Loader />;
  }

  return (
    <div className="vacancy">
      <div className="vacancy__inner">
        <DefaultPageContainer defaultPageTitle={vacancy?.title}>
          <DefaultPageLeftContainer leftblockName="company__inner-left">
            <BlockItemInfo name="Worktype" value={vacancy?.worktype} />
            {vacancy?.salary && (
              <BlockItemInfo name="Salary" value={`from ${vacancy.salary}$`} />
            )}
            {vacancy?.position && (
              <BlockItemInfo name="Position" value={vacancy?.position} />
            )}
            <BlockItemInfo name="Contact" value={vacancy?.email} />
            <BlockItemInfo
              isRedirect
              name="Go to the company"
              value={`/companies/${vacancy?.companyUrl}`}
            />
            {me?._id === vacancy?.author && (
              <DeleteButton del={deleteVacancy} />
            )}
          </DefaultPageLeftContainer>

          <DefaultPageCenterContainer>
            <PageCenterBlockContainer centerBlockName="userpage__inner-info">
              <div className="userpage__inner-info--main">
                <div className="userpage__inner-info--about">
                  <h3>About:</h3>
                  <div
                    dangerouslySetInnerHTML={{ __html: vacancy?.description }}
                  />
                </div>
              </div>
            </PageCenterBlockContainer>
          </DefaultPageCenterContainer>
        </DefaultPageContainer>
      </div>
    </div>
  );
};

export default Vacancy;
