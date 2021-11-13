import React from "react";

export default function VoterRegistrationForm(props) {
  return (
    <form style={{ color: "white" }}>
      <label for="email">Email:</label>
      <input type="email" id="email" />
      <label for="prefix">Prefix:</label>
      <select name="prefix" id="prefix">
        <option value="Mr.">Mr.</option>
        <option value="Mrs.">Mrs.</option>
        <option value="Ms.">Ms.</option>
        <option value="Dr.">Dr.</option>
      </select>
      <label for="fname">First name:</label>
      <input type="text" id="fname" />
      <label for="mname">Middle:</label>
      <input type="text" id="mname" />
      <label for="lname">Last name:</label>
      <input type="text" id="lname" />
      <label for="suffix">Suffix:</label>
      <input type="text" id="suffix" />
      <label>DOB:</label>
      <input type="date" id="dob" />
      <input type="checkbox" id="USCitizen" name="USCitizen" />
      <label for="USCitizen">I am a US Citizen</label>
      <input type="checkbox" id="IAm18" name="IAm18" />
      <label for="IAm18">
        I will be 18 or older by the time of the next election.
      </label>
      <label for="address">Address:</label>
      <input type="text" id="address" />
      <label for="addressLine2">Address line 2:</label>
      <input type="text" id="addressLine2" />
      <label for="unitNo">Unit number:</label>
      <input type="text" id="unitNo" />
      <label for="unitType">Unit type:</label>
      <input type="text" id="unitType" />
      <label for="city">City</label>
      <input type="text" id="city" />
      <label for="state">State:</label>
      <input type="text" id="state" />
      <label for="zip">Zip:</label>
      <input type="text" id="zip" />
      <label for="county">County:</label>
      <input type="text" id="county" />
      <label for="phone">Phone:</label>
      <input type="text" id="phone" />
      <label for="phoneType">Phone type:</label>
      <input type="text" id="phoneType" />
      <input type="checkbox" id="changedParties" name="changedParties" />
      <label for="changedParties">I have changed my political party.</label>
      <label for="politicalParty">Political party:</label>
      <input type="text" id="politicalParty" />
      <label for="race">Race:</label>
      <input type="text" id="race" />
      <label for="stateID">State ID #:</label>
      <input type="text" id="stateID" />
      <label for="SSN">Last four digits of SSN:</label>
      <input type="text" id="SSN" />
    </form>
  );
}
