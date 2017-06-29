import React from 'react';

require('normalize.css/normalize.css');
require('styles/List.scss');

class ListComponent extends React.Component {
  /**
   * Constructor for ListComponent
   * @param  {Object} props React props object
   */
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false
    };

    this.onInputChange = this.onInputChange.bind(this);
  }

  /**
   * Update checked status on every change
   * @param  {Object} event React event object
   */
  onInputChange(event) {
    const { isChecked } = this.state;
    const { onSelectUser } = this.props;
    const { name } = this.props.user;
    this.setState({
      isChecked: !isChecked
    });
    // Execute select user from parent component
    onSelectUser(name);
  }

  /**
   * React render component method
   * @return {Object} React component
   */
  render() {
    const { name } = this.props.user;
    const { email } = this.props.user;
    const { isChecked } = this.state;
    return (<div className="list">
      <div className="list__checkbox">
        <input
          type="checkbox"
          checked={isChecked}
          value={ name }
          onChange={this.onInputChange} />
      </div>
      <div className="list__info">
        <div className="list__info-element">
          {name}
        </div>
        <div className="list__info-element">
          {email}
        </div>
      </div>
    </div>);
  }
}

ListComponent.defaultProps = {
  user: []
};

export default ListComponent;
