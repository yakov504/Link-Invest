const catchAsync = require("../utils/catchAsync")
const AppError = require("../utils/appError")

exports.deleteOne = Model => catchAsync(async( res, req, next) => {
   const doc = await Model.findByIdAndDelete(req.params.id)

   if(!doc){
      return next(new AppError('no document found with same id'),404)
   }
   res.status(204).json({
      status:'success',
      data: null
  })
})

exports.updateOne =  Model => catchAsync(async ( req, res ) => {
   const doc = await Model.findByIdAndUpdate(req.params.id , req.body, {
         new: true,
         runValidators: true
      });
      res.status(200).json({
         status:'success',
         data:{
            data:doc
         }
     })
})

exports.createOne = Model => catchAsync(async ( req, res ) => {
    const doc = Model.create( req.body );
 
       res.status(201).json({
          status:'success',
          data: {
             data: doc
          }
       });
 })

 exports.getOne = (Model, popOptions) => catchAsync(async ( req, res, next ) =>{
   let query = Model.findById(req.params.id);
   if(popOptions) query = query.populate(popOptions)
   const doc = await query

   if(!doc){
      return next(new AppError('no request with same id ',404))
   } 
      res.status(200).json({
         status: 'success', 
         data: {
            data: doc
         }
      })
})


exports.getAll = (Model, popOptions) => catchAsync(async ( req, res ) =>{
   let filter = {};
   if(req.params.userId) filter = {user: req.params.userId}
   
   let query = Model.find(filter)
   if(popOptions) query = query.populate(popOptions)

   const doc = await query
      res.status(200).json({
         status: 'success',
         results: doc.length,
         data:{
            data: doc
         }
      })
})


  