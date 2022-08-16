import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
import {
  getAllPartnerData,
  wOuPartnerData,
  deletePartnerData
} from "../../../functions/partnerData";
import "./Partners.scss";

export default function Partners() {
  // const history = useHistory();
  const [view, setView] = useState("View");
  const [fields, setFields] = useState({
    name: "",
    logoUrl: "",
    bDesc: "",
    bType: "",
    bLink: "",
    rewType: "",
    locType: "",
    locDes: "",
    rewLink: "",
    rewDes: "",
    rewCon: "",
    rewSD: "",
    rewED: "",
    rewAva: true
  });
  const [partners, setPartners] = useState();

  useEffect(() => {
    getAllPartnerData((data) => setPartners(data))
  }, []);

  function editPartnerData(partnerName) {
    setFields({
      name: partners[partnerName].name,
      logoUrl: partners[partnerName].logo,
      bDesc: partners[partnerName].businessDescription,
      bType: partners[partnerName].businessType,
      bLink: partners[partnerName].businessLink,
      rewType: partners[partnerName].rewardType,
      locType: partners[partnerName].locationType,
      locDes: partners[partnerName].locationDescription,
      rewLink: partners[partnerName].rewardLink,
      rewDes: partners[partnerName].rewardDescription,
      rewCon: partners[partnerName].rewardConditions,
      rewSD: partners[partnerName].rewardStartDate,
      rewED: partners[partnerName].rewardEndDate,
      rewAva: partners[partnerName].rewardAvailable
    })
    setView("New/Edit")
  }

  function onFormSubmit() {
    wOuPartnerData(
      fields.name,
      fields.logoUrl,
      fields.bDesc,
      fields.bType,
      fields.bLink,
      fields.rewType,
      fields.locType,
      fields.locDes,
      fields.rewLink,
      fields.rewDes,
      fields.rewCon,
      fields.rewSD,
      fields.rewED,
      fields.rewAva
    )
    setView("View")
    setFields({
      name: "",
      logoUrl: "",
      bDesc: "",
      bType: "",
      bLink: "",
      rewType: "",
      locType: "",
      locDes: "",
      rewLink: "",
      rewDes: "",
      rewCon: "",
      rewSD: "",
      rewED: "",
      rewAva: true
    })
  }

  return (
    <div className="partnersPage">
      <br/>
      <br/>
      <div className="tabs">
        <button onClick={() => setView("View")}>View</button>
        <button onClick={() => setView("New/Edit")}>New/Edit</button>
      </div>
      {view === "View" ?
        <div>
          {partners && Object.keys(partners).map(function(key) {
            return (
              <div key={partners[key].name}>
                <h3>{partners[key].name}</h3>
                <br/>
                <p className="partnerData">
                  Logo Url: {partners[key].logo}
                  <br/><br/>
                  Business Description: {partners[key].businessDescription}
                  <br/><br/>
                  Business Type: {partners[key].businessType}
                  <br/><br/>
                  Business Link: {partners[key].businessLink}
                  <br/><br/>
                  Reward Type: {partners[key].rewardType}
                  <br/><br/>
                  Location Type: {partners[key].locationType}
                  <br/><br/>
                  Location Description: {partners[key].locationDescription}
                  <br/><br/>
                  Reward Link: {partners[key].rewardLink}
                  <br/><br/>
                  Reward Description: {partners[key].rewardDescription}
                  <br/><br/>
                  Reward Conditions: {partners[key].rewardConditions}
                  <br/><br/>
                  Reward Start Date: {partners[key].rewardStartDate}
                  <br/><br/>
                  Reward End Date: {partners[key].rewardEndDate}
                  <br/><br/>
                  Reward Available: {partners[key].rewardAvailable}
                  <br/><br/>
                </p>
                <button onClick={() => deletePartnerData(partners[key].name)}>Delete</button>
                <button onClick={() => editPartnerData(partners[key].name)}>Edit</button>
                <br/><br/>
              </div>
            )
          })}
        </div>
      :
        <form className="form">
          <label>Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={fields.name}
            onChange={(event) => {
              setFields({
                ...fields,
                name: event.target.value,
              });
            }}
          />
          <br/><br/>
          <label>Logo Url:</label>
          <input
            type="text"
            id="logoUrl"
            name="logoUrl"
            value={fields.logoUrl}
            onChange={(event) => {
              setFields({
                ...fields,
                logoUrl: event.target.value,
              });
            }}
          />
          <br/><br/>
          <label>Business Description:</label>
          <input
            type="text"
            id="bDesc"
            name="bDesc"
            value={fields.bDesc}
            onChange={(event) => {
              setFields({
                ...fields,
                bDesc: event.target.value,
              });
            }}
          />
          <br/><br/>
          <label>Business Type:</label>
          <input
            type="text"
            id="bType"
            name="bType"
            value={fields.bType}
            onChange={(event) => {
              setFields({
                ...fields,
                bType: event.target.value,
              });
            }}
          />
          <br/><br/>
          <label>Business Link:</label>
          <input
            type="text"
            id="bLink"
            name="bLink"
            value={fields.bLink}
            onChange={(event) => {
              setFields({
                ...fields,
                bLink: event.target.value,
              });
            }}
          />
          <br/><br/>
          <label>Reward Type:</label>
          <input
            type="text"
            id="rewType"
            name="rewType"
            value={fields.rewType}
            onChange={(event) => {
              setFields({
                ...fields,
                rewType: event.target.value,
              });
            }}
          />
          <br/><br/>
          <label>Location Type:</label>
          <input
            type="text"
            id="locType"
            name="locType"
            value={fields.locType}
            onChange={(event) => {
              setFields({
                ...fields,
                locType: event.target.value,
              });
            }}
          />
          <br/><br/>
          <label>Location Description:</label>
          <input
            type="text"
            id="locDes"
            name="locDes"
            value={fields.locDes}
            onChange={(event) => {
              setFields({
                ...fields,
                locDes: event.target.value,
              });
            }}
          />
          <br/><br/>
          <label>Reward Link:</label>
          <input
            type="text"
            id="rewLink"
            name="rewLink"
            value={fields.rewLink}
            onChange={(event) => {
              setFields({
                ...fields,
                rewLink: event.target.value,
              });
            }}
          />
          <br/><br/>
          <label>Reward Description:</label>
          <input
            type="text"
            id="rewDes"
            name="rewDes"
            value={fields.rewDes}
            onChange={(event) => {
              setFields({
                ...fields,
                rewDes: event.target.value,
              });
            }}
          />
          <br/><br/>
          <label>Reward Conditions:</label>
          <input
            type="text"
            id="rewCon"
            name="rewCon"
            value={fields.rewCon}
            onChange={(event) => {
              setFields({
                ...fields,
                rewCon: event.target.value,
              });
            }}
          />
          <br/><br/>
          <label>Reward Redemption Start Date:</label>
          <input
            type="text"
            id="rewSD"
            name="rewSD"
            value={fields.rewSD}
            onChange={(event) => {
              setFields({
                ...fields,
                rewSD: event.target.value,
              });
            }}
          />
          <br/><br/>
          <label>Reward Redemption End Date:</label>
          <input
            type="text"
            id="rewED"
            name="rewED"
            value={fields.rewED}
            onChange={(event) => {
              setFields({
                ...fields,
                rewED: event.target.value,
              });
            }}
          />
          <br/><br/>
          <label>Reward Available:</label>
          <input
            type="text"
            id="rewAva"
            name="rewAva"
            value={fields.rewAva}
            onChange={(event) => {
              setFields({
                ...fields,
                rewAva: event.target.value,
              });
            }}
          />
          <br/><br/>
          <button onClick={onFormSubmit}>New/Edit</button>
          <br/><br/>
        </form>
      }
    </div>
  );
}
