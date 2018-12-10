import sendMessages from './configureSendGrid';

class SendEmail {
  static sendEmailToUserRegardingStatusUpgrade(
    userEmail,
    parcelDetails,
    newStatus = null,
    presentLocation = null
  ) {
    const parcelWeight = parcelDetails[0].weight;
    const parcelPickup = parcelDetails[0].pick_up_location;
    const parcelDestination = parcelDetails[0].destination;
    const parcelSentOn = parcelDetails[0].sent_on;
    const parcelSentOnFormatted = parcelSentOn.toLocaleString();
    const parcelName = parcelDetails[0].parcel_name;

    const options = () => {
      if (presentLocation === null) {
        return {
          additionalMessage: `is succesfully updated to ${newStatus}`,
          subjectHeader: 'Your Parcel at SendIT Courier Update',
        };
      }
      return {
        additionalMessage: `present Location is now 
      ${presentLocation}`,
        subjectHeader:
          'Your Parcel at SendIT Courier Services Present Location',
      };
    };
    const msg = {
      to: userEmail,
      from: 'obasajujoshua31@gmail.com',
      subject: options().subjectHeader,
      html: `<div style ="background-color: lightgray; width: 100%; height:50%; padding: 10px">
                            We are pleased to inform you that the parcel with the following particulars:<br>
                            <hr>
                            <span style ="font-weight: bold;">Parcel Name :</span><span style ="color:brown">${parcelName}</span><br><hr>
                            <span style ="font-weight: bold;">weight :</span><span style ="color:brown">${parcelWeight}</span><br><hr>
                            <span style ="font-weight: bold;">Pick Up Location :</span><span style ="color:brown">${parcelPickup}</span><br><hr>
                            <span style ="font-weight: bold;">Destination :</span><span style ="color:brown">${parcelDestination}</span><br><hr>
                            <span style ="font-weight: bold;">Date Sent :</span><span style ="color:brown">${parcelSentOnFormatted}</span><br><hr>
                            <center>${options().additionalMessage}<center>
                            </div>`,
    };
    sendMessages(msg);
  }
}

export default SendEmail;
