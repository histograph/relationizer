import React, { PropTypes } from 'react';

const FLAGS = [
  { type: 'duplicate', title: 'Mark as duplicate' },
  { type: 'missing-relation', title: 'Add missing relation' },
];

const SelectTypeStep = React.createClass({
  propTypes: {
    flag: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired,
  },

  render() {
    const { flag, onSelect } = this.props;

    return (
      <div>
        {FLAGS.map((row) =>
          <div key={row.type}>
            <label>
              <input
                type="radio"
                name="flag"
                value={row.type}
                onChange={() => onSelect(row.type)}
                defaultChecked={row.type === flag.type}
              />
              <span>{row.title}</span>
            </label>
          </div>
        )}
      </div>
    );
  },
});

export default SelectTypeStep;
