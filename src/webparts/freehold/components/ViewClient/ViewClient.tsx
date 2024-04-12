// import * as React from 'react';
// import { Breadcrumb, IBreadcrumbItem } from '@fluentui/react/lib/Breadcrumb';
// import { PrimaryButton, TextField } from '@fluentui/react';
// import styles from './ViewClient.module.scss';
// import { Stack, IStackStyles, IStackTokens } from '@fluentui/react/lib/Stack';
// import { DefaultPalette } from '@fluentui/react/lib/Styling';
// import { ThemeProvider } from '../../../../Common/ThemeProvider/Themeprovider';
// import GridTable from "../../../../Common/Table/Table";


// function _onBreadcrumbItemClicked(ev: React.MouseEvent<HTMLElement>, item: IBreadcrumbItem): void {
//   console.log(`Breadcrumb item with key "${item.key}" has been clicked.`);
// }


// const stackStyles: IStackStyles = {
//   root: {
//     background: DefaultPalette.themeTertiary,
//   },
// };
// const verticalGapStackTokens: IStackTokens = {
//   childrenGap: 10,
//   padding: 10,
// };


// const ViewClient = (props: any) => {
//   const [searchQuery, setSearchQuery] = React.useState('');

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(event.target.value);
//   };
//   const items: IBreadcrumbItem[] = [
//     { text: 'Home', key: 'Home', onClick: _onBreadcrumbItemClicked },
//     { text: 'View Client', key: 'View Client', onClick: _onBreadcrumbItemClicked, isCurrentItem: true },

//   ];
//   return (
//     <Stack className={styles.Clientcontainer} enableScopedSelectors styles={stackStyles} tokens={verticalGapStackTokens}>
//       <div>
//         <Breadcrumb
//           items={items}
//           maxDisplayedItems={10}
//           ariaLabel="Breadcrumb with items rendered as buttons"
//           overflowAriaLabel="More links"
//         /></div>
//       <div className={styles.Searchspan} >
//         <PrimaryButton className={styles.Clientbutton}
//           iconProps={{ iconName: 'Add' }} >
//           <span > Add Client</span>
//         </PrimaryButton>
//         <TextField
//           className={styles.searchBar}
//           placeholder="Search..."
//           iconProps={{ iconName: 'Search' }}
//           onChange={handleSearchChange}
//         />
//       </div>
//       <ThemeProvider primary={"#000"} secondary={"#fff"} >
//         <GridTable props={props} searchQuery={searchQuery} />
//       </ThemeProvider>
//     </Stack>

//   );
// };
// export default ViewClient;

// import * as React from 'react';
// import { Breadcrumb, IBreadcrumbItem } from '@fluentui/react/lib/Breadcrumb';
// import { PrimaryButton, TextField } from '@fluentui/react';
// import styles from './ViewClient.module.scss';
// import { Stack, IStackStyles, IStackTokens } from '@fluentui/react/lib/Stack';
// import { DefaultPalette } from '@fluentui/react/lib/Styling';
// import { ThemeProvider } from '../../../../Common/ThemeProvider/Themeprovider';
// import GridTable from "../../../../Common/Table/Table";
// import { useNavigate } from 'react-router-dom'; 

// function ViewClient(props: any) {
//   const [searchQuery, setSearchQuery] = React.useState('');
//   const navigate = useNavigate(); 

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(event.target.value);
//   };

//   const navigateToHome = () => {
//     navigate('/'); 
//   };

//   const items: IBreadcrumbItem[] = [
//     { text: 'Home', key: 'Home', onClick: navigateToHome }, 
//     { text: 'View Client', key: 'View Client', isCurrentItem: true },
//   ];

//   const stackStyles: IStackStyles = {
//     root: {
//       background: DefaultPalette.themeTertiary,
//     },
//   };
//   const verticalGapStackTokens: IStackTokens = {
//     childrenGap: 10,
//     padding: 10,
//   };

//   return (
//     <Stack className={styles.Clientcontainer} enableScopedSelectors styles={stackStyles} tokens={verticalGapStackTokens}>
//       <div>
//         <Breadcrumb
//           items={items}
//           maxDisplayedItems={10}
//           ariaLabel="Breadcrumb with items rendered as buttons"
//           overflowAriaLabel="More links"
//         />
//       </div>
//       <div className={styles.Searchspan}>
//         <PrimaryButton className={styles.Clientbutton} iconProps={{ iconName: 'Add' }}>
//           <span> Add Client</span>
//         </PrimaryButton>
//         <TextField
//           className={styles.searchBar}
//           placeholder="Search..."
//           iconProps={{ iconName: 'Search' }}
//           onChange={handleSearchChange}
//         />
//       </div>
//       <ThemeProvider primary={"#000"} secondary={"#fff"}>
//         <GridTable props={props} searchQuery={searchQuery} />
//       </ThemeProvider>
//     </Stack>
//   );
// }

// export default ViewClient;


import React, { useState } from 'react';
import { Breadcrumb, IBreadcrumbItem } from '@fluentui/react/lib/Breadcrumb';
import { PrimaryButton, TextField } from '@fluentui/react';
import styles from './ViewClient.module.scss';
import { Stack, IStackStyles, IStackTokens } from '@fluentui/react/lib/Stack';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import { ThemeProvider } from '../../../../Common/ThemeProvider/Themeprovider';
import GridTable from "../../../../Common/Table/Table";
import { useNavigate } from 'react-router-dom'; 
import AddClientDialog from '../AddClient/AddClient'; // Import the AddClientDialog component

function ViewClient(props: any) {
  const [searchQuery, setSearchQuery] = useState('');
  const [addClientDialogOpen, setAddClientDialogOpen] = useState(false); // State for dialog
  const navigate = useNavigate(); 

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const navigateToHome = () => {
    navigate('/');
  };

  const items: IBreadcrumbItem[] = [
    { text: 'Home', key: 'Home', onClick: navigateToHome }, 
    { text: 'View Client', key: 'View Client', isCurrentItem: true },
  ];

  const stackStyles: IStackStyles = {
    root: {
      background: DefaultPalette.themeTertiary,
    },
  };
  const verticalGapStackTokens: IStackTokens = {
    childrenGap: 10,
    padding: 10,
  };

  const openAddClientDialog = () => {
    setAddClientDialogOpen(true);
  };

  const closeAddClientDialog = () => {
    setAddClientDialogOpen(false);
  };

  return (
    <Stack className={styles.Clientcontainer} enableScopedSelectors styles={stackStyles} tokens={verticalGapStackTokens}>
      <div>
        <Breadcrumb
          items={items}
          maxDisplayedItems={10}
          ariaLabel="Breadcrumb with items rendered as buttons"
          overflowAriaLabel="More links"
        />
      </div>
      <div className={styles.Searchspan}>
        <PrimaryButton className={styles.Clientbutton} iconProps={{ iconName: 'Add' }} onClick={openAddClientDialog}>
          <span> Add Client</span>
        </PrimaryButton>
        <TextField
          className={styles.searchBar}
          placeholder="Search..."
          iconProps={{ iconName: 'Search' }}
          onChange={handleSearchChange}
        />
      </div>
      <ThemeProvider primary={"#000"} secondary={"#fff"}>
        <GridTable props={props} searchQuery={searchQuery} />
      </ThemeProvider>
      <AddClientDialog open={addClientDialogOpen} onClose={closeAddClientDialog} /> {/* Render the AddClientDialog component */}
    </Stack>
  );
}

export default ViewClient;
