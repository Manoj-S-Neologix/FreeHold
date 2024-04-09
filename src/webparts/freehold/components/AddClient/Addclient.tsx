// import React, { useState } from 'react';
// import { createRoot } from 'react-dom/client';
// import { AgGridReact } from '@ag-grid-community/react'; // React Grid Logic
// import "@ag-grid-community/styles/ag-grid.css"; // Core CSS
// import "@ag-grid-community/styles/ag-theme-quartz.css"; // Theme

// import { ColDef, ModuleRegistry } from '@ag-grid-community/core';
// import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
// ModuleRegistry.registerModules([ ClientSideRowModelModule ]);

// // Row Data Interface
// interface IRow {
//   make: string;
//   model: string;
//   price: number;
//   electric: boolean;
// }

// // Create new GridExample component
// const GridExample = () => {
//   // Row Data: The data to be displayed.
//   const [rowData, setRowData] = useState<IRow[]>([
//     { make: "Tesla", model: "Model Y", price: 64950, electric: true },
//     { make: "Ford", model: "F-Series", price: 33850, electric: false },
//     { make: "Toyota", model: "Corolla", price: 29600, electric: false },
//     { make: 'Mercedes', model: 'EQA', price: 48890, electric: true },
//     { make: 'Fiat', model: '500', price: 15774, electric: false },
//     { make: 'Nissan', model: 'Juke', price: 20675, electric: false },
//   ]);
  
//   // Column Definitions: Defines & controls grid columns.
//   const [colDefs, setColDefs] = useState<ColDef<IRow>[]>([
//     { field: "make" },
//     { field: "model" },
//     { field: "price" },
//     { field: "electric" }
//   ]);

//   // Container: Defines the grid's theme & dimensions.
//   return (
//     <div className={"ag-theme-quartz"} style={{ width: '100%', height: '100%' }}>
//       <AgGridReact 
//         rowData={rowData}
//         columnDefs={colDefs}
//       />
//     </div>
//   );
// }

// // Render GridExample
// const root = createRoot(document.getElementById("root")!);
// root.render(<GridExample />);


// import React, { useState, useEffect } from 'react';
// // import { AgGridReact } from '@ag-grid-community/react'; // React Grid Logic
// import '@ag-grid-community/styles/ag-grid.css'; // Core CSS
// import '@ag-grid-community/styles/ag-theme-quartz.css'; // Theme
// import { ColDef, ModuleRegistry } from '@ag-grid-community/core';
// // import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
// // ModuleRegistry.registerModules([ClientSideRowModelModule]);


// interface IRow {
//   make: string;
//   model: string;
//   price: number;
//   electric: boolean;
//   color?: string; 
// }

// const GridExample: React.FC = () => {

//   const [rowData, setRowData] = useState<IRow[]>([
//     { make: "Tesla", model: "Model Y", price: 64950, electric: true },
//     { make: "Ford", model: "F-Series", price: 33850, electric: false },
//     { make: "Toyota", model: "Corolla", price: 29600, electric: false },
//     { make: 'Mercedes', model: 'EQA', price: 48890, electric: true },
//     { make: 'Fiat', model: '500', price: 15774, electric: false },
//     { make: 'Nissan', model: 'Juke', price: 20675, electric: false },
//   ]);


//   const [colDefs, setColDefs] = useState<ColDef<IRow>[]>([
//     { field: "make" },
//     { field: "model" },
//     { field: "price" },
//     { field: "electric" }
//   ]);


//   const addRow = () => {
//     const newRow: IRow = { make: 'Honda', model: 'Civic', price: 23000, electric: false };
//     setRowData([...rowData, newRow]);
//   }


//   const addColumn = () => {
//     const newColDef: ColDef<IRow> = { field: 'color', headerName: 'Color' };
//     setColDefs([...colDefs, newColDef]);
//   }

//   useEffect(() => {
//     ModuleRegistry.registerModules([ClientSideRowModelModule]);
//   }, []);


//   return (
//     <div className={"ag-theme-quartz"} style={{ width: '100%', height: '100%' }}>
//       <button onClick={addRow}>Add Row</button>
//       <button onClick={addColumn}>Add Column</button>
//       <AgGridReact
//         rowData={rowData}
//         columnDefs={colDefs}
//       />
//     </div>
//   );
// }

// export default GridExample;




// import React, { useState } from 'react';
// import { Table } from 'react-bootstrap'; // React Bootstrap Table
// import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS

// // Row Data Interface
// interface IRow {
//   make: string;
//   model: string;
//   price: number;
//   electric: boolean;
// }

// const AddClient = () => {
//   // Row Data: The data to be displayed.
//   const [rowData, setRowData] = useState<IRow[]>([
//     { make: "Tesla", model: "Model Y", price: 64950, electric: true },
//     { make: "Ford", model: "F-Series", price: 33850, electric: false },
//     { make: "Toyota", model: "Corolla", price: 29600, electric: false },
//     { make: 'Mercedes', model: 'EQA', price: 48890, electric: true },
//     { make: 'Fiat', model: '500', price: 15774, electric: false },
//     { make: 'Nissan', model: 'Juke', price: 20675, electric: false },
//   ]);

//   // Function to update rowData
//   const updateRowData = () => {
//     // Example of updating rowData
//     setRowData([
//       ...rowData,
//       { make: 'Hyundai', model: 'Sonata', price: 23000, electric: false }
//     ]);
//   };
  
//   // Container: Defines the grid's theme & dimensions.
//   return (
//     <div style={{ width: '100%', height: '100%', padding: '20px' }}>
//       <button onClick={updateRowData}>Add Row</button> {/* Button to update rowData */}
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>Make</th>
//             <th>Model</th>
//             <th>Price</th>
//             <th>Electric</th>
//           </tr>
//         </thead>
//         <tbody>
//           {rowData.map((row, index) => (
//             <tr key={index}>
//               <td>{row.make}</td>
//               <td>{row.model}</td>
//               <td>{row.price}</td>
//               <td>{row.electric ? 'Yes' : 'No'}</td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </div>
//   );
// }

// export default AddClient;


import React from 'react'

export default function Addclient() {
  return (
    <div>Addclient</div>
  )
}
