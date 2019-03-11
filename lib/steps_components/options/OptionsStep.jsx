import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Option from './Option';
import OptionElement from './OptionElement';
import Options from './Options';
import OptionsStepContainer from './OptionsStepContainer';

class OptionsStep extends Component {

  ref = React.createRef()

  onOptionClick = ({ value }) => {
    const { triggerNextStep } = this.props;

    triggerNextStep({ value });
  }

  componentDidMount(){
    if(this.ref){
      this.ref.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  renderOption = (option) => {
    const { bubbleOptionStyle, step } = this.props;
    const { user } = step;
    const { value, label } = option;

    return (
      <Option
        key={value}
        className="rsc-os-option"
      >
        <OptionElement
          className="rsc-os-option-element"
          style={bubbleOptionStyle}
          user={user}
          onClick={() => this.onOptionClick({ value })}
        >
          {label}
        </OptionElement>
      </Option>
    );
  }

  render() {
    const { step } = this.props;
    const { options } = step;

    return (
      <OptionsStepContainer className="rsc-os"
        ref={x => {
          this.ref = x
        }}
      >
        <Options className="rsc-os-options">
          {Object.values(options).map(this.renderOption)}
        </Options>
      </OptionsStepContainer>
    );
  }
}

OptionsStep.propTypes = {
  bubbleOptionStyle: PropTypes.objectOf(PropTypes.any).isRequired,
  step: PropTypes.objectOf(PropTypes.any).isRequired,
  triggerNextStep: PropTypes.func.isRequired,
};

export default OptionsStep;
