import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import SwapVerticalCircleIcon from '@material-ui/icons/SwapVerticalCircle';
import DiscreteSlider from './Slider';

const SkillsList = (props) => {
    return (
        <div>
            {props.mockSkillsList.map(skill =>
                <div key={skill.name} className="border rounded my-2 p-2">
                    {skill.isExisting &&
                    <div>
                        <div className="d-flex align-items-center justify-content-between px-1">
                            <div>
                                {skill.name} Level
                                <DiscreteSlider name={skill.name} levelState={skill.level} handleSetLevelState={props.handleSetLevelState} />
                            </div>
                            <Tooltip title="Move to desired skills" placement="top" arrow>
                                <button className="m-0 p-0" onClick={() => props.handleMakeExistingClick(skill.name)}>
                                    <SwapVerticalCircleIcon/>
                                </button>
                            </Tooltip>
                        </div>
                    </div>}

                    {!skill.isExisting &&
                    <div className="d-flex align-items-center justify-content-between px-1">
                        {skill.name}
                        <Tooltip title="Move to existing skills" placement="top" arrow>
                            <button className="m-0 p-0" onClick={() => props.handleMakeExistingClick(skill.name)}>
                                <SwapVerticalCircleIcon/>
                            </button>
                        </Tooltip>
                    </div>}
                </div>
            )}
        </div>
    )
}

export default SkillsList;
