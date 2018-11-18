import database from './database';
import status from './status';

class ParcelController {
  static getAllParcels(req, res) {
    return res.status(200).json({
      success: true,
      data: database,
    });
  }

  static getParcelsByUserId(req, res) {
    const { userId } = req.params;
    const message = database.filter(parcel => parcel.placedBy === +userId);
    if (message.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'The User has no Parcels',
      });
    }
    return res.status(200).json({
      success: true,
      data: message,
    });
  }

  static getParcelsByParcelId(req, res) {
    const { parcelId } = req.params;
    const message = database.filter(parcel => parcel.id === +parcelId);
    if (message.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'The Parcel cannot be found',
      });
    }
    return res.status(200).json({
      success: true,
      data: message,
    });
  }

  static postNewParcelOrder(req, res) {
    const { placedBy, weight, weightMetric, from, to } = req.body;
    const databaseSize = database.length;
    const newParcel = {
      id: databaseSize + 1,
      placedBy,
      weight,
      weightMetric,
      from,
      to,
      sentOn: new Date().toLocaleString(),
      deliveredOn: '',
      status: status.PLACED,
    };
    database.push(newParcel);
    return res.status(201).json({
      success: true,
      data: database,
    });
  }

  static cancelParcelOrderById(req, res) {
    const { parcelId } = req.params;
    const message = database.filter(parcel => parcel.id === +parcelId);
    if (message.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Cannot find the Order',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'order cancelled',
    });
  }

  static removeParcelOrderById(req, res) {
    const { parcelId } = req.params;
    const foundParcels = database.find(parcel => parcel.id === +parcelId);
    const index = database.indexOf(foundParcels);
    database.splice(index, 1);
    if (!foundParcels) {
      return res.status(404).json({
        success: false,
        error: 'Your Parcel is not found',
      });
    }
    return res.status(200).json({
      success: true,
      data: database,
    });
  }
}
export default ParcelController;
