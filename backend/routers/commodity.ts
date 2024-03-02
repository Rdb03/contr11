import express from "express";
import Commodity from "../models/Commodity";
import {Error} from "mongoose";
import auth, {RequestWithUser} from "../midleware/auth";
import {imagesUpload} from "../multer";

const commodityRouter = express.Router();

commodityRouter.get('/', async (_req, res) => {
    try {
        const commodity = await Commodity.find().sort({'date': -1}).populate('user', 'username phone displayName');
        return res.send(commodity);
    } catch(e) {
        return res.sendStatus(500);
    }
});

commodityRouter.post('/',auth, imagesUpload.single('image'), async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;

        const commodity = new Commodity({
            user: user.id,
            title: req.body.title,
            description: req.body.description,
            image: req.file ? req.file.filename : null,
            category: req.body.category,
            price: req.body.price
        });

        await commodity.save();
        return res.send(commodity);
    } catch (e) {
        if (e instanceof Error.ValidationError) {
            return res.status(400).send(e);
        }
        return next(e);
    }
});

commodityRouter.get('/:id', async (req, res) => {
    try {
        const commodity = await Commodity.findById(req.params.id).populate('user', 'username');

        if (!commodity) {
            return res.sendStatus(404);
        }

        return res.send(commodity);
    } catch {
        return res.sendStatus(500);
    }
});

commodityRouter.delete('/:id', auth, async (req, res, next) => {
   try {
       const user = (req as RequestWithUser).user;

       const commodity = await Commodity.findById(req.params.id);

       if (!commodity) {
           return res.sendStatus(404);
       }

       if (commodity.user.toString() !== user.id) {
           return res.sendStatus(403);
       }

       await Commodity.findByIdAndDelete({_id: req.params.id});

       return res.sendStatus(204);
   } catch (e) {
       return next(e);
   }
});

export default commodityRouter;
