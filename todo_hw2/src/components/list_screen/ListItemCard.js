import React, { Component } from 'react'

export class ListItemCard extends Component {


    moveUp=(e)=>{

        e.stopPropagation();

        if (!this.props.first)


        this.props.moveUp(this.props.listItem)

    }

    moveDown = (e) => {

        e.stopPropagation();


        if (!this.props.last)

        this.props.moveDown(this.props.listItem)

    }


    deleteItem = (e)=>{

        e.stopPropagation();

        this.props.deleteItem(this.props.listItem)



    }

    editItem = (e)=>{

        e.stopPropagation();

        this.props.editItem(this.props.listItem)

    }
    
    render() {
        // console.log(this.props.listItem)
        // console.log(this.props.listItem.description)

        // console.log(this.props.listItem.assignedTo)

        return (
            <div className='list_item_card' onClick={this.editItem}>
                <div className='list_item_card_description'>
                    {this.props.listItem.description}
                </div>
                <div className='list_item_card_assigned_to'>
                    Assigned To: <strong>{this.props.listItem.assigned_to}</strong>
                </div>
                <div className='list_item_card_due_date'>
                    {this.props.listItem.due_date}
                </div>
                <div className={this.props.listItem.completed ? 'list_item_card_completed' : 'list_item_card_not_completed'}>
                    {this.props.listItem.completed ? 'Complete' : "Pending"}
                </div>
                <div className="list_item_card_toolbar">
                    <span className={`list_item_card_button ${this.props.first ? 'disabled' : ''}`} onClick={this.moveUp }>⇧</span>
                    <span className={`list_item_card_button ${this.props.last ? 'disabled' : ''}`} onClick={this.moveDown}>⇩</span>
                    <span className="list_item_card_button" onClick={this.deleteItem}>✕</span>

                </div>
            </div>
        )
    }
}

export default ListItemCard
