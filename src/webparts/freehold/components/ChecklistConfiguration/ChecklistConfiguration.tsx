import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ChecklistConfiguration = (props: any) => {
  const navigate = useNavigate();

  useEffect(() => {
    window.open('https://freeholddxb.sharepoint.com/sites/Development/SitePages/Checklist.aspx', '_blank');
    navigate('/');
  }, [navigate]);

  return (
    <div></div>
  );
};

export default ChecklistConfiguration;
