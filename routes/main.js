const express = require('express');
const router = express.Router();
const Event = require('../models/events');
const Seat = require('../models/seats')


router.get('/', async (req, res) => {
    const events = await Event.find();
    res.render('events', {events : events})
});

router.post("/addevent", async (req , res) => {
    const newEvent = new Event({
        event: req.body.event
    })
    await newEvent.save();

    res.redirect('/')
})
router.get('/deleteevent/:id',async (req, res) => {
    const {id} = req.params;
    await Event.findByIdAndDelete(id);
    res.redirect('/')
  })


router.post('/editevent',async (req , res) => {
    const  {event} = req.body;
    await Event.findByIdAndUpdate(req.body.id, {
      event : event
  })
    res.redirect('/')
  }) 

  router.get('/seats', async (req, res) => {
    const events = await Event.find();
    const seats = await Seat.find().populate("event");
    
    res.render('seats', {events,seats})
    
});

router.post("/addseats", async (req , res) => {
  
    const newSeat = new Seat({
        guestname: req.body.geustname,
        seatnumber: req.body.seatnumber,
        event: req.body.event
    })
    await newSeat.save();

    res.redirect('/seats')
})

router.get('/deleteseat/:id',async (req, res) => {
    const {id} = req.params;
    await Seat.findByIdAndDelete(id);
    res.redirect('/seats')
  })

  router.post('/editseat',async (req , res) => {
    const  {geustname,seatnumber,event} = req.body;
    await Seat.findByIdAndUpdate(req.body.id, {
        guestname: req.body.geustname,
        seatnumber: req.body.seatnumber,
        event: req.body.event
  })
    res.redirect('/seats')
  }) 

router.get('/page-3', (req, res) => {
    res.render('page-3')
});

router.get('/autocomplete/', function(req, res, next) {

    var regex= new RegExp(req.query["term"],'i');
   
    var employeeFilter =Event.find({event:regex},{'event':1}).sort({"updated_at":-1}).sort({"created_at":-1}).limit(20);
    employeeFilter.exec(function(err,data){
  
  
  var result=[];
  if(!err){
     if(data && data.length && data.length>0){
       data.forEach(user=>{
         let obj={
           id:user._id,
           label: user.event
         };
         result.push(obj);
       });
  
     }
   
     res.jsonp(result);
  }
  
    });
  
  });

module.exports = router;