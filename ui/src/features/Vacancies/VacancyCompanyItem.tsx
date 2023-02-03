import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { Vacancy } from '../../types/interfaces/VacancyModel';
import { Button } from '../../components/Button/Button';
import nocompany from '../../assets/images/no-company.png';


interface VacancyCompanyItem {
  vacancy: Vacancy;
  avatar: string;
  name: string;
}

export const VacancyCompanyItem = ({
  vacancy,
  name,
  avatar,
}: VacancyCompanyItem) => {
  return (
    <div className="company__vacancies-item">
      <div className="company__vacancies-item--img">
        <img src={avatar || nocompany} alt="logo-company" />
      </div>
      <div className="company__vacancies-item--text">
        <div className="company__vacancies-title">
          <span>{name}</span>
          <span>{moment(vacancy.createdAt).format('DD MMMM')}</span>
        </div>
        <Link to={`/vacancies/${vacancy._id}`}>{vacancy.title}</Link>
        <div>
          {vacancy.worktype && (
            <Button btnTheme="btn-small" btnColor="soft">
              {vacancy.worktype}
            </Button>
          )}
          {vacancy.position && (
            <Button btnTheme="btn-small" btnColor="soft">
              {vacancy.position}
            </Button>
          )}
          {vacancy.salary && (
            <Button btnTheme="btn-small" btnColor="soft">
              {`from ${vacancy.salary}$`}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
