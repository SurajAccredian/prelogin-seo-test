import Accordion from '@mui/joy/Accordion';
import AccordionDetails, {
} from '@mui/joy/AccordionDetails';
import AccordionSummary, {
} from '@mui/joy/AccordionSummary';
import { Step, Stepper } from '@mui/joy';

import { StepIcon, StepLabel } from '@mui/material';


const BlueStepIcon = (props) => {
  return <StepIcon {...props} style={{ color: '#1A73E8' }} />;
};


const Special = ({ curriculum, index, expanded, handleChange, level = 0 }) => {
  return (
    <Accordion key={index}
      sx={{
        '&:hover': {
          backgroundColor: '',
        },
        padding: "0px 1.5rem"
      }}
      expanded={expanded[`panel-special-${index}-${level}`] || false}
      onChange={handleChange(`panel-special-${index}-${level}`)}
      // expanded={expanded[`panel${index}-${level}`] || false}
      // onChange={handleChange(`panel${index}-${level}`)}
    >
      <AccordionSummary>
        <div className='w-full flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <h1 className='text-sm md:text-base font-semibold'>
              <span className='font-bold'>Project {index}</span> : {" "}
              {curriculum?.title}
            </h1>
            <h1 className='text-xs text-nowrap font-medium max-md:hidden'>
              <span className='text-orange-500 mr-2'>•</span>
              Featured
            </h1>
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <Stepper orientation="vertical">
          {curriculum?.points.map((point, index) => (
            <Step key={index}
              sx={{
                '& .MuiStepLabel-root .Mui-active': {
                  color: '#1A73E8',
                },
                color: "#1A73E8"
              }}
            >
              <StepLabel StepIconComponent={BlueStepIcon}>
                <h1 className='text-sm font-medium'>{point}</h1>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </AccordionDetails>
      <div className='w-full border-b' />
    </Accordion>
  )
}

export default Special