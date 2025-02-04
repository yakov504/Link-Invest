const fs = require('fs')
const Indicator = require('../modules/indicatorsModuls');
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError');


exports.getAllIndicators = catchAsync(async ( req, res ) =>{
   const indicator = await Indicator.find().populate(
      { 
       path: 'agent',
      //  selcet:'name role'
      });

      res.status(200).json({
         status: 'success',
         results: indicator.length,
         data:{
            indicator
         }
      })
})

exports.getIndicator = catchAsync(async ( req, res, next ) =>{
   const indicator = await Indicator.findById(req.params.id).populate(
         { 
          path: 'agent',
          selcet:'-_v -passwordChangeAt'
         });

   if(!indicator){
      return next(AppError('no indicator with id ',404))
   } 
      res.status(200).json({
         status: 'success', 
         data: {
            indicator
         }
      })
})

exports.createIndicator =  catchAsync(async ( req, res ) => {
   const newIndicator = await Indicator.create( req.body );

      res.status(201).json({
         status:'success',
         data: {
            Indicator: newIndicator
         }
      });
})

exports.updateIndicator =  catchAsync(async ( req, res ) => {
   const indicator = await Indicator.findByIdAndUpdate(req.params.id , req.body, {
         new: true,
         runValidators: true
      });
      res.status(200).json({
         status:'success',
         data:{
            indicator:indicator
         }
     })
})

exports.deleteIndicatort =  catchAsync(async ( req, res ) => {
   await Indicator.findByIdAndDelete(req.params.id)
      res.status(204).json({
         status:'success',
         data: null
     })
      

})
