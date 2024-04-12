// import * as React from 'react';
// import { PrimaryButton } from '@fluentui/react';
// import styles from './Upload.module.scss';

// const Upload = (props: any) => {
//     return (
//         <div className={styles.uploadModule}>
//             <PrimaryButton
//                 iconProps={{ iconName: 'Upload' }}
//                 className={styles.uploadButton} >
//                 <span className="text-captialize">Upload Documents</span>
//             </PrimaryButton>
//         </div>
//     );
// };

// export default Upload;





// import React, { useState } from 'react';
// import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Radio, RadioGroup, FormControlLabel, Select, MenuItem, InputLabel } from '@mui/material';
// import { Upload } from '@mui/icons-material';
// import styles from './Upload.module.scss';

// const UploadComponent = (props: any) => {
//     const [showDialog, setShowDialog] = useState(false);
//     const [documentType, setDocumentType] = useState('');
//     const [projectName, setProjectName] = useState('');
//     const [clientName, setClientName] = useState('');
//     const [isUnitDocument, setIsUnitDocument] = useState(false);
//     const [question1, setQuestion1] = useState('');
//     const [question2, setQuestion2] = useState('');
//     const [selectedUnit, setSelectedUnit] = useState('');

//     const handleSave = () => {
//         setShowDialog(false);
//     };

//     const openDialog = () => {
//         setDocumentType('');
//         setShowDialog(true);
//     };

//     return (
//         <div>
//             <Button className={styles.uploadButton}
//                 startIcon={<Upload />}
//                 onClick={openDialog}
//             >
//                 Upload Documents
//             </Button>

//             <Dialog
//                 open={showDialog}
//                 onClose={() => setShowDialog(false)}
//                 maxWidth="sm"
//                 fullWidth
//             >
//                 <DialogTitle>Upload Documents</DialogTitle>
//                 <DialogContent className='ProjectDialogue'>
//                     <RadioGroup
//                         value={documentType}
//                         onChange={(e) => setDocumentType(e.target.value)}
//                     >
//                         <FormControlLabel value="Project" control={<Radio />} label="Project Document" />
//                         <FormControlLabel value="Client" control={<Radio />} label="Client Document" />
//                     </RadioGroup>
//                     {documentType === 'Project' && (
//                         <div>
//                             <div>
//                                 <InputLabel htmlFor="project-name">Project Name</InputLabel>
//                                 <Select className={styles.Projectfield}
//                                     labelId="project-name-label"
//                                     id="project-name"
//                                     value={projectName}
//                                     onChange={(e) => setProjectName(e.target.value)}
//                                 >
//                                     <MenuItem value="">None</MenuItem>
//                                     <MenuItem value="Project A">Project A</MenuItem>
//                                     <MenuItem value="Project B">Project B</MenuItem>
                                   
//                                 </Select>
//                             </div>
//                             <div style={{ display: 'flex', flexDirection: 'column' }}>
//     <InputLabel htmlFor="client-name">Client Name</InputLabel>
//     <Select
//         labelId="client-name-label"
//         id="client-name"
//         value={clientName}
//         onChange={(e) => setClientName(e.target.value)}
//     >
//         <MenuItem value="">None</MenuItem>
//         <MenuItem value="Client A">Client A</MenuItem>
//         <MenuItem value="Client B">Client B</MenuItem>
//     </Select>
//     <FormControlLabel
//         control={
//             <Radio
//                 checked={isUnitDocument}
//                 onChange={() => setIsUnitDocument(!isUnitDocument)}
//             />
//         }
//         label="Is this a Unit Document?"
//     />

//     <InputLabel htmlFor="select-unit">Select Unit</InputLabel>
//     <Select
//         labelId="select-unit-label"
//         id="select-unit"
//         value={selectedUnit}
//         onChange={(e) => setSelectedUnit(e.target.value)}
//     >
//         <MenuItem value="">None</MenuItem>
//         <MenuItem value="Unit A">Unit A</MenuItem>
//         <MenuItem value="Unit B">Unit B</MenuItem>
//     </Select>
// </div>

//                             <div>
//                                 <input type="file" />
//                             </div>
//                             <div className='Question1'>
//                                 <InputLabel htmlFor="question1">Question 1</InputLabel>
//                                 <TextField id="question1" value={question1} onChange={(e) => setQuestion1(e.target.value)} />
//                             </div>
//                             <div className='Question2'>
//                                 <InputLabel htmlFor="question2">Question 2</InputLabel>
//                                 <TextField id="question2" value={question2} onChange={(e) => setQuestion2(e.target.value)} />
//                             </div>
//                         </div>
//                     )}
//                     {documentType === 'Client' && (
//                         <div>
//                             <div>
//                                 <InputLabel htmlFor="client-name">Client Name</InputLabel>
//                                 <Select className={styles.Cleintfield}
//                                     labelId="client-name-label"
//                                     id="client-name"
//                                     value={clientName}
//                                     onChange={(e) => setClientName(e.target.value)}
//                                 >
//                                     <MenuItem value="">None</MenuItem>
//                                     <MenuItem value="Client A">Client A</MenuItem>
//                                     <MenuItem value="Client B">Client B</MenuItem>

