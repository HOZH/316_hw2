import React, { Component } from 'react';
import testTodoListData from './TestTodoListData.json'
import HomeScreen from './components/home_screen/HomeScreen'
import ItemScreen from './components/item_screen/ItemScreen'
import ListScreen from './components/list_screen/ListScreen'
import uuid from 'uuid'





const jTPS = require("./jtps/jtps")


const AppScreen = {
  HOME_SCREEN: "HOME_SCREEN",
  LIST_SCREEN: "LIST_SCREEN",
  ITEM_SCREEN: "ITEM_SCREEN"
};
const ItemSortCriteria = {
  SORT_BY_TASK_INCREASING: "sort_by_task_increasing",
  SORT_BY_TASK_DECREASING: "sort_by_task_decreasing",
  SORT_BY_DUE_DATE_INCREASING: "sort_by_due_date_increasing",
  SORT_BY_DUE_DATE_DECREASING: "sort_by_due_date_decreasing",
  SORT_BY_STATUS_INCREASING: "sort_by_status_increasing",
  SORT_BY_STATUS_DECREASING: "sort_by_status_decreasing"
};


class App_Transaction {





  constructor(currentApp, prevState, futState, typeOfState) {




    this.currentApp = currentApp


    this.typeOfState = typeOfState


    this.prevState = prevState

    this.futState = futState




  }



  doTransaction() {
    // console.log(this.futState.currentList,"current list")
    this.currentApp.setState({ currentList: this.futState.currentList }, () => {
      // console.log(this.futState.currentList, "current list")
})

    this.currentApp.setState(this.futState)


    this.currentApp.setState(this.futState.currentList)


  }








  undoTransaction() {


    console.log("undoTransaction")
    this.currentApp.setState(this.prevState)
    this.currentApp.setState({ name: this.prevState.currentList.name, owner: this.prevState.currentList.owner })


    // this.currentApp.setState.currentList= this.prevState.currentList
    // this.currentApp.loadList(this.prevState.currentList)
    this.currentApp.loadList(this.currentApp.state.currentList)



  }


}


class App extends Component {


  jtps = new jTPS()

  state = {
    currentScreen: AppScreen.HOME_SCREEN,
    todoLists: testTodoListData.todoLists,
    currentList: null,
    // currentItemSortCriteria: ItemSortCriteria.SORT_BY_TASK_INCREASING,
    // currentItemSortCriteria: ItemSortCriteria.SORT_BY_DUE_DATE_INCREASING,
        currentItemSortCriteria: null,

    todoItem: null,
    name: null,
    owner: null,
  }






  sortCurrentList = (value) => {




    this.sortTasks(value)

  }


  sortTasks = (sortingCriteria) => {

    var temp_ = JSON.parse(JSON.stringify(this.state));
    var temp__ = JSON.parse(JSON.stringify(this.state));
    var temp___ = JSON.parse(JSON.stringify(this.state));
    var temp____ = JSON.parse(JSON.stringify(this.state));

    // temp_.currentItemSortCriteria=sortingCriteria
    temp__.currentItemSortCriteria = sortingCriteria

    temp___.currentItemSortCriteria = sortingCriteria
    temp____.currentItemSortCriteria = sortingCriteria


    // this.setState({ currentItemSortCriteria: sortingCriteria })




    // const newLists = [...this.state.todoLists.map(current => {
    //   if (current === this.state.currentList)
    //     current.items.sort(this.compare);






    //   return current
    // })]

    // console.log(temp____.currentList,this.state.currentList);
    const newLists = [...temp____.todoLists.map(current => {
      // console.log(current, temp____.currentList, current===temp____.currentList);
      if (current.name === temp____.currentList.name && current.owner === temp____.currentList.owner) {
        current.items.sort(this.compare);
        temp__.currentList = current

      }






      return current
    })]
    // console.log(temp____.currentList, this.state.currentList);


    // var temp_newLists = JSON.parse(JSON.stringify(newLists))
    // this.setState({ todoLists: newLists })
    // console.log("new list", newLists);
    temp__.todoLists = newLists

    console.log('warp');
    console.log(temp__.currentItemSortCriteria,sortingCriteria);
    console.log('warp');

    this.jtps.addTransaction(new App_Transaction(this, temp_, temp__, 'sort'))


    // this.setState({ todoLists: newLists })
    // this.setState({
    //   currentList: this.state.todoLists.find(e => {
    //     return e.key === this.state.currentList.key
    //   })
    // })

  }


