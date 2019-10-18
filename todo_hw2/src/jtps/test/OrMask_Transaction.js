


// import Num from './Num'
// const Num = require("./Num")


class OrMask_Transaction {





    constructor(initNum, initIntNum, initMask) {

        this.num = initNum
        this.intNum = initIntNum


        this.mask = initMask


    }



    doTransaction() {


        this.num.orMask(this.mask)


    }


    undoTransaction() {

        this.num.setNum(this.intNum)



    }


}


// module.exports = OrMask_Transaction
