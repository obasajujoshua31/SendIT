import Parcel from '../models/parcel';

class ParcelController {
  static getAllParcels(req, res) {
    Parcel.findAll(results => {
      if (results.length === 0) {
        return res.status(404).json({
          success: false,
          error: 'Parcels not found',
        });
      }
      return res.status(200).json({
        success: true,
        data: results,
      });
    });
  }

  static getParcelsByUserId(req, res) {
    const { userId } = req.params;
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
  }

  static getParcelsByParcelId(req, res) {
    const { parcelId } = req.params;

    Parcel.findById(+parcelId, results => {
      if (results.length === 0) {
        return res.status(404).json({
          success: false,
          error: 'Parcel not found',
        });
      }
      return res.status(200).json({ success: true, data: results });
    });
  }

  static postNewParcelOrder(req, res) {
    const { placedBy, weight, weightMetric, from, to } = req.body;
    const newParcel = {
      placedBy,
      weight,
      weightMetric,
      from,
      to,
      status: 'PLACED',
    };
    Parcel.save(newParcel, results => {
      if (results.length === 0) {
        return res.status(500).json({
          success: false,
          error: 'Server Error',
        });
      }
      return res.status(201).json({
        success: true,
        data: results,
        message: 'order created',
      });
    });
  }

  static cancelParcelOrderById(req, res) {
    const { parcelId } = req.params;
    Parcel.findByIdAndCancel(parcelId, results => {
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
  }

  static updateParcelOrderById(req, res) {
    const { parcelId } = req.params;
    const { destination } = req.body;
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
  }
}

export default ParcelController;
