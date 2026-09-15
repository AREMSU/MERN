import { Router } from "express";
import Job from "../schema/jobSchema.js";


let jobRoute = Router()

jobRoute
    .route("/")
    .post(async (req, res, next) => {

        try {
            let result = await Job.create(req.body) //Product.create is the main thing sending/creating the data
            res.status(200).json({
                success: true,
                message: "Job created successfully.",
                result: result,
            })

        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            })
        }


    })
    .get(async (req, res, next) => {
    try {
      let result = await Job.find();
      res.status(200).json({
        success: true,
        message: "Jobs read successfully",
        result: result,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  });

jobRoute
    .route("/:id")//localhost:8000/product/id
    .get(async(req, res, next) => {
        try{
            let result = await Job.findById(req.params.id)
            res.status(200).json({
                success: true,
                message: "Job read sucessfully",
                result: result,
            })
        }
        catch(error){
            res.status(400).json({
                success: false,
                message: error.message,
            })
        }
    })
    .patch(async(req, res, next) => {
         try{
            let result = await Job.findByIdAndUpdate(req.params.id, req.body, {new:true}) //even without new:true the desired field changes but dosent immediately show in postman display iykyk
            res.status(200).json({
                success: true,
                message: "Job updated sucessfully",
                result: result,
            })
        }
        catch(error){
            res.status(400).json({
                success: false,
                message: error.message,
            })
        }
    })
    .delete(async(req, res, next) => {
        try{
            let result = await Job.findByIdAndDelete(req.params.id)
            res.status(200).json({
                success: true,
                message: "Job deleted sucessfully",
                result: result,
            })
        }
        catch(error){
            res.status(400).json({
                success: false,
                message: error.message,
            })
        }
    })

export default jobRoute