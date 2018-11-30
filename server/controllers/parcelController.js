import jwt from 'jsonwebtoken';
import Parcel from '../models/parcel';
import User from '../models/user';

class ParcelController {
  static getAllParcels(req, res) {
    try {
      Parcel.findAll(results => {
        return res.status(200).json({
          success: true,
          data: results,
        });
      });
    } catch (e) {
      return res.status(500).json({
        success: false,
        error: 'Unexpected results',
      });
    }
  }

  static getParcelsByUserId(req, res) {
    const { userId } = req.params;
    try {
      Parcel.findByUserId(+userId, results => {
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
    } catch (e) {
      return res.status(500).json({
        success: false,
        error: 'Unexpected results',
      });
    }
  }

  static getParcelsByParcelId(req, res) {
    const { parcelId } = req.params;
    try {
      Parcel.findById(+parcelId, results => {
        if (results.length === 0) {
          return res.status(404).json({
            success: false,
            error: 'Parcel not found',
          });
        }
        return res.status(200).json({ success: true, data: results });
      });
    } catch (e) {
      return res.status(500).json({
        success: false,
        error: 'Unexpected results',
      });
    }
  }

  static postNewParcelOrder(req, res) {
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
    try {
      Parcel.save(newParcel, results => {
        return res.status(201).json({
          success: true,
          data: results,
          message: 'order created',
        });
      });
    } catch (e) {
      return res.status(500).json({
        success: false,
        error: 'Unexpected results',
      });
    }
  }

  static cancelParcelOrderById(req, res) {
    const { parcelId } = req.params;
    try {
      Parcel.findByIdAndCancel(+parcelId, results => {
        if (results.length === 0) {
          return res.status(404).json({
            success: false,
            error: 'Parcel not found',
          });
        }
        return res.status(200).json({
          success: true,
          data: results,
          message: 'order cancelled',
        });
      });
    } catch (e) {
      return res.status(500).json({
        success: false,
        error: 'Unexpected results',
      });
    }
  }

  static updateParcelOrderById(req, res) {
    const { parcelId } = req.params;
    const { destination } = req.body;
    try {
      Parcel.findById(+parcelId, foundParcel => {
        if (foundParcel.length === 0) {
          return res.status(404).json({
            success: false,
            error: 'Your order is not found',
          });
        }
        if (foundParcel[0].status === 'CANCELLED') {
          return res.status(400).json({
            success: false,
            error: 'Your Order is already Cancelled',
          });
        }
        try {
          Parcel.findByIdAndUpdate(parcelId, destination, results => {
            if (results.length === 0) {
              return res.status(404).json({
                success: true,
                error: 'Parcel not found',
              });
            }
            return res.status(200).json({
              success: true,
              data: results,
            });
          });
        } catch (e) {
          return res.status(500).json({
            success: false,
            error: 'Unexpected results',
          });
        }
      });
    } catch (e) {
      return res.status(500).json({
        success: false,
        error: 'Unexpected Results ',
      });
    }
  }

  static changeParcelPresentLocationByAdminById(req, res) {
    const { parcelId } = req.params;
    const { presentLocation } = req.body;
    try {
      Parcel.findByIdAndChangeLocation(+parcelId, presentLocation, results => {
        if (results.length === 0) {
          return res.status(404).json({
            success: false,
            error: 'Parcel not found',
          });
        }
        return res.status(200).json({
          success: true,
          data: results,
        });
      });
    } catch (e) {
      return res.status(500).json({
        success: false,
        error: 'Unexpected results',
      });
    }
  }

  static changeParcelStatusByAdminById(req, res) {
    const { parcelId } = req.params;
    const { status } = req.body;
    try {
      Parcel.findByIdAndUpdateStatus(+parcelId, status, results => {
        if (results.length === 0) {
          return res.status(404).json({
            success: false,
            error: 'Parcel not found',
          });
        }
        return res.status(200).json({
          success: true,
          data: results,
        });
      });
    } catch (e) {
      return res.status(500).json({
        success: false,
        error: 'Unexpected results',
      });
    }
  }
}

export default ParcelController;
