import jwt from 'jsonwebtoken';
import Parcel from '../models/parcel';
import SendEmail from '../emailnotification/sendEmail';
import User from '../models/user';

class ParcelController {
  static async getAllParcels(req, res, next) {
    try {
      const allParcels = await Parcel.findAll();
      return res.status(200).json({
        success: true,
        data: allParcels,
      });
    } catch (e) {
      return next(e);
    }
  }

  static async getParcelsByUserId(req, res, next) {
    try {
      const foundParcel = await Parcel.findByUserId(req.params.userId);
      if (foundParcel.length === 0) {
        const error = new Error();
        error.message = 'The User has no Parcels';
        return next(error);
      }
      return res.status(200).json({
        success: true,
        data: foundParcel,
      });
    } catch (e) {
      return next(e);
    }
  }

  static async getParcelsByParcelId(req, res, next) {
    try {
      const foundParcels = await Parcel.findById(req.params.parcelId);
      if (foundParcels.length === 0) {
        const error = new Error();
        error.message = 'The parcel Order cannot be found';
        return next(error);
      }
      return res.status(200).json({
        success: true,
        data: foundParcels,
      });
    } catch (e) {
      return next(e);
    }
  }

  static async postNewParcelOrder(req, res, next) {
    const token = req.headers.authorization;
    const bearer = token.split(' ');
    const userDetails = jwt.verify(bearer[1], process.env.secret_key);
    const placedBy = userDetails.userId;
    const { weight, weightMetric, from, to, parcelName } = req.body;
    const newParcel = {
      placedBy,
      weight,
      weightMetric,
      from,
      to,
      status: 'PLACED',
      parcelName,
    };

    try {
      const returnedNewParcel = await Parcel.save(newParcel);
      return res.status(201).json({
        success: true,
        data: returnedNewParcel,
        message: 'order created',
      });
    } catch (e) {
      return next(e);
    }
  }

  static async cancelParcelOrderById(req, res, next) {
    try {
      const foundParcel = await Parcel.findById(req.params.parcelId);
      if (foundParcel.length === 0) {
        const error = new Error();
        error.message = 'Parcel not found';
        return next(error);
      }
      if (foundParcel[0].status === 'CANCELLED') {
        const errMsg = new Error();
        errMsg.message = 'Your order is already Cancelled';
        errMsg.statusCode = 400;
        return next(errMsg);
      }

      const cancelledParcel = await Parcel.findByIdAndCancel(
        req.params.parcelId
      );
      return res.status(200).json({
        success: true,
        data: cancelledParcel,
        message: 'order cancelled',
      });
    } catch (e) {
      return next(e);
    }
  }

  static async updateParcelOrderById(req, res, next) {
    try {
      const foundParcel = await Parcel.findById(req.params.parcelId);

      if (foundParcel.length === 0) {
        const error = new Error();
        error.message = 'Your order is not found';
        return next(error);
      }
      if (foundParcel[0].status === 'CANCELLED') {
        const errMsg = new Error();
        errMsg.message = 'Your order is already Cancelled';
        errMsg.statusCode = 400;
        return next(errMsg);
      }
      const updatedParcels = await Parcel.findByIdAndUpdate(
        req.params.parcelId,
        req.body.destination
      );
      return res.status(200).json({
        success: true,
        data: updatedParcels,
      });
    } catch (e) {
      return next(e);
    }
  }

  static async changeParcelPresentLocationByAdminById(req, res, next) {
    let userEmail;
    try {
      const foundParcel = await Parcel.findById(req.params.parcelId);
      if (foundParcel.length === 0) {
        const err1 = new Error();
        err1.statusCode = 404;
        err1.message = 'Parcel not found';
        return next(err1);
      }
      if (
        foundParcel[0].status === 'CANCELLED' ||
        foundParcel[0].status === 'DELIVERED'
      ) {
        const err2 = new Error();
        err2.statusCode = 400;
        err2.message = 'The order cannot be Updated';
        return next(err2);
      }
      const foundUserDetails = await User.findById(foundParcel[0].placed_by);
      if (foundUserDetails.length === 0) {
        const err10 = new Error();
        err10.message = 'User not found for this parcel';
        return next(err10);
      }
      userEmail = foundUserDetails[0].email;
      const updatedParcels = await Parcel.findByIdAndChangeLocation(
        req.params.parcelId,
        req.body.presentLocation
      );

      SendEmail.sendEmailToUserRegardingStatusUpgrade(
        userEmail,
        updatedParcels,
        null,
        req.body.presentLocation
      );
      return res.status(200).json({
        success: true,
        data: updatedParcels,
      });
    } catch (e) {
      return next(e);
    }
  }

  static async changeParcelStatusByAdminById(req, res, next) {
    const { parcelId } = req.params;
    let { status } = req.body;
    let userEmail;
    const upperStatus = status.toUpperCase();
    if (upperStatus === 'DELIVERED') {
      status = 'DELIVERED';
    } else {
      status = 'TRANSITING';
    }
    try {
      const foundParcels = await Parcel.findById(parcelId);
      if (foundParcels.length === 0) {
        const err1 = new Error();
        err1.statusCode = 400;
        err1.message = 'Parcel is not found';
      }
      const foundUserDetails = await User.findById(foundParcels[0].placed_by);
      if (foundUserDetails.length === 0) {
        const err2 = new Error();
        err2.statusCode = 400;
        err2.message = 'User cannot not be found for this parcel';
        return next(err2);
      }
      userEmail = foundUserDetails[0].email;
      const updatedParcels = await Parcel.findByIdAndUpdateStatus(
        parcelId,
        status
      );
      SendEmail.sendEmailToUserRegardingStatusUpgrade(
        userEmail,
        updatedParcels,
        upperStatus,
        null
      );
      res.status(200).json({
        success: true,
        data: updatedParcels,
      });
    } catch (e) {
      return next(e);
    }
  }
}

export default ParcelController;
