

class Num extends Number{


    constructor() {

        super()

        this.num = 0

    }



    setNum(initNum) {


        this.num = initNum
    }



    getNum() {

        return this.num
    }





    andMask(mask) {
        this.num = this.num & mask
    }


    orMask(mask) {
        this.num = this.num | mask
    }


    toString(){

        return this.num
    }
}


// export default Num
// module.exports = Num
