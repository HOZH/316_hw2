import React, { Component } from 'react'
import PropTypes from 'prop-types';
import uuid from 'uuid'
export class ItemScreen extends Component {


    state = {
        //    current_item:{
        // assigned_to: null,
        // description: null,
        // key: null,
        // completed: null,
        // due_date: null
        //    }
        assigned_to: this.props.todoItem.assigned_to||"",
        description: this.props.todoItem.description||"",
        // key: this.props.todoItem.key||"",
        key: this.props.todoItem.key,
        completed: this.props.todoItem.completed||false,
        due_date: this.props.todoItem.due_date||""
    }




    Onchange = (e) => {

        this.setState({ [e.target.name]: e.target.value })
        console.log(e.target.value);

    }

    goBack2List = (e) => {


        this.props.loadList(this.props.state.currentList)
    }


    updateItem = () => {

        const temp = {
            assigned_to: this.state.assigned_to,
            description: this.state.description,
            key: (this.props.todoItem.completed === null)?uuid.v4(): this.state.key,
            completed: this.state.completed,
            due_date: this.state.due_date
        }


        if ((this.props.todoItem.completed === null))

            this.props.addItem(temp)

        else

            this.props.updateItem(temp)






    }


    OnCheckBoxChange = (e) => {


        // console.log(e)

        this.setState({completed:!this.state.completed})


    }

    render() {



        const isNew = (this.props.todoItem.completed === null)


        // if (!isNew) {

        //     const temp = {
        //         assigned_to: this.props.todoItem.assigned_to,
        //         description: this.props.todoItem.description,
        //         key: this.props.todoItem.key,
        //         completed: this.props.todoItem.completed,
        //         due_date: this.props.todoItem.due_date
        //     }

        //     // this.setState({current_item:temp})
        //     this.setState({ assigned_to: temp.assigned_to })
        //     this.setState({ description: temp.description })
        //     this.setState({ key: temp.key })
        //     this.setState({ completed: temp.completed })
        //     this.setState({ due_date: temp.due_date })

        // }



        console.log(this.props.due_date);
        var initChecked = this.state.completed;

        return (


            <div id="todo_item">
                <h3 id="item_heading">Item</h3>

                <div id="item_form_container">

                    <div id="item_description_prompt" className="item_prompt" >Description:</div>
                    <input id="item_description_textfield" className="item_input" type="input" name="description" value={this.state.description} onChange={this.Onchange} />

                    <div id="item_assigned_to_prompt" className="item_prompt">Assigned To:</div>
                    <input id="item_assigned_to_textfield" className="item_input" type="input" name="assigned_to" value={this.state.assigned_to} onChange={this.Onchange} />
                    <div id="item_due_date_prompt" className="item_prompt">Due Date:</div>
                    <input id="item_due_date_picker" className="item_input" type="date" name="due_date" value={this.state.due_date} onChange={this.Onchange} />
                    <div id="item_completed_prompt" className="item_prompt">Completed:</div>
                    <input id="item_completed_checkbox" className="item_input" type="checkbox" name="completed"  checked={this.state.completed} onChange={this.OnCheckBoxChange} ></input>



                </div>


                <button id="item_form_submit_button" className="item_button" onClick={this.updateItem}>Submit</button>
                <button id="item_form_cancel_button" className="item_button" onClick={this.goBack2List}>Cancel</button>
            </div>
        )
    }
}

ItemScreen.propTypes = {
    // currentScreen: PropTypes.string.isRequired,
    todoItem: PropTypes.object.isRequired
}

export default ItemScreen
