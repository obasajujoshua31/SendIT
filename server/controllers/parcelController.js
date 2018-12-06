import jwt from 'jsonwebtoken';
import Parcel from '../models/parcel';
import SendEmail from '../emailnotification/sendEmail';
import User from '../models/user';

class ParcelController {
  static getAllParcels(req, res, next) {
    Parcel.findAll((err, results) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({
        success: true,
        data: results,
      });
    });
  }

  static getParcelsByUserId(req, res) {
    const { userId } = req.params;
    Parcel.findByUserId(+userId, (err, results) => {
      if (err) {
        return res.status(400).json({ success: false, error: err.stack });
      }
      if (results.length === 0) {
        return res.status(404).json({
          success: false,
          error: 'The User has no Parcels',
        });
      }
      return res.status(200).json({
        success: true,
        data: results,
      });
    });
  }

  static getParcelsByParcelId(req, res, next) {
    const { parcelId } = req.params;
    Parcel.findById(parcelId, (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.length === 0) {
        return res.status(404).json({
          success: false,
          error: 'Parcel not found',
        });
      }
      return res.status(200).json({ success: true, data: results });
    });
  }

  static postNewParcelOrder(req, res, next) {
    const token = req.headers.authorization;
    const bearer = token.split(' ');
    const userDetails = jwt.verify(bearer[1], process.env.secret_key);
    const placedBy = userDetails.userId;
    const { weight, weightMetric, from, to } = req.body;
    const newParcel = {
      placedBy,
      weight,
      weightMetric,
      from,
      to,
      status: 'PLACED',
    };
    Parcel.save(newParcel, (err, results) => {
      if (err) {
        return next(err);
      }
      return res.status(201).json({
        success: true,
        data: results,
        message: 'order created',
      });
    });
  }

  static cancelParcelOrderById(req, res, next) {
    const { parcelId } = req.params;
    Parcel.findById(+parcelId, (err, foundParcel) => {
      if (err) {
        return next(err);
      }
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

      Parcel.findByIdAndCancel(+parcelId, (err2, results) => {
        if (err2) {
          return next(err2);
        }
        return res.status(200).json({
          success: true,
          data: results,
          message: 'order cancelled',
        });
      });
    });
  }

  static updateParcelOrderById(req, res, next) {
    const { parcelId } = req.params;
    const { destination } = req.body;
    Parcel.findById(+parcelId, (err, foundParcel) => {
      if (err) {
        return next(err);
      }
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
      Parcel.findByIdAndUpdate(parcelId, destination, (e, updatedParcels) => {
        if (e) {
          return next(e);
        }
        if (updatedParcels.length === 0) {
          const err2 = new Error();
          err2.message = 'Parcel not found';
          return next(err2);
        }
        return res.status(200).json({
          success: true,
          data: updatedParcels,
        });
      });
    });
  }

  static changeParcelPresentLocationByAdminById(req, res, next) {
    const { parcelId } = req.params;
    let userEmail;
    Parcel.findById(+parcelId, (err, foundParcel) => {
      if (err) {
        return next(err);
      }
      if (foundParcel.length === 0) {
        const err1 = new Error();
        err1.statusCode = 404;
        err1.message = 'Parcel not found';
        return next(err1);
      }
      if (foundParcel[0].status === 'CANCELLED') {
        const err2 = new Error();
        err2.statusCode = 400;
        err2.message = 'The order is already Cancelled';
        return next(err2);
      }
      if (foundParcel[0].status === 'DELIVERED') {
        const err3 = new Error();
        err3.statusCode = 400;
        err3.message = 'The order is already Delivered';
        return next(err3);
      }
      User.findById(foundParcel[0].placed_by, (err4, foundUserDetails) => {
        if (err4) {
          return next(err4);
        }
        if (foundUserDetails.length === 0) {
          const err10 = new Error();
          err10.message = 'User not found for this parcel';
          return next(err10);
        }
        userEmail = foundUserDetails[0].email;
      });
      const { presentLocation } = req.body;
      Parcel.findByIdAndChangeLocation(
        +parcelId,
        presentLocation,
        (err5, updatedParcels) => {
          if (err5) {
            return next(err5);
          }
          SendEmail.sendEmailToUserRegardingStatusUpgrade(
            userEmail,
            updatedParcels,
            null,
            presentLocation
          );
          return res.status(200).json({
            success: true,
            data: updatedParcels,
          });
        }
      );
    });
  }

  static changeParcelStatusByAdminById(req, res, next) {
    const { parcelId } = req.params;
    let { status } = req.body;
    const upperStatus = status.toUpperCase();
    if (upperStatus === 'DELIVERED') {
      status = 'DELIVERED';
    } else {
      status = 'TRANSITING';
    }
    Parcel.findById(parcelId, (err, foundParcels) => {
      let userEmail;
      if (err) {
        return next(err);
      }
      if (foundParcels.length === 0) {
        const err1 = new Error();
        err1.statusCode = 400;
        err1.message = 'Parcel is not found';
      }
      User.findById(foundParcels[0].placed_by, (error, foundUserDetails) => {
        if (error) {
          return next(error);
        }
        if (foundUserDetails.length === 0) {
          const err2 = new Error();
          err2.statusCode = 400;
          err2.message = 'User cannot not be found for this parcel';
          return next(err2);
        }
        userEmail = foundUserDetails[0].email;
      });
      Parcel.findByIdAndUpdateStatus(
        parcelId,
        status,
        (error2, updatedParcels) => {
          if (error2) {
            return next(error2);
          }
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
        }
      );
    });
  }
}

export default ParcelController;
