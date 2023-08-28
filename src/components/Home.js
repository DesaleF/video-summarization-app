import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {Grid, Box} from '@mui/material';
import Typography from '@mui/material/Typography';
import VideoUpload from '../components/VideoUpload';
import VideoList from '../components/VideoList';
import {Route, Routes } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slider, { SliderValueLabelProps } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import FormControlLabel, {
  FormControlLabelProps,
} from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import ProcessedVideos from './ProcessedVideos';


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 4 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

// radion button
interface StyledFormControlLabelProps extends FormControlLabelProps {
  checked: boolean;
}

const StyledFormControlLabel = styled((props: StyledFormControlLabelProps) => (
  <FormControlLabel {...props} />
))(({ theme, checked }) => ({
  '.MuiFormControlLabel-label': checked && {
    color: theme.palette.primary.main,
  },
}));

function MyFormControlLabel(props: FormControlLabelProps) {
  const radioGroup = useRadioGroup();

  let checked = false;

  if (radioGroup) {
    checked = radioGroup.value === props.value;
  }

  return <StyledFormControlLabel checked={checked} {...props} />;
}

const updateProcessingSettings = (e) => {
        e.preventDefault();
        // Handle saving the processing settings change here...
};

export default function Home() {
    const [value, setValue] = React.useState(0);
    const [videos, setVideos] = React.useState([]);

    const addVideo = (newVideos) => {
        setVideos(prevVideos => {
            return [...prevVideos, ...newVideos];
        });
    };

    const deleteVideo = (id) => {
        const updatedVideos = videos.filter(video => video.id !== id);
        setVideos(updatedVideos);
    };
    const removeAllVideos = () => {
          setVideos([]); // Set the videos state to an empty array
    };

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const [sampleRate, setSampleRate] = React.useState(1);
    const [openSnack, setOpen] = React.useState(false);

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };
    const action = (
        <React.Fragment>
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
        >
            <CloseIcon fontSize="small" />
        </IconButton>
        </React.Fragment>
    );
    
    const handleSampleRateChange = (event) => {
        const value = event.target.value;
        if (value < 1) {
            // Handle the out-of-range value (e.g., reset to default or set to the closest boundary)
            setOpen(true);
            setSampleRate(5);
        } else {
            setSampleRate(value);
        }
    }

    const videoProcessingType = [
        { value: 'sampleFrame', label: 'Sample Frames', },
        { value: 'allFrame', label: 'All Frames',},
    ];
    const summaryType = [
        { value: 'keyFrame', label: 'Key Frame', },
        { value: 'shortClip', label: 'Short Clip',},
    ];

    function valuetext(value: number) {
    return value;
    }
    return (
        <Box sx={{ width: '100%' }}>
            <Grid container justifyContent="center" spacing={3}>
                <Grid item xs={12} sm={12} md={8}>
                    <Tabs variant="fullWidth" value={value} onChange={handleChange} aria-label="First level tab">
                        <Tab label="Videos" {...a11yProps(0)} />
                        <Tab label="Processed Videos" {...a11yProps(1)} />
                        <Tab label="Processing Setting" {...a11yProps(2)} />
                    </Tabs>
                </Grid>
            </Grid>
            <CustomTabPanel value={value} index={0}>
                <Routes>
                    <Route path="/" element={
                        <Box className="content-wrapper" py={3}> {/* Add vertical padding */}
                            <VideoUpload onUpload={addVideo} videos={videos} />
                            <Box mt={3}> {/* Add margin-top to space out from VideoUpload */}
                                <VideoList videos={videos} onDelete={deleteVideo} onRemoveAll={removeAllVideos}/>
                            </Box>
                        </Box>
                    } />
                </Routes>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                        <ProcessedVideos />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <Grid container justifyContent="center" spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Box 
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                            onSubmit={updateProcessingSettings}
                            >
                            <div>
                                <TextField
                                    id="outlined-video-processing-option"
                                    select
                                    label="Select Video Processing Option"
                                    defaultValue="sampleFrame"
                                    helperText="Please select processing option"
                                >
                                {videoProcessingType.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                    </MenuItem>
                                ))}
                                </TextField>
                                <TextField
                                    id="outlined-sample-rate"
                                    label="Sample Rate"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    defaultValue={5}
                                    variant="outlined"
                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 1 }}
                                    value={sampleRate}
                                    onChange={handleSampleRateChange}
                                >
                                </TextField>
                                <Snackbar
                                    open={openSnack}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'center',
                                    }}
                                    autoHideDuration={6000}
                                    onClose={handleClose}
                                    message="Sample Rate Must be greater than 0. Default: 5"
                                    action={action}
                                />
                            </div>
                            <div>
                                <TextField
                                    id="outlined-video-summary-type"
                                    select
                                    label="Select Summary Type"
                                    defaultValue="keyFrame"
                                    helperText="Please select summary type"
                                >
                                {summaryType.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                    </MenuItem>
                                ))}
                                </TextField>
                            </div>
                            <div>
                                <Typography gutterBottom sx={{ mt: 3, ml: 2}}>Cluster Level</Typography>
                                <Slider sx={{ 
                                        ml: 2, 
                                    }}
                                    aria-label="Cluster Threshold"
                                    defaultValue={0.5}
                                    step={0.05}
                                    min={0.05}
                                    max={1}
                                    valueLabelDisplay="auto"
                                />
                            </div>
                            <div>
                                <Typography gutterBottom sx={{ mt: 3, ml: 2}}>Cluster Level</Typography>
                                <Slider sx={{ 
                                        ml: 2, 
                                    }}
                                    aria-label="Cluster Level"
                                    defaultValue={2}
                                    getAriaValueText={valuetext}
                                    step={1}
                                    min={1}
                                    max={5}
                                    valueLabelDisplay="auto"
                                />
                            </div>

                            <div>
                                <Typography gutterBottom sx={{ mt: 3, ml: 2}}>Summary Visualization</Typography>
                                <RadioGroup name="use-radio-group" defaultValue="keyFrame" sx={{ ml: 3}}>
                                <MyFormControlLabel value="keyFrame" label="Key Frame" control={<Radio />} />
                                <MyFormControlLabel value="shortClip" label="Short Clip" control={<Radio />} />
                                </RadioGroup>
                            </div>
                            <div>
                                <Button
                                    type="submit"
                                    size="large"   // Make the button smaller
                                    variant="contained"
                                    color="primary"
                                    sx={{
                                        mt: 2,
                                        mb: 2,
                                        ml: 2
                                    }}>
                                    Apply Change
                                </Button>
                            </div>
                        </Box>
                    </Grid>
                </Grid>
            </CustomTabPanel>
        </Box>
    );
}
