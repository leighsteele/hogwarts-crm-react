import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles(theme => ({
  root: {
    width: 285,
  },
  margin: {
    height: theme.spacing(3),
  },
}));

const marks = [
  {
    value: 5,
    label: '/5',
  },
];

export default function DiscreteSlider(props) {
  const classes = useStyles();

  return (
    <div className="skills-custom mt-2 ml-1">
      <div className={classes.root}>
        <Slider
          defaultValue={props.levelState}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={1}
          marks={marks}
          min={0}
          max={5}
          onChange={(e) => props.handleSetLevelState(e, props.name)}
        />
      </div>
    </div>
  );
}
