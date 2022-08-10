import { getDatabase, ref, set, onValue, remove } from "firebase/database";
const db = getDatabase();

// Get a partner's data by name.
// Parameters:
// - name: name of the parner data that your getting
// - callbackFunc: function to be called with the data that is gotten
export function getPartnerData(name, callbackFunc) {
  const partnerRef = ref(db, 'partners/' + name);

  onValue(partnerRef, (snapshot) => {
    callbackFunc(snapshot.val());
  });
};

// Get all the multiple partner's data
// Parameters:
// - callbackFunc: function to be called with the data that is gotten
export function getAllPartnerData (callbackFunc) {
  const partnerRef = ref(db, 'partners/');

  onValue(partnerRef, (snapshot) => {
    callbackFunc(snapshot.val());
  });
};

// Creates a new partner data entry in the database or update an existing
// data entry with new information about the entry(the name has to be the same)
// Parameters:
// - name: partner name (string)
// - logoUrl: Logo url (string)
// - bDesc: business description (string)
// - bType: business type (string)
// - bLink: business link (string)
// - rewType: reward type (string)
// - locType: location type (string)
// - locDes: location description (string)
// - rewLink: reward link (string)
// - rewDes: reward description (string)
// - rewCon: reward conditions (string)
// - rewSD: reward redemption start date (date)
// - rewED: reward redemption end date (date)
// - rewAva: reward not available (boolean)
export function wOuPartnerData(
  name,
  logoUrl,
  bDesc,
  bType,
  bLink,
  rewType,
  locType,
  locDes,
  rewLink,
  rewDes,
  rewCon,
  rewSD,
  rewED,
  rewAva
) {
  const reference = ref(db, 'partners/' + name);
  const rewSDate = rewSD ? new Date(rewSD) : new Date();
  const rewEDate = rewED ? new Date(rewED) : "";

  set(reference, {
    name: name,
    logo: logoUrl,
    businessDescription: bDesc,
    businessType: bType,
    businessLink: bLink,
    rewardType: rewType,
    locationType: locType,
    locationDescription: locDes,
    rewardLink: rewLink,
    rewardDescription: rewDes,
    rewardConditions: rewCon,
    rewardStartDate: rewSDate.toDateString(),
    rewardEndDate: rewEDate ? rewEDate.toDateString() : rewEDate,
    rewardAvailable: rewAva
  });
};

// Delete a specific partner's data from the database
// Parameters:
// - name: name of the parner data that your deleting
export function deletePartnerData(name) {
  const reference = ref(db, 'partners/' + name);

  remove(reference)
};
