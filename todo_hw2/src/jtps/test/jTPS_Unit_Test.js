

const Num = require("./Num")

const jTPS = require("./../jtps")

const AndMask_Transaction = require("./AndMask_Transaction")

const OrMask_Transaction = require("./OrMask_Transaction")

const AddToNum_Transaction = require("./AddToNum_Transaction")






// console.log(new Num().getNum())



// console.log(123)


class myAssert {


    assertEquals(temp, value) {
        return temp === value
    }


    assertTrue(temp) {
        return temp === true
    }

    assertFalse(temp) {
        return temp === false
    }


}

class jTPS_Unit_Test {

    testAdd() {


        let tps = new jTPS()

        let num = new Num()


        let Assert = new myAssert()


        console.log("test add")
        console.log(Assert.assertEquals(0, num.getNum()))





        // ADD 5 TRANSACTION

        tps.addTransaction(new AddToNum_Transaction(num, 5))

        console.log(Assert.assertEquals(5, num.getNum()))
        console.log(Assert.assertEquals(1, tps.getSize()))
        console.log(Assert.assertEquals(0, tps.getRedoSize()))
        console.log(Assert.assertEquals(1, tps.getUndoSize()))
        console.log()


        // ADD 10 TRANSACTION

        tps.addTransaction(new AddToNum_Transaction(num, 10))
        console.log(Assert.assertEquals(2, tps.getSize()))        
        console.log(Assert.assertEquals(0, tps.getRedoSize()))
        console.log(Assert.assertEquals(2, tps.getUndoSize()))


        tps.addTransaction(new AddToNum_Transaction(num, 20))
        console.log(Assert.assertEquals(35, num.getNum()))

        console.log(Assert.assertEquals(3, tps.getSize()))
        console.log(Assert.assertEquals(0, tps.getRedoSize()))
        console.log(Assert.assertEquals(3, tps.getUndoSize()))







    }

    testUndo() {
        // WE'LL JUST USE A SIMPLE NUM FOR TESTING
     
        console.log("test undo")
        let Assert = new myAssert()

        // #%%
      
        // WE'LL JUST USE A SIMPLE NUM FOR TESTING
        let tps = new jTPS()
        let num = new Num()
        console.log(Assert.assertEquals(num.getNum(), 0))
        console.log(Assert.assertFalse(tps.hasTransactionToUndo()))
        console.log(Assert.assertFalse(tps.hasTransactionToRedo())
)
        // ADD 3 TRANSACTIONS (5, 10, and 15)
        tps.addTransaction(new AddToNum_Transaction(num, 5))
        tps.addTransaction(new AddToNum_Transaction(num, 10))
        tps.addTransaction(new AddToNum_Transaction(num, 20))
        console.log(Assert.assertTrue(tps.hasTransactionToUndo()))
        console.log(Assert.assertFalse(tps.hasTransactionToRedo()))
        console.log(Assert.assertEquals(35, num.getNum()))
        console.log(Assert.assertTrue(tps.hasTransactionToUndo()))
        console.log(Assert.assertEquals(3, tps.getSize()))
        console.log(Assert.assertEquals(0, tps.getRedoSize()))
        console.log(Assert.assertEquals(3, tps.getUndoSize()))

        // UNDO A TRANSACTION
        tps.undoTransaction()
        console.log(Assert.assertTrue(tps.hasTransactionToUndo()))
        console.log(Assert.assertTrue(tps.hasTransactionToRedo()))
        console.log(Assert.assertEquals(15, num.getNum()))
        console.log(Assert.assertEquals(3, tps.getSize()))
        console.log(Assert.assertEquals(1, tps.getRedoSize()))
        console.log(Assert.assertEquals(2, tps.getUndoSize()))

        // UNDO ANOTHER
        tps.undoTransaction()
        console.log(Assert.assertTrue(tps.hasTransactionToUndo()))
        console.log(Assert.assertTrue(tps.hasTransactionToRedo()))
        console.log(Assert.assertEquals(5, num.getNum()))
        console.log(Assert.assertEquals(3, tps.getSize()))
        console.log(Assert.assertEquals(2, tps.getRedoSize()))
        console.log(Assert.assertEquals(1, tps.getUndoSize()))

        // AND ANOTHER
        tps.undoTransaction()
        console.log(Assert.assertFalse(tps.hasTransactionToUndo()))
        console.log(Assert.assertTrue(tps.hasTransactionToRedo()))
        console.log(Assert.assertEquals(0, num.getNum()))
        console.log(Assert.assertEquals(3, tps.getSize()))
        console.log(Assert.assertEquals(3, tps.getRedoSize()))
        console.log(Assert.assertEquals(0, tps.getUndoSize()))

        // WE HAVE NO MORE TO UNDO SO THIS SHOULD DO NOTHING
        tps.undoTransaction()
        console.log(Assert.assertFalse(tps.hasTransactionToUndo()))
        console.log(Assert.assertTrue(tps.hasTransactionToRedo()))
        console.log(Assert.assertEquals(0, num.getNum()))
        console.log(Assert.assertEquals(3, tps.getSize()))
        console.log(Assert.assertEquals(3, tps.getRedoSize()))
        console.log(Assert.assertEquals(0, tps.getUndoSize()))

        console.log("")

    }


