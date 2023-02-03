import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';

import { DefaultPageContainer } from '../../../layouts/DefaultPage/DefaultPage';
import {
  DefaultPageCenterContainer,
  PageCenterBlockContainer,
} from '../../../layouts/DefaultPage/DefaultPageCenter';
import { DefaultPageLeftContainer } from '../../../layouts/DefaultPage/DefaultPageLeft';
import { useFilter } from '../../../hooks/filters/useFilter';
import useFilterItem from '../../../hooks/filters/useFilterItem';
import UserFilter from '../../../features/Users/UserFilter';
import { customStyles } from '../../../constants/userConsts';
import { sortByDate } from '../../../constants/sortConsts';
import { VacancyItem } from '../../../features/Vacancies/VacancyItem';
import { getVacanciesLoadAction } from '../../../redux/actions/VacanciesActions';
import {
  getVacanciesInfoSelector,
  getVacanciesSelector,
} from '../../../redux/selectors/vacancySelector';
import { Loader } from '../../../components/Loader/Loader';
import { Vacancy } from '../../../types/interfaces/VacancyModel';
import { InformationToolTip } from '../../../features/ToolTips/InformationToolTip';
import { Pagination } from '../../../layouts/Pagination/Pagination';

import './Vacancies.scss';

const VacanciesList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const vacancies = useSelector(getVacanciesSelector);
  const { isLoading } = useSelector(getVacanciesInfoSelector);
  const [isApplyClicked, setIsApplyClicked] = useState(false);
  const [FilterPosition, isPositionVisible] = useFilterItem(true, 'Position');
  const [FilterSalary, isSalaryVisible] = useFilterItem(false, 'Salary ($)');
  const {
    query,
    page,
    filter,
    handleSortDateChange,
    position,
    minSalary,
    maxSalary,
  } = useFilter(isApplyClicked, isSalaryVisible, isPositionVisible, 'STANDARD');

  useEffect(() => {
    history.push({ search: query });
    dispatch(getVacanciesLoadAction(query));
  }, [dispatch, page.currentPage, query, filter, history, isApplyClicked]);

  const handleApplyClick = () => {
    setIsApplyClicked(!isApplyClicked);
  };

  const handleSalaryChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (index) {
      maxSalary.setMaxSalary(parseInt(event.target.value, 10));
    } else minSalary.setMinSalary(parseInt(event.target.value, 10));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="vacancy">
      <div className="vacancy__inner">
        <DefaultPageContainer>
          <DefaultPageLeftContainer leftblockName="company__inner-left">
            <InformationToolTip desc="Collapse filter item to reset" />
            <UserFilter
              position={position}
              minSalary={minSalary}
              maxSalary={maxSalary}
              handleApplyClick={handleApplyClick}
              handleSalaryChange={handleSalaryChange}
              FilterPosition={FilterPosition}
              FilterSalary={FilterSalary}
            />
          </DefaultPageLeftContainer>
          <DefaultPageCenterContainer>
            <PageCenterBlockContainer centerBlockName="userpage__inner-info">
              <div className="vacancies">
                <div className="vacancies__filter">
                  <h2>Vacancies</h2>
                  <Select
                    autosize={true}
                    placeholder={'Sort by date'}
                    styles={customStyles}
                    onChange={handleSortDateChange}
                    defaultValue={filter}
                    value={filter}
                    options={sortByDate}
                  />
                </div>
                {vacancies &&
                  vacancies.data.map((vacancy: Vacancy) => (
                    <VacancyItem
                      key={vacancy._id.toString()}
                      vacancy={vacancy}
                      filter={filter}
                    />
                  ))}
                {vacancies && vacancies.data && vacancies.data.length > 0 ? (
                  <Pagination
                    current={parseInt(page.currentPage, 10) - 1}
                    total={vacancies.pagination.total}
                    onPageChange={page.handlePageChange}
                  />
                ) : (
                  <p>Unfortunately, your request not found</p>
                )}
              </div>
            </PageCenterBlockContainer>
          </DefaultPageCenterContainer>
        </DefaultPageContainer>
      </div>
    </div>
  );
};

export default VacanciesList;
