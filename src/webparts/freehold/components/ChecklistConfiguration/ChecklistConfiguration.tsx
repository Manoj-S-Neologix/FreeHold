
// import React from 'react';

// const ChecklistConfiguration = (props: any) => {
//   return (
//     <div>ChecklistConfiguration</div>
//   );
// };

// export default ChecklistConfiguration;

import React, { useEffect } from 'react';

const ChecklistConfiguration = (props: any) => {
  useEffect(() => {
    window.open('https://freeholddxb.sharepoint.com/sites/Development/SitePages/Checklist.aspx', '_blank');
  }, []);

  return (
    <div></div>
  );
};

export default ChecklistConfiguration;
