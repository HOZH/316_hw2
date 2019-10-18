


// import Num from './Num'
// const Num = require("./Num")


class AddToNum_Transaction {





    constructor(initNum, initAmountToAdd) {

        this.num = initNum
        // this.num.setNum(initNum)
        this.amountToAdd = initAmountToAdd

        // this.doTransaction()


    }



    doTransaction() {

        let oldNum = this.num.getNum()

        let newNum = oldNum + this.amountToAdd
        this.num.setNum(newNum)




    }


    undoTransaction() {

        let oldNum = this.num.getNum()

        let newNum = oldNum - this.amountToAdd
        this.num.setNum(newNum)


    }


    toString(){


        return "add "+this.amountToAdd
    }


}


// module.exports = AddToNum_Transaction