    testAndMask(){

        let Assert = new myAssert()
        let tps = new jTPS()
        let num = new Num()


        console.log("test and mask")
        console.log(Assert.assertEquals(0, num.getNum()))

        // ADD 5 TRANSACTION
        tps.addTransaction(new AddToNum_Transaction(num, 12))
        tps.addTransaction(new AndMask_Transaction(num, num.getNum(), 4))
        console.log(Assert.assertEquals(4, num.getNum()))
        console.log(Assert.assertEquals(2, tps.getSize()))

        tps.undoTransaction()
        console.log(Assert.assertEquals(12, num.getNum()))
        console.log(Assert.assertEquals(2, tps.getSize()))
        console.log(Assert.assertEquals(1, tps.getRedoSize()))
        console.log(Assert.assertEquals(1, tps.getUndoSize()))



        console.log("")


    }


    testRedo(){

        console.log("test redo")
        let Assert = new myAssert()

        let tps = new jTPS()
        let num = new Num()
        console.log(Assert.assertEquals(num.getNum(), 0))

        // ADD 3 TRANSACTIONS (5, 10, and 15)
        tps.addTransaction(new AddToNum_Transaction(num, 5))
        tps.addTransaction(new AddToNum_Transaction(num, 10))
        tps.addTransaction(new AddToNum_Transaction(num, 20))
        console.log(Assert.assertTrue(tps.hasTransactionToUndo()))
        console.log(Assert.assertFalse(tps.hasTransactionToRedo()))
        console.log(Assert.assertEquals(35, num.getNum()))
        console.log(Assert.assertEquals(3, tps.getSize()))
        console.log(Assert.assertEquals(0, tps.getRedoSize()))
        console.log(Assert.assertEquals(3, tps.getUndoSize()))

        // UNDO A TRANSACTION AND THEN REDO IT
        tps.undoTransaction()
        tps.doTransaction()
        console.log(Assert.assertTrue(tps.hasTransactionToUndo()))
        console.log(Assert.assertFalse(tps.hasTransactionToRedo()))
        console.log(Assert.assertEquals(35, num.getNum()))
        console.log(Assert.assertEquals(3, tps.getSize()))
        console.log(Assert.assertEquals(0, tps.getRedoSize()))
        console.log(Assert.assertEquals(3, tps.getUndoSize()))

        // UNDO TWO TRANSACTIONS AND THEN REDO THEM
        tps.undoTransaction()
        tps.undoTransaction()
        tps.doTransaction()
        tps.doTransaction()
        console.log(Assert.assertTrue(tps.hasTransactionToUndo()))
        console.log(Assert.assertFalse(tps.hasTransactionToRedo()))
        console.log(Assert.assertEquals(35, num.getNum()))
        console.log(Assert.assertEquals(3, tps.getSize()))
        console.log(Assert.assertEquals(0, tps.getRedoSize()))
        console.log(Assert.assertEquals(3, tps.getUndoSize()))

        // UNDO ALL THREE TRANSACTIONS AND REDO THEM
        tps.undoTransaction()
        tps.undoTransaction()
        tps.undoTransaction()
        tps.doTransaction()
        tps.doTransaction()
        tps.doTransaction()
        console.log(Assert.assertTrue(tps.hasTransactionToUndo()))
        console.log(Assert.assertFalse(tps.hasTransactionToRedo()))
        console.log(Assert.assertEquals(35, num.getNum()))
        console.log(Assert.assertEquals(3, tps.getSize()))
        console.log(Assert.assertEquals(0, tps.getRedoSize()))
        console.log(Assert.assertEquals(3, tps.getUndoSize()))

        // UNDO THREE TRANSACTIONS AND REDO TWO
        tps.undoTransaction()
        tps.undoTransaction()
        tps.undoTransaction()
        tps.doTransaction()
        tps.doTransaction()
        console.log(Assert.assertTrue(tps.hasTransactionToUndo()))
        console.log(Assert.assertTrue(tps.hasTransactionToRedo()))
        console.log(Assert.assertEquals(15, num.getNum()))
        console.log(Assert.assertEquals(3, tps.getSize()))
        console.log(Assert.assertEquals(1, tps.getRedoSize()))
        console.log(Assert.assertEquals(2, tps.getUndoSize()))

        // UNDO ALL THREE TRANSACTIONS AND REDO FOUR, WHICH
        // SHOULD NOT PRODUCE AN ERROR BUT THE LAST
        // REDO SHOULD DO NOTHING
        tps.undoTransaction()
        tps.undoTransaction()
        tps.undoTransaction()
        tps.doTransaction()
        tps.doTransaction()
        tps.doTransaction()
        tps.doTransaction()
        console.log(Assert.assertTrue(tps.hasTransactionToUndo()))
        console.log(Assert.assertFalse(tps.hasTransactionToRedo()))
        console.log(Assert.assertEquals(35, num.getNum()))
        console.log(Assert.assertEquals(3, tps.getSize()))
        console.log(Assert.assertEquals(0, tps.getRedoSize()))
        console.log(Assert.assertEquals(3, tps.getUndoSize()))


        console.log("")


    }


