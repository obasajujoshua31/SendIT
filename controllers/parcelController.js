import database from './database';

class ParcelController {
  static getAllParcels(req, res) {
    res.send({
      status: 200,
      data: database,
    });
  }

  static getParcelsByUserId(req, res) {
    const { userId } = req.params;
    const message = database.filter(parcel => parcel.placedBy === +userId);
    if (message.length === 0) {
      res.status(404).send({
        status: 404,
        error: 'The User has no Parcels',
      });
      return;
    }
    res.send({
      status: 200,
      data: message,
    });
  }

  static getParcelsByParcelId(req, res) {
    const { parcelId } = req.params;
    const message = database.filter(parcel => parcel.id === +parcelId);
    if (message.length === 0) {
      res.status(404).send({
        status: 404,
        error: 'The Parcel cannot be found',
      });
      return;
    }
    res.send({
      status: 200,
      data: message,
    });
  }

  static cancelParcelOrderById(req, res) {
    const { parcelId } = req.params;
    const message = database.filter(parcel => parcel.id === +parcelId);
    if (message.length === 0) {
      res.status(404).send({
        status: 404,
        error: 'Cannot find the Order',
      });
      return;
    }
    res.send({
      status: 200,
      message: 'order cancelled',
    });
  }
}
export default ParcelController;