  isCurrentItemSortCriteria = (testCriteria) => {
    // console.log(this.state.currentItemSortCriteria,testCriteria,this.state.currentItemSortCriteria === testCriteria);
    return this.state.currentItemSortCriteria === testCriteria;
  }
  compare = (item1, item2) => {

    // IF IT'S A DECREASING CRITERIA SWAP THE ITEMS
    if (this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_TASK_DECREASING)
      || this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_DUE_DATE_DECREASING)
      || this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_STATUS_DECREASING)) {
      let temp = item1;
      item1 = item2;
      item2 = temp;
    }
    // SORT BY ITEM DESCRIPTION
    if (this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_TASK_INCREASING)
      || this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_TASK_DECREASING)) {
      if (item1.description < item2.description)
        return -1;
      else if (item1.description > item2.description)
        return 1;
      else
        return 0;
    }
    // SORT BY DUE DATE
    else if (this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_DUE_DATE_INCREASING)
      || this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_DUE_DATE_DECREASING)) {
      let dueDate1 = item1.due_date;
      let dueDate2 = item2.due_date;
      let date1 = new Date(dueDate1);
      let date2 = new Date(dueDate2);
      if (date1 < date2)
        return -1;
      else if (date1 > date2)
        return 1;
      else
        return 0;
    }
    // SORT BY COMPLETED
    else {
      if (item1.completed < item2.completed)
        return -1;
      else if (item1.completed > item2.completed)
        return 1;
      else
        return 0;
    }
  }





  goHome = () => {
    this.setState({ currentScreen: AppScreen.HOME_SCREEN });
    this.setState({ currentList: null });


    this.jtps.clearAllTransactions();
  }

  loadList = (todoListToLoad) => {
    this.setState({ name: todoListToLoad.name, owner: todoListToLoad.owner })
    this.setState({ currentScreen: AppScreen.LIST_SCREEN });
    this.setState({ currentList: todoListToLoad });

  }

  NameOwnerOnChange = (typeOfChange, newValue) => {


    var temp_ = JSON.parse(JSON.stringify(this.state));
    var temp__ = JSON.parse(JSON.stringify(this.state));

    // console.log("type of change");
    var tempList = {
      key: uuid.v4(),
      name: 'Unknown',
      owner: 'Unknown',
      items: [],




    }


    const newLists = [...this.state.todoLists.map(current => {


      // if (current === this.state.currentList) {

      if (current.name === this.state.currentList.name && current.owner === this.state.currentList.owner) {

        if (typeOfChange === "name") {

          temp__.owner = current.owner
          temp__.name = newValue


          current.name = newValue


        }
        else {
          temp__.name = current.name

          temp__.owner = newValue

          current.owner = newValue

        }


        tempList = current



      }

      return current
    })]

    // let temp = {
    //   todoLists: newLists,
    //   // currentList: this.currentApp.state.currentList,
    //   // currentItemSortCriteria: this.currentApp.state.currentItemSortCriteria,
    // }


    temp_.name = temp_.currentList.name
    temp_.owner = temp_.currentList.owner


    temp__.todoLists = newLists
    temp__.currentList = tempList

    this.jtps.addTransaction(new App_Transaction(this, temp_, temp__, 'name'))


    // this.setState({ todoLists: newLists })

  }

  deleteList = () => {
    console.log("deleting")
    this.setState(
      {
        todoLists: [...this.state.todoLists.filter(todo => todo !== this.state.currentList)]
      }
    )


    this.goHome()

  }

  moveUp = (e) => {

    var temp_ = JSON.parse(JSON.stringify(this.state));
    var temp__ = JSON.parse(JSON.stringify(this.state));
    var temp___ = JSON.parse(JSON.stringify(this.state));


    // console.log(e)

    var index = this.state.currentList.items.findIndex(current => {
      // console.log(current, e)
      return current === e
    })
    // console.log(index);

    // var newList = this.state.currentList
    // var temp = newList.items[index - 1]
    // newList.items[index - 1] = newList.items[index]
    // newList.items[index] = temp

    var newList = temp___.currentList
    var temp = newList.items[index - 1]
    newList.items[index - 1] = newList.items[index]
    newList.items[index] = temp


    var newLists = [...temp___.todoLists.map(current => {



      if (current.name === temp___.currentList.name && current.owner === temp___.currentList.owner) {


        current = newList


      }

      return current
    })]







    // console.log(newList);

    temp__.currentList = JSON.parse(JSON.stringify(newList))
    temp__.todoLists = JSON.parse(JSON.stringify(newLists))

    this.jtps.addTransaction(new App_Transaction(this, temp_, temp__, 'move'))

    // this.setState({ currentList: newList })





  }

  moveDown = (e) => {

    var temp_ = JSON.parse(JSON.stringify(this.state));
    var temp__ = JSON.parse(JSON.stringify(this.state));
    var temp___ = JSON.parse(JSON.stringify(this.state));
    // console.log(e)

    var index = this.state.currentList.items.findIndex(current => {
      // console.log(current, e)
      return current === e
    })
    // console.log(index);

    var newList = temp___.currentList
    var temp = newList.items[index + 1]
    newList.items[index + 1] = newList.items[index]
    newList.items[index] = temp




    var newLists = [...temp___.todoLists.map(current => {



      if (current.name === temp___.currentList.name && current.owner === temp___.currentList.owner) {


        current = newList


      }

      return current
    })]







    // console.log(newList);

    temp__.currentList = JSON.parse(JSON.stringify(newList))
    temp__.todoLists = JSON.parse(JSON.stringify(newLists))

    this.jtps.addTransaction(new App_Transaction(this, temp_, temp__, 'move'))



    // const newLists = [...this.state.todoLists.map(current => {



    //   if (current.name === this.state.currentList.name && current.owner === this.state.currentList.owner) {


    //     current = newList


    //   }

    //   return current
    // })]









    // temp__.currentList = newList
    // temp__.todoLists = newLists

    // this.jtps.addTransaction(new App_Transaction(this, temp_, temp__, 'move'))


    // this.setState({ currentList: newList })


  }

  deleteItem = (e) => {

    // console.log(e)


    var temp_ = JSON.parse(JSON.stringify(this.state));
    var temp__ = JSON.parse(JSON.stringify(this.state));
    var temp___ = JSON.parse(JSON.stringify(this.state));
    var temp____ = JSON.parse(JSON.stringify(this.state));


    var newList = temp____.currentList
    // console.log("new",newList);
    // this.state.currentList

    newList.items = [...newList.items.filter(todo => (todo.assigned_to!==e.assigned_to ||todo.due_date!==e.due_date||todo.description!==e.description||todo.completed!==e.completed||todo.key!==e.key))
    
    ]
    // console.log(newList);

    const newLists = [...temp___.todoLists.map(current => {
      // console.log(current, temp____.currentList, current===temp____.currentList);
      if (current.name === temp___.currentList.name && current.owner === temp___.currentList.owner) {
        current = newList

      }

      return current

    })]

    console.log(newList)


    temp__.currentList = newList
    temp__.todoLists = newLists
    this.jtps.addTransaction(new App_Transaction(this, temp_, temp__, 'sort'))




  }


  editItemPage = (e, current) => {

    if (e === "add") {
      var newItem = { assigned_to: null, completed: null, description: null, due_date: null, key: null }
      this.setState({ todoItem: newItem })
    }
    else
      this.setState({ todoItem: current })


    this.setState({ currentScreen: AppScreen.ITEM_SCREEN })
  }


  updateItem = (value) => {

    // console.log("updateItemajsdfkjdaskflj");
    // console.log(value);


    var temp_ = JSON.parse(JSON.stringify(this.state));
    var temp__ = JSON.parse(JSON.stringify(this.state));
    var temp___ = JSON.parse(JSON.stringify(this.state));
    var temp____ = JSON.parse(JSON.stringify(this.state));


    this.setState({ todoItem: value })
    // var newList_ = this.state.currentList
    // newList_.items = newList_.items.map(currentItem => {
    //   if (currentItem.key === value.key)
    //     return value
    //   else
    //     return currentItem
    // })


    // this.setState({ currentList: newList_ })

    // var newList = this.state.currentList
    var newList = temp____.currentList

    newList.items = newList.items.map(currentItem => {

      // console.log(currentItem,value,currentItem.key,value.key);
      if (currentItem.key === value.key)
        return value
      else
        return currentItem
    })

    console.log("newList",newList);

    this.setState({currentList:newList})

    const newLists = [...temp___.todoLists.map(current => {
      // console.log(current, temp____.currentList, current===temp____.currentList);
      if (current.name === temp___.currentList.name && current.owner === temp___.currentList.owner) {
        current = newList

      }

      return current

    })]

    // temp__.currentList=newList
    temp__.currentList=newList
    temp__.todoItem=value
    temp__.currentScreen = AppScreen.LIST_SCREEN
    temp__.todoLists=newLists


    this.jtps.addTransaction(new App_Transaction(this, temp_, temp__, 'updateItem'))



    // this.setState({ currentList: newList })


    console.log("loading list");
    // for(let i = 0;i<500000000;i++){

      // if(i===490000000)


      console.log(this.state.currentList);



      let bridge = this.state.todoLists.find(e=>{
        

        return (e.name===this.state.currentList.name&&e.owner===this.state.currentList.owner)
      })

      console.log("bridge",bridge);
      
    //     this.loadList(this.state.currentList)
    // this.loadList(this.state.currentList)


        

    // }
    // this.loadList(this.state.currentList)
    console.log("loading list");


  }


  // updateItem = (value) => {

  //   this.setState({ todoItem: value })
  //   console.log("value",value);

  //   var newList = this.state.currentList
  //   newList.items = newList.items.map(currentItem => {
  //     if (currentItem.key === value.key)
  //       return value
  //     else
  //       return currentItem
  //   })


  //   this.setState({ currentList: newList })


  //   this.loadList(this.state.currentList)

  // }
  addItem = (value) => {



    console.log("current value",value);




    var temp_ = JSON.parse(JSON.stringify(this.state));
    var temp__ = JSON.parse(JSON.stringify(this.state));
    var temp___ = JSON.parse(JSON.stringify(this.state));
    var temp____ = JSON.parse(JSON.stringify(this.state));


    // var newList = this.state.currentList

    // newList.items = [...newList.items, value]


    // this.setState({ currentList: newList })









    var newList = temp____.currentList

    newList.items = [...newList.items,value]



    const newLists = [...temp___.todoLists.map(current => {
      // console.log(current, temp____.currentList, current===temp____.currentList);
      if (current.name === temp___.currentList.name && current.owner === temp___.currentList.owner) {
        current = newList

      }

      return current


    })]



    temp__.currentList = newList
    temp__.todoItem = value
    temp__.currentScreen = AppScreen.LIST_SCREEN
    temp__.todoLists = newLists



    this.jtps.addTransaction(new App_Transaction(this, temp_, temp__, 'addItem'))



    // this.loadList(this.state.currentList)








    






    // this.loadList(this.state.currentList)





    console.log("adding item")

  }


  addNewList = () => {



    const newList = {
      key: uuid.v4(),
      name: 'Unknown',
      owner: 'Unknown',
      items: [],




    }


    console.log(newList)


    //async function
    this.setState({ currentList: newList }, () => {


      this.setState({ todoLists: [...this.state.todoLists, this.state.currentList] })

      this.loadList(this.state.currentList)



    })

  }


  redo = () => {
    if (this.jtps.hasTransactionToRedo())
      this.jtps.doTransaction()
    else
      console.log("nothing left to redo");
  }


  undo = () => {
    if (this.jtps.hasTransactionToUndo())
      this.jtps.undoTransaction()
    else
      console.log("nothing left to undo");
    // console.log(this.jtps.hasTransactionToUndo(),this.jtps.getSize(),this.jtps.getUndoSize(),this.jtps.getRedoSize());
  }



  // nameOwnerChange = (e)=>{

  //   console.log("eeee",e);
  //   this.setState({[e.target.name]:e.target.value})
  // }


  nooc = (type, value) => {

    console.log({ [type]: value });
    this.setState({ [type]: value })


  }


  nameOnBlur = () => {

    console.log("name  blur");
    this.NameOwnerOnChange('name', this.state.name)
  }

  ownerOnBlur = () => {
    console.log("owner blur");
    this.NameOwnerOnChange('owner', this.state.owner)
  }


  render() {
    switch (this.state.currentScreen) {
      case AppScreen.HOME_SCREEN:
        return <HomeScreen
          loadList={this.loadList.bind(this)}
          todoLists={this.state.todoLists}
          addNewList={this.addNewList}

        />;
      case AppScreen.LIST_SCREEN:
        return <ListScreen
          undo={this.undo}
          redo={this.redo}
          moveUp={this.moveUp}
          moveDown={this.moveDown}
          deleteItem={this.deleteItem}
          editItem={this.editItemPage}

          sortBy={this.sortCurrentList}
          goHome={this.goHome.bind(this)}
          todoList={this.state.currentList}
          nameOnChange={this.NameOwnerOnChange}
          deleteList={this.deleteList}
          // nameOwnerChange={this.nameOwnerChange}
          name={this.state.name}
          owner={this.state.owner}
          nooc={this.nooc}
          nameOnBlur={this.nameOnBlur}
          ownerOnBlur={this.ownerOnBlur}


        />;
      case AppScreen.ITEM_SCREEN:
        return <ItemScreen todoItem={this.state.todoItem}
          loadList={this.loadList}


          state={this.state}


          updateItem={this.updateItem}
          addItem={this.addItem}






        />;
      default:
        return <div>ERROR</div>;
    }
  }
}

export default App;