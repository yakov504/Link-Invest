const fs = require('fs')
const Indicator = require('../modules/indicatorsModuls');
// const { Agent } = require('http');

exports.getAllIndicators =async ( req, res ) =>{
   try{
      const indicator = await Indicator.find();

      res.status(200).json({
         status: 'success',
         results: indicator.length,
         data:{
            Indicator
         }
      })
   } catch(err){
      res.status(404).json({
         status: 'fail',
         message: err
      });
   }
}

exports.getIndicator = async ( req, res ) =>{
   try{
      indicator = await Indicator.findById(req.params.id);
      res.status(200).json({
         status: 'success', 
         data: {
            indicator
         }
      })
   }catch(err) {
      res.status(404).json({
         status: 'fail',
         messege: err.message
       })
   }   
}

exports.createIndicator = async ( req, res ) => {
   try{
      const newIndicator = await Indicator.create( req.body );

      res.status(201).json({
         status:'success',
         data: {
            Indicator: newIndicator
         }
      });
   } catch (err) {
      res.status(400).json({
         status:'fail',
         message: err 
      })
   }
};

exports.updateIndicator = async ( req, res ) => {
   try{
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
   }catch(err){
      res.status(404).json({
            status:'fail',
            messege: err
      })
   }
};

exports.deleteIndicatort = async ( req, res ) => {
   try{
      await Indicator.findByIdAndDelete(req.params.id)
      res.status(204).json({
         status:'success',
         data: null
     })
      
   }catch(err){
      res.status(404).json({
         status:'fail',
         messege: err
     })
 }
};
