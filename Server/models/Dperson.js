const mongoose= require("mongoose");

const Schema=mongoose.Schema;

const DpersonSchema = new Schema({
    name:{
        type: String,
        required:true
    },
    IdNumber:{
        type:Number,
        required:true
    },
    PhoneNumber:{
        type: Number,
        required:true
    },
    Address:{
        type:String,
        required:true
    }
    

}
)

const DeliveryPerson=mongoose.model("DeliveryPerson",DpersonSchema);


module.exports =DeliveryPerson;