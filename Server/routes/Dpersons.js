const router= require("express").Router();



let Dperson =require("../models/Dperson");

//craete dember

router.route("/add").post((req,res)=>{
    const name=req.body.name;
    const IdNumber=Number(req.body.IdNumber);
    const PhoneNumber=req.body.PhoneNumber;
    const Address=req.body.Address;

    const newDperson = new Dperson({
        name,
        IdNumber,
        PhoneNumber,
        Address
    })  


    newDperson.save().then(()=>{
        res.json("Delivery person added")
    }).catch((err)=>{
        console.log(err);
    })
})

//view Deliverperson


router.route("/").get((req,res)=>{
    Dperson.find().then((Dpersons)=>{
        res.json(Dpersons)
    }).catch((err)=>{
        console.log("err");
    })
})


//update Dperson

router.route("/update/:id").put(async (req,res)=>{
    let userId=req.params.id;
    //desturucre
    const {name,IdNumber,PhoneNumber,Address}= req.body;

    const updateDperson={
        name,
        IdNumber,
        PhoneNumber,
        Address
    }
    console.log(updateDperson);
    const update= await Dperson.findByIdAndUpdate(userId,updateDperson).
    then(()=>{
        res.status(200).send({status:"user updated"})


    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"errr with updating date"});
    });

  
})

router.route("/delete/:id").delete(async (req,res)=>{
    let userId =req.params.id;

    await Dperson.findByIdAndDelete(req.params.id)
    .then(()=>{
        res.status(200).send({status: "user deleted"})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"error with delete user",error: err.message});
    })
})

router.route("/get/:id").get(async (req,res)=>{
    let userId =req.params.id;
    await Dperson.findById(userId).then((Dpersons)=>{
        res.json(Dpersons)
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"error with user",error:err.message})
    })
})

module.exports= router;