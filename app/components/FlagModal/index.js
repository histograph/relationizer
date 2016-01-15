import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import { editFlagType, editFlagValue, resetFlag } from './../../actions/flag';
import admin from '../../utils/admin';

import SelectTypeStep from './SelectTypeStep';
import SelectValueStep from './SelectValueStep';
import ConfirmStep from './ConfirmStep';

import './index.css';

const styles = {
  overlay: {
    backgroundColor: 'rgba(38, 70, 83, 0.54)',
  },
  content: {
    overflow: 'visible',
    position: 'relative',
    padding: 0,
    border: 0,
    top: '100px',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '420px',
    backgroundColor: 'transparent',
    borderRadius: '0',
  },
};

const FlagModal = React.createClass({
  propTypes: {
    flag: PropTypes.object.isRequired,
  },

  getInitialState() {
    return {
      step: 1,
      isOpen: true,
    };
  },

  render() {
    const { flag } = this.props;
    const { step, isOpen } = this.state;
    const hasValidFlagType = !!flag.type;
    const hasValidFlagValue = !!(flag.value && (flag.value.type || flag.value.concept));
    const buttons = {
      showPrev: step !== 1,
      showNext: step !== 3,
      disableNext: (step === 1 && !hasValidFlagType) || (step === 2 && !hasValidFlagValue),
      showDone: step === 3,
    };

    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={this.handleClose}
        style={styles}
      >
        <div className="FlagModal-header">
          Flag this concept
        </div>
        <div className="FlagModal-content">
          {{
            1: <SelectTypeStep flag={flag} onSelect={this._onSelectType}/>,
            2: <SelectValueStep flag={flag} onSelect={this._onSelectValue}/>,
            3: <ConfirmStep flag={flag}/>,
          }[step]}
        </div>
        <div className="FlagModal-footer">
          {buttons.showPrev ? <button className="button" onClick={this.handleBackClick}>Back</button> : null}
          {buttons.showNext ? <button className="button" onClick={this.handleNextClick} disabled={buttons.disableNext}>Next</button> : null}
          {buttons.showDone ? <button className="button button-primary" onClick={this.handleDoneClick}>Done</button> : null}
        </div>
      </Modal>
    );
  },

  handleClose() {
    this.props.dispatch(resetFlag());
  },

  handleBackClick() {
    this.setState({
      step: this.state.step - 1,
    });
  },

  handleNextClick() {
    this.setState({
      step: this.state.step + 1,
    });
  },

  handleDoneClick() {
    this.props.dispatch(admin.actions.flag({}, {
      body: JSON.stringify({
        origin: this.props.flag.concept,
        type: this.props.flag.type,
        value: this.props.flag.value.type,
        target: this.props.flag.value.concept,
      }),
    }, (err) => {
      if (err) {
        window.alert('Something went wrong');
      } else {
        this.props.dispatch(resetFlag());
      }
    }));
  },

  _onSelectType(type) {
    this.props.dispatch(editFlagType(type));
    this.setState({
      step: 2,
    });
  },

  _onSelectValue(value) {
    this.props.dispatch(editFlagValue(value));
    this.setState({
      step: 3,
    });
  },
});

export default connect(
  (state) => (state)
)(FlagModal);
