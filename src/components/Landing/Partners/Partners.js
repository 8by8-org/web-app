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
    bLink: "",
    bType: "",
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
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    getAllPartnerData((data) => setPartners(data))
  }, []);

  function editPartnerData(partnerName) {
    setEditing(true)
    let startDateString = ""
    if (partners[partnerName].rewardStartDate) {
      const startDate = new Date(partners[partnerName].rewardStartDate)
      startDateString =
      startDate.getFullYear() + "-" +
      ((startDate.getMonth() + 1) < 10 ? "0" + (startDate.getMonth() + 1) : startDate.getMonth() + 1) + "-" +
      (startDate.getDate() < 10 ? "0" + startDate.getDate() : startDate.getDate())
    }

    let endDateString = ""
    if (partners[partnerName].rewardEndDate) {
      const endDate = new Date(partners[partnerName].rewardEndDate)
      endDateString =
      endDate.getFullYear() + "-" +
      ((endDate.getMonth() + 1) < 10 ? "0" + (endDate.getMonth() + 1) : endDate.getMonth() + 1) + "-" +
      (endDate.getDate() < 10 ? "0" + endDate.getDate() : endDate.getDate())
    }

    setFields({
      name: partners[partnerName].name,
      logoUrl: partners[partnerName].logo,
      bDesc: partners[partnerName].businessDescription,
      bLink: partners[partnerName].businessLink,
      bType: partners[partnerName].businessType,
      rewType: partners[partnerName].rewardType,
      locType: partners[partnerName].locationType,
      locDes: partners[partnerName].locationDescription,
      rewLink: partners[partnerName].rewardLink,
      rewDes: partners[partnerName].rewardDescription,
      rewCon: partners[partnerName].rewardConditions,
      rewSD: startDateString,
      rewED: endDateString,
      rewAva: partners[partnerName].rewardAvailable
    })
    setView("New/Edit")
  }

  function onFormSubmit(e) {
    if (fields.name) {
      let rewSDate = new Date()
      if (fields.rewSD) {
        rewSDate.setFullYear(fields.rewSD.slice(0, 4))
        rewSDate.setMonth(fields.rewSD.slice(5, 7) - 1)
        rewSDate.setDate(fields.rewSD.slice(8, 10))
        rewSDate.setHours(0)
        rewSDate.setMinutes(0)
        rewSDate.setSeconds(0)
      }
      let rewEDate = fields.rewED ? new Date() : ""
      if (rewEDate) {
        rewEDate.setFullYear(fields.rewED.slice(0, 4))
        rewEDate.setMonth(fields.rewED.slice(5, 7) - 1)
        rewEDate.setDate(fields.rewED.slice(8, 10))
        rewEDate.setHours(0)
        rewEDate.setMinutes(0)
        rewEDate.setSeconds(0)
      }
      e.preventDefault()
      wOuPartnerData(
        fields.name,
        fields.logoUrl,
        fields.bDesc,
        fields.bLink,
        fields.bType,
        fields.rewType,
        fields.locType,
        fields.locDes,
        fields.rewLink,
        fields.rewDes,
        fields.rewCon,
        rewSDate,
        rewEDate,
        fields.rewAva
      )
      setView("View")
      setEditing(false)
      setFields({
        name: "",
        logoUrl: "",
        bDesc: "",
        bLink: "",
        bType: "",
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
  }

  return (
    <div className="partnersPage">
      <div className="tabs">
        <button
          className={"viewTab" + (view === "View" ? " tabSelected" : "")}
          onClick={() => setView("View")}
        >
          View
        </button>
        <button
          className={"newEditTab" + (view === "New/Edit" ? " tabSelected" : "")}
          onClick={() => setView("New/Edit")}
        >
          New/Edit
        </button>
      </div>
      {!partners && <p className="noPartners">There is no partners in the database add one in the New/Edit tab.</p>}
      {view === "View" ?
        <div>
          {partners && Object.keys(partners).map(function(key) {
            return (
              <div key={partners[key].name}>
                <h3>{partners[key].name}</h3>
                <p className="partnerData">
                  <b>Logo Url:</b> {partners[key].logo}
                  <br/><br/>
                  <b>Business Description:</b> {partners[key].businessDescription}
                  <br/><br/>
                  <b>Business Link:</b> {partners[key].businessLink}
                  <br/><br/>
                  <b>Business Type:</b> {partners[key].businessType}
                  <br/><br/>
                  <b>Reward Type:</b> {partners[key].rewardType}
                  <br/><br/>
                  <b>Location Type:</b> {partners[key].locationType}
                  <br/><br/>
                  <b>Location Description:</b> {partners[key].locationDescription}
                  <br/><br/>
                  <b>Reward Link:</b> {partners[key].rewardLink}
                  <br/><br/>
                  <b>Reward Description:</b> {partners[key].rewardDescription}
                  <br/><br/>
                  <b>Reward Conditions:</b> {partners[key].rewardConditions}
                  <br/><br/>
                  <b>Reward Start Date:</b> {partners[key].rewardStartDate}
                  <br/><br/>
                  <b>Reward End Date:</b> {partners[key].rewardEndDate}
                  <br/><br/>
                  <b>Reward Available:</b> {partners[key].rewardAvailable.toString()}
                </p>
                <div className="partnerButtons">
                  <button onClick={() => deletePartnerData(partners[key].name)}>Delete</button>
                  <button className="editButton" onClick={() => editPartnerData(partners[key].name)}>Edit</button>
                </div>
              </div>
            )
          })}
        </div>
      :
        <form className="form">
          <label className="nameInput">Name*:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={fields.name}
            onChange={(event) => {
              if (editing) {
                setEditing(false)
              }
              setFields({
                ...fields,
                name: event.target.value,
              });
            }}
            required
          />
          {editing &&
            <p className="editNameText">
              If you change this name then the database will create a new entry instead of modifying the existing one.
            </p>
          }
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
          <label>Reward Redemption Start Date:</label>
          <input
            type="date"
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
          <label>Reward Redemption End Date:</label>
          <input
            type="date"
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
          <label>Reward Available:</label>
          <div>
            <input
              type="radio"
              id="True"
              name="rewAva"
              checked={fields.rewAva}
              onChange={() => {}}
              onClick={() => {
                setFields({
                  ...fields,
                  rewAva: true,
                });
              }}
            />
            <label className="rAvaLabel">True</label>
            <br/>
            <input
              type="radio"
              id="False"
              name="rewAva"
              checked={!fields.rewAva}
              onChange={() => {}}
              onClick={() => {
                setFields({
                  ...fields,
                  rewAva: false,
                });
              }}
            />
            <label className="rAvaLabel">False</label>
          </div>
          <button onClick={(event) => onFormSubmit(event)}>New/Edit</button>
        </form>
      }
    </div>
  );
}