//                                 </Select>
//                             </div>
//                             <div>
//                                 <input type="file" />
//                             </div>
//                         </div>
//                     )}
//                 </DialogContent>
//                 <DialogActions>                   
//                     <Button onClick={() => setShowDialog(false)} className='CancelButton' >Cancel</Button>
//                     <Button onClick={handleSave} className='SaveButton'>Save</Button>
//                 </DialogActions>
//             </Dialog>
//         </div>
//     );
// };

// export default UploadComponent;

import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Radio, RadioGroup, FormControlLabel, Select, MenuItem, InputLabel } from '@mui/material';
import { Upload, Close } from '@mui/icons-material';
import styles from './Upload.module.scss';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

const UploadComponent = (props: any) => {
    const { control, handleSubmit } = useForm();
    const [showDialog, setShowDialog] = useState(false);
    const [documentType, setDocumentType] = useState('');
    // const [projectName, setProjectName] = useState('');
    // const [clientName, setClientName] = useState('');
    // const [isUnitDocument, setIsUnitDocument] = useState(false);
    // const [question1, setQuestion1] = useState('');
    // const [question2, setQuestion2] = useState('');
    // const [selectedUnit, setSelectedUnit] = useState('');

    const handleSave: SubmitHandler<FormData> = (data) => {
        setShowDialog(false);
        // Handle form submission here
    };

    const openDialog = () => {
        setDocumentType('');
        setShowDialog(true);
    };

    // const closeFunction = () => {};

    return (
        <div>
            <Button className={styles.uploadButton}
                startIcon={<Upload />}
                onClick={openDialog}
            >
                Upload Documents
            </Button>

            <Dialog
                open={showDialog}
                onClose={() => setShowDialog(false)}
                maxWidth="sm"
                fullWidth
                // BackdropProps={{ onClick: closeFunction }}
            >
                <DialogTitle>
                    Upload Documents
                <Close onClick={() => setShowDialog(false)} style={{ cursor: 'pointer', position: 'absolute', right: '8px', top: '8px' }} />
                </DialogTitle>
                <DialogContent className='ProjectDialogue'>
                    <RadioGroup
                        value={documentType}
                        onChange={(e) => setDocumentType(e.target.value)}
                    >
                        <FormControlLabel value="Project" control={<Radio />} label="Project Document" />
                        <FormControlLabel value="Client" control={<Radio />} label="Client Document" />
                    </RadioGroup>
                    {documentType === 'Project' && (
                        <form onSubmit={handleSubmit(handleSave)}>
                            <div>
                                <InputLabel htmlFor="project-name">Project Name</InputLabel>
                                <Controller
                                    name="projectName"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <Select className={styles.Projectfield}
                                            {...field}
                                        >
                                            <MenuItem value="">None</MenuItem>
                                            <MenuItem value="Project A">Project A</MenuItem>
                                            <MenuItem value="Project B">Project B</MenuItem>
                                        </Select>
                                    )}
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <InputLabel htmlFor="client-name">Client Name</InputLabel>
                                <Controller
                                    name="clientName"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                        >
                                            <MenuItem value="">None</MenuItem>
                                            <MenuItem value="Client A">Client A</MenuItem>
                                            <MenuItem value="Client B">Client B</MenuItem>
                                        </Select>
                                    )}
                                />
                                <FormControlLabel
                                    control={
                                        <Controller
                                            name="isUnitDocument"
                                            control={control}
                                            defaultValue={false}
                                            render={({ field }) => (
                                                <Radio
                                                    {...field}
                                                    checked={field.value}
                                                />
                                            )}
                                        />
                                    }
                                    label="Is this a Unit Document?"
                                />
                                <InputLabel htmlFor="select-unit">Select Unit</InputLabel>
                                <Controller
                                    name="selectedUnit"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                        >
                                            <MenuItem value="">None</MenuItem>
                                            <MenuItem value="Unit A">Unit A</MenuItem>
                                            <MenuItem value="Unit B">Unit B</MenuItem>
                                        </Select>
                                    )}
                                />
                            </div>
                            <div>
                                <input type="file" />
                            </div>
                            <div className='Question1'>
                                <InputLabel htmlFor="question1">Question 1</InputLabel>
                                <Controller
                                    name="question1"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField {...field} />
                                    )}
                                />
                            </div>
                            <div className='Question2'>
                                <InputLabel htmlFor="question2">Question 2</InputLabel>
                                <Controller
                                    name="question2"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField {...field} />
                                    )}
                                />
                            </div>
                            <DialogActions>
                                <Button onClick={() => setShowDialog(false)} className='CancelButton' >Cancel</Button>
                                <Button type="submit" className='SaveButton'>Save</Button>
                            </DialogActions>
                        </form>
                    )}
                    {documentType === 'Client' && (
                        <form onSubmit={handleSubmit(handleSave)}>
                            <div>
                                <InputLabel htmlFor="client-name">Client Name</InputLabel>
                                <Controller
                                    name="clientName"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <Select className={styles.Cleintfield}
                                            {...field}
                                        >
                                            <MenuItem value="">None</MenuItem>
                                            <MenuItem value="Client A">Client A</MenuItem>
                                            <MenuItem value="Client B">Client B</MenuItem>
                                        </Select>
                                    )}
                                />
                            </div>
                            <div>
                                <input type="file" />
                            </div>
                            <DialogActions>
                                <Button onClick={() => setShowDialog(false)} className='CancelButton' >Cancel</Button>
                                <Button type="submit" className='SaveButton'>Save</Button>
                            </DialogActions>
                        </form>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default UploadComponent;
