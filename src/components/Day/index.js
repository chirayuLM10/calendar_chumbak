import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import ReminderForm from "./ReminderForm";
import Reminder from "./Reminder";
import _sortBy from "lodash/sortBy";
import "./index.css";

const defaultColor = "#000";

class Day extends React.Component {
  state = {
    editReminder: {
      id: null,
      time: null,
      description: null,
      color: defaultColor
    }
  };

  handleSetColor = data => {
    console.log('data for color', data);
    };

  handleSetEdit = reminder => {
    console.log('reminder data', reminder);
  };

  handleCreateUpdateReminder = (e, update) => {
    console.log('update', update);
  };

  handleDeleteReminder = id => {
    console.log('id to delete', id);
  };

  render() {
    const reminders =
      _sortBy(this.props.reminders[this.props.date], "time") || [];

    const cssClasses = this.props.firstDayIndex
      ? `day first-index-${this.props.firstDayIndex}`
      : "day";

    return (
      <article className={cssClasses}>
        {!this.props.editDay && (
          <button
            className="btn-new-reminder"
            onClick={() => this.props.handleSetEditDay(this.props.day)}
          >
            <i className="fas fa-plus-circle" />
          </button>
        )}

        {this.props.editDay === this.props.day ? (
          <ReminderForm
            reminder={this.state.editReminder}
            handleSetColor={this.handleSetColor}
            handleSetEditDay={this.props.handleSetEditDay}
            handleCreateUpdateReminder={this.handleCreateUpdateReminder}
            defaultColor={defaultColor}
          />
        ) : (
          <React.Fragment>
            <header>{this.props.day}</header>

            {reminders.length
              ? reminders.map((reminder, i) => {
                  return (
                    <Reminder
                      key={i}
                      reminder={reminder}
                      handleSetEdit={this.handleSetEdit}
                      handleDeleteReminder={this.handleDeleteReminder}
                    />
                  );
                })
              : null}
          </React.Fragment>
        )}
      </article>
    );
  }
}

const mapStateToProps = state => {
  return {
    reminders: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createReminder: payload => dispatch(actions.createReminder(payload)),
    updateReminder: payload => dispatch(actions.updateReminder(payload)),
    deleteReminder: (date, id) => dispatch(actions.deleteReminder(date, id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Day);
