import Parcel from '../models/parcel';
import SendEmail from '../emailnotification/sendEmail';
import handleError from '../helpers/errorHandler';
import sendResponse from '../helpers/response';

class ParcelController {
  static async getAllParcels(req, res, next) {
    try {
      const allParcels = await Parcel.findAll();
      return sendResponse(allParcels, 'Order retrieved successfully', 200, res);
    } catch (e) {
      return next(e);
    }
  }

  static async getParcelsByUserId(req, res, next) {
    try {
      const foundParcel = await Parcel.findByUserId(req.params.userId);
      if (foundParcel.length === 0) {
        return handleError('The User has no Parcels', null, next);
      }
      return sendResponse(
        foundParcel,
        'Order retrieved successfully',
        200,
        res
      );
    } catch (e) {
      return next(e);
    }
  }

  static async getParcelsByParcelId(req, res, next) {
    try {
      const foundParcels = await Parcel.findById(req.params.parcelId);
      if (foundParcels.length === 0) {
        return handleError('The parcel Order cannot be found', null, next);
      }
      return sendResponse(
        foundParcels,
        'Order retrieved successfully',
        200,
        res
      );
    } catch (e) {
      return next(e);
    }
  }

  static async postNewParcelOrder(req, res, next) {
    const placedBy = req.user.userId;
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
      return sendResponse(returnedNewParcel, 'order created', 201, res);
    } catch (e) {
      return next(e);
    }
  }

  static async cancelParcelOrderById(req, res, next) {
    try {
      const foundParcel = await Parcel.findById(req.params.parcelId);
      if (foundParcel.length === 0) {
        return handleError('Parcel not found', null, next);
      }
      if (foundParcel[0].status === 'CANCELLED') {
        return handleError('Your order is already Cancelled', 400, next);
      }

      const cancelledParcel = await Parcel.findByIdAndCancel(
        req.params.parcelId
      );
      return sendResponse(cancelledParcel, 'order cancelled', 200, res);
    } catch (e) {
      return next(e);
    }
  }

  static async updateParcelOrderById(req, res, next) {
    const { parcelId } = req.params;
    const { destination } = req.body;
    try {
      const foundParcel = await Parcel.findById(req.params.parcelId);

      if (foundParcel.length === 0) {
        return handleError('Your order is not found', null, next);
      }
      if (foundParcel[0].status === 'CANCELLED') {
        return handleError('Your order is already Cancelled', 400, next);
      }
      const updatedParcels = await Parcel.findByIdAndUpdate(
        parcelId,
        destination
      );
      return sendResponse(
        updatedParcels,
        'Order updated successfully',
        200,
        res
      );
    } catch (e) {
      return next(e);
    }
  }

  static async changeParcelPresentLocationByAdminById(req, res, next) {
    const userEmail = req.user.email;
    try {
      const foundParcel = await Parcel.findById(req.params.parcelId);
      if (foundParcel.length === 0) {
        return handleError('Parcel not found', 404, next);
      }
      if (
        foundParcel[0].status === 'CANCELLED' ||
        foundParcel[0].status === 'DELIVERED'
      ) {
        return handleError('The order cannot be Updated', 400, next);
      }
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
      return sendResponse(
        updatedParcels,
        'Order retrieved successfully',
        200,
        res
      );
    } catch (e) {
      return next(e);
    }
  }

  static async changeParcelStatusByAdminById(req, res, next) {
    const userEmail = req.user.email;
    const { parcelId } = req.params;
    let { status } = req.body;
    const upperStatus = status.toUpperCase();
    if (upperStatus === 'DELIVERED') {
      status = 'DELIVERED';
    } else {
      status = 'TRANSITING';
    }
    try {
      const foundParcels = await Parcel.findById(parcelId);
      if (foundParcels.length === 0) {
        return handleError('Parcel is not found', 400, next);
      }
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
      return sendResponse(
        updatedParcels,
        'Order retrieved successfully',
        200,
        res
      );
    } catch (e) {
      return next(e);
    }
  }
}

export default ParcelController;
