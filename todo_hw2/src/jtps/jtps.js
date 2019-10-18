



class jTPS {


    constructor() {
        //uodo transactions
        this.transactions = []

        this.mostRecentTransaction = -1

        this.performingDo = false

        this.performingUndo = false





    }



    isPerformingDo() {

        return this.performingDo
    }




    isPerformingUndo() {

        return this.performingUndo
    }



 addTransaction(transaction) {

        //<0: first ele     
        console.log("add transaction", this.mostRecentTransaction, this.transactions.length);
        if ((this.mostRecentTransaction < 0) || (this.mostRecentTransaction < (this.transactions.length-1))) {

            console.log("clear");

            for (var i = this.transactions.length - 1; i > this.mostRecentTransaction; i--)
{

    console.log("i should be clear out",i);
                this.transactions.splice(i, 1)

}


        }


        this.transactions.push(transaction)


        this.doTransaction()

        // console.log("stack size = ",this.getSize());

        console.log(this.transactions);

//         this.transactions.forEach(e=>{
// console.log(e);        })


    }



    doTransaction() {

        if (this.hasTransactionToRedo()) {


            


            this.performingDo = true
            var temp_transaction = this.transactions[this.mostRecentTransaction + 1]
            temp_transaction.doTransaction();
            this.mostRecentTransaction++;

            this.performingDo = false;
        }


    }



    peekUndo() {
        if (this.hasTransactionToUndo()) {
            return this.transactions[this.mostRecentTransaction]
        }

        else
            return null;

    }


    peekDo() {


        if (this.hasTransactionToRedo) {

            return this.transactions[this.mostRecentTransaction + 1]


        }


        else

            return null

    }


    undoTransaction() {


        console.log(this.getUndoSize(),this.hasTransactionToUndo(),this.mostRecentTransaction)
        console.log(this.transactions);


        if (this.hasTransactionToUndo()) {

            this.performingUndo = true;
            var temp_transactoin = this.transactions[this.mostRecentTransaction]

            temp_transactoin.undoTransaction()

            this.mostRecentTransaction--;

            this.performingUndo = false;

        }


    }

    clearAllTransactions() {


        this.transactions = []
        this.mostRecentTransaction = -1
    }


    getSize() {


        return this.transactions.length


    }


    getRedoSize() {



        return this.getSize() - this.mostRecentTransaction - 1


    }


    getUndoSize() {


        return this.mostRecentTransaction + 1
    }


    hasTransactionToUndo() {

        return this.mostRecentTransaction >= 0
    }


    hasTransactionToRedo() {

        return this.mostRecentTransaction < (this.transactions.length - 1)
    }


















}


module.exports = jTPS
