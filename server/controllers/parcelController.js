import database from './database';

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
}
export default ParcelController;
