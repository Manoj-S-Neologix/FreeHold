import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IFreeholdChildProps } from '../IFreeholdChildProps';

const ChecklistConfiguration = (props: IFreeholdChildProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    window.open(`${props.siteUrl}/SitePages/Checklist.aspx`, '_blank');
    navigate('/');
  }, [navigate]);

  return (
    <div></div>
  );
};

export default ChecklistConfiguration;
