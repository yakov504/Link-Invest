const fs = require('fs')
const Agents = require('../modules/agentsModuls');
// const { Agent } = require('http');

exports.getAllAgents =async ( req, res ) =>{
   try{
      const agents = await Agents.find();

      res.status(200).json({
         status: 'success',
         results: agents.length,
         data:{
            agents
         }
      })
   } catch(err){
      res.status(404).json({
         status: 'fail',
         message: err
      });
   }
}

exports.getAgent = async ( req, res ) =>{
   try{
      agent = await Agents.findById(req.params.id);
      res.status(200).json({
         status: 'success', 
         data: {
            agent
         }
      })
   }catch(err) {
      res.status(404).json({
         status: 'fail',
         messege: err.message
       })
   }   
}

exports.createAgent = async ( req, res ) => {
   try{
      const newAgent = await Agents.create( req.body );

      res.status(201).json({
         status:'success',
         data: {
            agents: newAgent
         }
      });
   } catch (err) {
      res.status(400).json({
         status:'fail',
         message: err 
      })
   }
};

exports.updateAgent = async ( req, res ) => {
   try{
      const agent = await Agents.findByIdAndUpdate(req.params.id , req.body, {
         new: true,
         runValidators: true
      });
      res.status(200).json({
         status:'success',
         data:{
            agent:agent
         }
     })
   }catch(err){
      res.status(404).json({
            status:'fail',
            messege: err
      })
   }
};

exports.deleteAgent = async ( req, res ) => {
   try{
      await Agents.findByIdAndDelete(req.params.id)
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
