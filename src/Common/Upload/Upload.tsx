import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Radio, RadioGroup, FormControlLabel, MenuItem, InputLabel, Stack, IconButton, Grid, Checkbox, FormHelperText } from '@mui/material';
import { Upload } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import styles from './Upload.module.scss';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import Button from '@mui/material/Button';


const UploadComponent = (props: any) => {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const [showDialog, setShowDialog] = useState(false);
    const [documentType, setDocumentType] = useState('');
    const [isUnitDocumentChecked, setIsUnitDocumentChecked] = useState(false);


    const handleSave: SubmitHandler<FormData> = (data) => {
        setShowDialog(false);
    };

    const documentTypes = [
        { id: 1, label: "Project" },
        { id: 2, label: "Client" }
    ];

    const openDialog = () => {
        setDocumentType('');
        setShowDialog(true);
    };

    const handleCancel = () => {
        // onClose();
        setShowDialog(false);
      };

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
                onClose={handleCancel}
                maxWidth="md"
                fullWidth
            > 

                {/* <DialogTitle>
                    Upload Documents
                    <IconButton
                        aria-label="close"
                        onClick={() => setShowDialog(false)}
                        sx={{
                            position: 'absolute',
                            right: "21px",
                            top: "21px",
                            color: (theme: any) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle> */}
                    {/* <DialogTitle>
                    Upload Document
                    <IconButton
                        aria-label="close"
                        onClick={handleCancel}
                        sx={{
                            position: 'absolute',
                            right: "14px",
                            top: "8px",
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton> */}
{/*                     
                </DialogTitle> */}
                 <DialogTitle >

                    <div className="d-flex flex-column">
                    <div className="d-flex justify-content-between
                            align-items-center relative">
                        <h4 style={{ margin: '0', color: '#125895' }}>
                        Upload Document</h4>
                    </div>
                    <div style={{
                        height: '4px', width: '100%',
                        backgroundColor: '#125895'
                    }} />
                    </div>
                    </DialogTitle>
                    <IconButton
                    aria-label="close"
                    onClick={handleCancel}
                    sx={{
                    position: "absolute",
                    right: "14px",
                    top: "8px",
                    color: (theme: any) => theme.palette.grey[500],
                    }}
                    >
                    <CloseIcon />
                    </IconButton>
                <DialogContent className={styles.ProjectDialogue}>
                    <RadioGroup
                        row
                        name="row-radio-buttons-group"
                        value={documentType}
                        onChange={(e) => setDocumentType(e.target.value)}
                    >
                        {documentTypes.map((docType) => (
                            <FormControlLabel key={docType.id} value={docType.label} control={<Radio />} label={docType.label} />
                        ))}
                    </RadioGroup>
                    {documentType === 'Project' && (
                        <form onSubmit={handleSubmit(handleSave)}>
                            <Stack direction={"column"} gap={3}>
                                <Grid container spacing={2}>
                                    <Grid item sm={12}>
                                        <Controller
                                            name="projectName"
                                            control={control}
                                            defaultValue=""
                                            rules={{ required: 'Project Name is required' }}
                                            render={({ field }) => (
                                                <>
                                                    <InputLabel htmlFor="project-name">Project Name</InputLabel>
                                                    <TextField
                                                        {...field}
                                                        id="project-name"
                                                        fullWidth
                                                        variant="outlined"
                                                        select
                                                        size="small"
                                                        required
                                                        label=""
                                                        error={!!errors.projectName}
                                                    >
                                                        <MenuItem value="">None</MenuItem>
                                                        <MenuItem value="Project A">Project A</MenuItem>
                                                        <MenuItem value="Project B">Project B</MenuItem>
                                                    </TextField>
                                                    <FormHelperText error>{errors.projectName && errors.projectName.message}</FormHelperText>
                                                </>
                                            )}
                                        />
                                    </Grid>

                                    <Grid item sm={6}>
                                        <Controller
                                            name="clientName"
                                            control={control}
                                            defaultValue=""
                                            rules={{ required: 'Client Name is required' }}
                                            render={({ field }) => (
                                                <>
                                                    <InputLabel htmlFor="client-name">Client Name</InputLabel>
                                                    <TextField
                                                        {...field}
                                                        id="client-name"
                                                        fullWidth
                                                        variant="outlined"
                                                        select
                                                        size="small"
                                                        required
                                                        label=""
                                                        error={!!errors.clientName}
                                                    >
                                                        <MenuItem value="">None</MenuItem>
                                                        <MenuItem value="Client A">Client A</MenuItem>
                                                        <MenuItem value="Client B">Client B</MenuItem>
                                                    </TextField>
                                                    <FormHelperText error>
                                                        {errors.clientName && errors.clientName.message}
                                                    </FormHelperText>
                                                </>
                                            )}
                                        />
                                    </Grid>

                                    <Grid item sm={6}>
                                        <Stack direction="row" alignItems="center">
                                            <Checkbox checked={isUnitDocumentChecked}
                                                onChange={(e) => setIsUnitDocumentChecked(e.target.checked)}
                                                size="small" sx={{ p: 0, mr: 2 }} />
                                            <InputLabel>Is Unit Document</InputLabel>
                                        </Stack>
                                        {<Controller
                                            name="unitDocument"

                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    id="is-unit-document"
                                                    fullWidth
                                                    select
                                                    disabled={!isUnitDocumentChecked}
                                                    variant="outlined"
                                                    placeholder="Select Unit..."
                                                    size="small"
                                                    required
                                                >
                                                    <MenuItem value="">None</MenuItem>
                                                    <MenuItem value="Option A">Option A</MenuItem>
                                                    <MenuItem value="Option B">Option B</MenuItem>
                                                </TextField>
                                            )}
                                        />}
                                    </Grid>

                                    <Grid item sm={12}>
                                        <InputLabel htmlFor="project-document">Upload Document</InputLabel>
                                        <input type="file" id="project-document" />
                                    </Grid>

                                    <Grid item sm={12} sx={{
                                        display: 'flex', alignItems: 'center',
                                        justifyContent: 'space-between'
                                    }}>
                                        <InputLabel htmlFor="question-one" sx={{ width: '15%' }}>Question 1:</InputLabel>
                                        <Controller
                                            name="questionOne"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    id="question-one"
                                                    fullWidth
                                                    variant="outlined"
                                                    size="small"
                                                    required
                                                    label=""
                                                    error={!!errors.questionOne}
                                                />
                                            )}
                                        />
                                        <FormHelperText error>{errors.questionOne && errors.questionOne.message}</FormHelperText>
                                    </Grid>
                                    <Grid item sm={12} sx={{
                                        display: 'flex', alignItems: 'center',
                                        justifyContent: 'space-between'
                                    }}>
                                        <InputLabel htmlFor="question-two" sx={{ width: '15%' }}>Question 2:</InputLabel>
                                        <Controller
                                            name="questionTwo"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    id="question-two"
                                                    fullWidth
                                                    variant="outlined"
                                                    size="small"
                                                    required
                                                    label=""
                                                    error={!!errors.questionTwo}
                                                />
                                            )}
                                        />
                                        <FormHelperText error>{errors.questionTwo && errors.questionTwo.message}</FormHelperText>
                                    </Grid>
                                </Grid>
                            </Stack>
                            <DialogActions>
                                <Button onClick={() => setShowDialog(false)} className='CancelButton' >Cancel</Button>
                                <Button type="submit" className='SaveButton'>Save</Button>
                            </DialogActions>
                           {/* <DialogActions>
                    <Button onClick={handleSave} variant="contained" color="primary">
                        Save
                    </Button>
                    <Button onClick={handleCancel} variant='outlined'>Cancel</Button>
                </DialogActions> */}
                        </form>
                    )}
                    {documentType === 'Client' && (
                        <form onSubmit={handleSubmit(handleSave)}>
                            <Stack direction={"column"} gap={3}>
                                <Grid container spacing={2}>
                                    <Grid item sm={12}>
                                        <Controller
                                            name="clientName"
                                            control={control}
                                            defaultValue=""
                                            rules={{ required: 'Client Name is required' }}
                                            render={({ field }) => (
                                                <>
                                                    <InputLabel htmlFor="client-name">Client Name</InputLabel>
                                                    <TextField
                                                        {...field}
                                                        id="client-name"
                                                        fullWidth
                                                        variant="outlined"
                                                        select
                                                        size="small"
                                                        required
                                                        label=""
                                                        error={!!errors.clientName}
                                                    >
                                                        <MenuItem value="">None</MenuItem>
                                                        <MenuItem value="Client A">Client A</MenuItem>
                                                        <MenuItem value="Client B">Client B</MenuItem>
                                                    </TextField>
                                                    <FormHelperText error>{errors.clientName && errors.clientName.message}</FormHelperText>
                                                </>
                                            )}
                                        />
                                    </Grid>
                                    <Grid item sm={12}>
                                        <InputLabel htmlFor="client-document">Upload Document</InputLabel>
                                        <input type="file" id="client-document" />
                                    </Grid>
                                </Grid>
                            </Stack>
                            <DialogActions>
                                <Button onClick={() => setShowDialog(false)} className='CancelButton' >Cancel</Button>
                                <Button type="submit" className='SaveButton'>Save</Button>
                            </DialogActions>
                        </form>
                    )}
                </DialogContent>
            </Dialog>
        </div >
    );
};

export default UploadComponent;


// import React, { useState } from 'react';
// import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Radio, RadioGroup, FormControlLabel, MenuItem, InputLabel, Stack, IconButton, Grid, Checkbox, FormHelperText } from '@mui/material';
// import { Upload } from '@mui/icons-material';
// import CloseIcon from '@mui/icons-material/Close';
// import styles from './Upload.module.scss';
// import { useForm, Controller, SubmitHandler } from 'react-hook-form';

// const UploadComponent = (props: any) => {
//     const { control, handleSubmit, formState: { errors } } = useForm();
//     const [showDialog, setShowDialog] = useState(false);
//     const [documentType, setDocumentType] = useState('');
//     const [isUnitDocumentChecked, setIsUnitDocumentChecked] = useState(false);


//     const handleSave: SubmitHandler<FormData> = (data) => {
//         setShowDialog(false);
//     };

//     const documentTypes = [
//         { id: 1, label: "Project" },
//         { id: 2, label: "Client" }
//     ];

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

            
//         </div >
//     );
// };

// export default UploadComponent;