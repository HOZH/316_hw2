import React, { Component } from 'react'
import ListItemCard from './ListItemCard'

const ItemSortCriteria = {
    SORT_BY_TASK_INCREASING: "sort_by_task_increasing",
    SORT_BY_TASK_DECREASING: "sort_by_task_decreasing",
    SORT_BY_DUE_DATE_INCREASING: "sort_by_due_date_increasing",
    SORT_BY_DUE_DATE_DECREASING: "sort_by_due_date_decreasing",
    SORT_BY_STATUS_INCREASING: "sort_by_status_increasing",
    SORT_BY_STATUS_DECREASING: "sort_by_status_decreasing"
};

export class ListItemsTable extends Component {


    state = {
        reversed_task_order: false,
        reversed_due_date_order: false,
        reversed_status_order: false
    }

    sortItems = (e) => {
        e.persist()
        // console.log(e.target.innerHTML)

        var key = e.target.innerHTML

        if (key === "Task") {
            this.setState({ reversed_task_order: !this.state.reversed_task_order })
            this.props.sortBy(this.state.reversed_task_order ? ItemSortCriteria.SORT_BY_TASK_DECREASING : ItemSortCriteria.SORT_BY_TASK_INCREASING)



        }

        else if (key === "Due Date") {
            this.setState({ reversed_due_date_order: !this.state.reversed_due_date_order })
            this.props.sortBy(this.state.reversed_due_date_order ? ItemSortCriteria.SORT_BY_DUE_DATE_DECREASING : ItemSortCriteria.SORT_BY_DUE_DATE_INCREASING)

        }
        else {

            this.setState({ reversed_status_order: !this.state.reversed_status_order })
            this.props.sortBy(this.state.reversed_status_order ? ItemSortCriteria.SORT_BY_STATUS_DECREASING : ItemSortCriteria.SORT_BY_STATUS_INCREASING)

        }


    }

    addItem= ()=>{


        this.props.editItem("add",null)

    }
    editItem = (item) => {

        // console.log(111);

        this.props.editItem("edit", item)

    }
    render() {


        // console.log(this.props.todoList)

        return (
            <React.Fragment>
                <div id="list_items_container">
                    <div className="list_item_header_card">
                        <div className="list_item_task_header" onClick={this.sortItems}>Task</div>
                        <div className="list_item_due_date_header" onClick={this.sortItems}>Due Date</div>
                        <div className="list_item_status_header" onClick={this.sortItems}>Status</div>
                    </div>
                    {


// console.log(this.props.todoList)



                        this.props.todoList.items.map((todoItem) => {
                            if (todoItem === this.props.todoList.items[0]) {

                                return <ListItemCard
                                    key={todoItem.key}

                                    first={true}
                                    last = {false}
                                    listItem={todoItem}
                                    moveUp={this.props.moveUp}
                                    moveDown={this.props.moveDown}
                                    deleteItem={this.props.deleteItem}
                                    editItem={this.editItem}

                                    
                                    />

                            }
                            else if (todoItem === this.props.todoList.items[this.props.todoList.items.length-1]) {

                                return <ListItemCard
                                    key={todoItem.key}

                                    first={false}
                                    last={true}
                                    listItem={todoItem}
                                    moveUp={this.props.moveUp}
                                    moveDown={this.props.moveDown}
                                    deleteItem={this.props.deleteItem}
                                    editItem={this.editItem}


                                     />

                            }
                            else {

                                return <ListItemCard
                                    key={todoItem.key}
                                    

                                    first={false}
                                    last={false}
                                    listItem={todoItem}
                                    moveUp = {this.props.moveUp}
                                    moveDown = {this.props.moveDown}
                                    deleteItem={this.props.deleteItem}
                                    editItem={this.editItem}

                                    />

                            }
                        })
                    }

                    <div className="list_item_add_card" onClick={this.addItem}>+</div>
                </div>

                {/* <div className="modal"  data-animation="slideInOutLeft"> */}
                <div className={`modal ${this.props.showTrash ? "is_visible" : ""}`} data-animation="slideInOutLeft">

                    <div className="modal_dialog">
                        <header className="dialog_header">
                            Delete list?
            </header>
                        <section className="dialog_content">
                            <p><strong>Are you sure you want to delete this list?</strong></p>
                        </section>
                        <button onClick={this.props.deleteList}>Yes</button>
                        <button onClick={this.props.hideDialog} >No</button>
                        <footer className="dialog_footer">
                            The list will not be retreivable.
            </footer>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default ListItemsTable
