import jwt from 'jsonwebtoken';
import Parcel from '../models/parcel';

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
    const userDetails = jwt.verify(bearer[1], 'great_is_him');
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
      Parcel.findByIdAndUpdate(parcelId, destination, (e, results) => {
        if (e) {
          return next(e);
        }
        if (results.length === 0) {
          const err2 = new Error();
          err2.message = 'Parcel not found';
          return next(err2);
        }
        return res.status(200).json({
          success: true,
          data: results,
        });
      });
    });
  }

  static changeParcelPresentLocationByAdminById(req, res, next) {
    const { parcelId } = req.params;
    const { presentLocation } = req.body;
    Parcel.findByIdAndChangeLocation(
      +parcelId,
      presentLocation,
      (err, results) => {
        if (err) {
          return next(err);
        }
        if (results.length === 0) {
          const err2 = new Error();
          err2.message = 'Parcel not found';
          return next(err2);
        }
        return res.status(200).json({
          success: true,
          data: results,
        });
      }
    );
  }

  static changeParcelStatusByAdminById(req, res, next) {
    const { parcelId } = req.params;
    const { status } = req.body;
    Parcel.findByIdAndUpdateStatus(+parcelId, status, (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.length === 0) {
        const err2 = new Error();
        err2.message = 'Parcel not found';
        return next(err2);
      }
      return res.status(200).json({
        success: true,
        data: results,
      });
    });
  }
}

export default ParcelController;