    testClear(){


        console.log("test clear")
        let Assert = new myAssert()
        let tps = new jTPS()
        let num = new Num()

        console.log(Assert.assertEquals(num.getNum(), 0))


        // ADD 3 TRANSACTIONS (5, 10, and 15)
        tps.addTransaction(new AddToNum_Transaction(num, 5))
        tps.addTransaction(new AddToNum_Transaction(num, 10))
        tps.addTransaction(new AddToNum_Transaction(num, 20))
        console.log(Assert.assertEquals(35, num.getNum()))
        console.log(Assert.assertEquals(3, tps.getSize()))
        console.log(Assert.assertEquals(0, tps.getRedoSize()))
        console.log(Assert.assertEquals(3, tps.getUndoSize()))

        // CLEAR ALL THE TRANSACTIONS
        tps.clearAllTransactions()
        console.log(Assert.assertEquals(35, num.getNum()))
        console.log(Assert.assertEquals(0, tps.getSize()))
        console.log(Assert.assertEquals(0, tps.getRedoSize()))
        console.log(Assert.assertEquals(0, tps.getUndoSize()))

        // ADD 3 TRANSACTIONS (5, 10, and 15)
        tps.addTransaction(new AddToNum_Transaction(num, 5))
        tps.addTransaction(new AddToNum_Transaction(num, 10))
        tps.addTransaction(new AddToNum_Transaction(num, 20))
        console.log(Assert.assertEquals(70, num.getNum()))
        console.log(Assert.assertEquals(3, tps.getSize()))
        console.log(Assert.assertEquals(0, tps.getRedoSize()))
        console.log(Assert.assertEquals(3, tps.getUndoSize()))

        // CLEAR THEM ALL OUT AGAIN
        tps.clearAllTransactions()
        console.log(Assert.assertEquals(70, num.getNum()))
        console.log(Assert.assertEquals(0, tps.getSize()))
        console.log(Assert.assertEquals(0, tps.getRedoSize()))
        console.log(Assert.assertEquals(0, tps.getUndoSize()))

        // ADD 3 TRANSACTIONS (5, 10, and 15)
        tps.addTransaction(new AddToNum_Transaction(num, 5))
        tps.addTransaction(new AddToNum_Transaction(num, 10))
        tps.addTransaction(new AddToNum_Transaction(num, 20))
        console.log(Assert.assertEquals(105, num.getNum()))
        console.log(Assert.assertEquals(3, tps.getSize()))
        console.log(Assert.assertEquals(0, tps.getRedoSize()))
        console.log(Assert.assertEquals(3, tps.getUndoSize()))




        console.log("")
    }

}



// console.log("once upon the time")

var temp_var = new jTPS_Unit_Test()


temp_var.testAdd()

temp_var.testUndo()

temp_var.testRedo()

temp_var.testClear()


temp_var.testAndMask()
