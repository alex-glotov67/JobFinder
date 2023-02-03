import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import {
  delCompanyAction,
  fetchCompanyAction,
  fetchFollowCompanyAction,
} from '../../../redux/actions/GetCompanyActions';
import {
  getCompanySelector,
  getCompanyStateSelector,
  isFollowSelector,
  companiesVacanciesSelector,
} from '../../../redux/selectors/companySelector';
import { Loader } from '../../../components/Loader/Loader';
import { VacancyCompanyItem } from '../../../features/Vacancies/VacancyCompanyItem';
import { Vacancy } from '../../../types/interfaces/VacancyModel';

import { CompanyTitle } from '../../../features/Company/CompanyTitle';
import { BlockItemInfo } from '../../../components/PageBlock/BlockItemInfo';
import { getProfileSelector } from '../../../redux/selectors/profileSelector';
import { DefaultPageContainer } from '../../../layouts/DefaultPage/DefaultPage';
import { DefaultPageCenterContainer, PageCenterBlockContainer } from '../../../layouts/DefaultPage/DefaultPageCenter';
import { DefaultPageLeftContainer } from '../../../layouts/DefaultPage/DefaultPageLeft';
import { NotFoundData } from '../../../layouts/NotFoundData/NotFoundData';

import './Company.scss';

const Company = () => {
  const dispatch = useDispatch();
  const { companyUrl } = useParams<{ companyUrl: string }>();
  const { me } = useSelector(getProfileSelector);
  const company = useSelector(getCompanySelector);
  const vacancies = useSelector(companiesVacanciesSelector);
  const isFollow = useSelector(isFollowSelector);
  const { isLoading, isFetching } = useSelector(getCompanyStateSelector);
  useEffect(() => {
    dispatch(fetchCompanyAction(companyUrl));
    return () => {
      dispatch(delCompanyAction());
    };
  }, [companyUrl, dispatch]);

  if (isLoading && !isFetching) {
    return <Loader />;
  }

  const handleSubscribe = () => dispatch(fetchFollowCompanyAction(companyUrl));

  return (
    <div className="company">
      <CompanyTitle
        company={company}
        isFollow={isFollow}
        onSubscribe={handleSubscribe}
      />
      <div className="company__inner">
        <DefaultPageContainer>
          <DefaultPageLeftContainer leftblockName="company__inner-left">
            <div className="company__info">
              <BlockItemInfo
                name="Followers"
                value={company?.followers.length}
              />
              {company?.year && (
                <BlockItemInfo name="Foundation year" value={company?.year} />
              )}
              {company?.staff && (
                <BlockItemInfo
                  name="Number of staff"
                  value={`${company?.staff}+`}
                />
              )}
              <BlockItemInfo name="Address" value={company?.address} />
              <BlockItemInfo isLink name="Website" value={company?.website} />
            </div>
          </DefaultPageLeftContainer>

          <DefaultPageCenterContainer>
            <PageCenterBlockContainer centerBlockName="userpage__inner-info">
              <div className="userpage__inner-info--main">
                <div className="userpage__inner-info--about">
                  <h3>About:</h3>
                  <p>{company?.about}</p>
                </div>
              </div>
            </PageCenterBlockContainer>
            {vacancies && vacancies.length ? (
              <PageCenterBlockContainer centerBlockName="userpage__inner-info">
                <div className="userpage__inner-info--main">
                  <div className="userpage__inner-info--about">
                    <div className="company__vacancies-title">
                      <h3>Vacancies:</h3>
                      {me?._id === company?.author && (
                        <Link
                          className="btn btn-small primary"
                          to={`/companies/${company.companyUrl}/add-vacancy`}
                        >
                          Add vacancy
                        </Link>
                      )}
                    </div>
                    <div className="defaultpage__inner-line"></div>
                    <div className="company__vacancies">
                      {vacancies.map((vacancy: Vacancy) => (
                        <VacancyCompanyItem
                          key={vacancy._id}
                          vacancy={vacancy}
                          name={company.name}
                          avatar={company.avatar}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </PageCenterBlockContainer>
            ) : me?._id === company?.author ? (
              <PageCenterBlockContainer centerBlockName="userpage__inner-info">
                <div className="userpage__inner-info--main">
                  <div className="userpage__inner-info--about">
                    <div className="company__vacancies-title">
                      <h3>Vacancies:</h3>
                      <Link
                        className="btn btn-small primary"
                        to={`/companies/${company.companyUrl}/add-vacancy`}
                      >
                        Add vacancy
                      </Link>
                    </div>
                    <div className="defaultpage__inner-line"></div>
                    <div className="company__vacancies">
                      <NotFoundData />
                    </div>
                  </div>
                </div>
              </PageCenterBlockContainer>
            ) : (
              ''
            )}
          </DefaultPageCenterContainer>
        </DefaultPageContainer>
      </div>
    </div>
  );
};

export default Company;
