import axios from "axios";

export const checkAddressValidity = (
  { street, streetLine2, unit, city, state, zip },
  successCb,
  failureCb
) => {
  if (
    !state.length > 0 ||
    !city.length > 0 ||
    !street.length > 0 ||
    !zip.length > 0
  )
    return;
  else {
    if (streetLine2) street += ", " + streetLine2;
    axios
      .post("https://usvotes-6vsnwycl4q-uw.a.run.app/validateAddress/", {
        street,
        unit,
        city,
        state,
        zip,
      })
      .then((res) => {
        const result = res.data;
        if (result.isValid) {
          successCb();
        } else {
          failureCb();
        }
      })
      .catch((err) => {
        failureCb();
      });
  }
};
