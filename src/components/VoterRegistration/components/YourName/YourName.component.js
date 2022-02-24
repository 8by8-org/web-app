import React, { useState } from "react";
import "../../VoterRegistration.scss";

export const YourName = ({ parentRef, setParentState }) => {
  const [formData, setFormData] = useState({
    title: parentRef.current.title,
    name_first: parentRef.current.name_first,
    name_middle: parentRef.current.name_middle,
    name_last: parentRef.current.name_last,
    suffix: parentRef.current.suffix,
    change_of_name: parentRef.current.change_of_name,
    prev_name_title: parentRef.current.prev_name_title,
    prev_name_first: parentRef.current.prev_name_first,
    prev_name_middle: parentRef.current.prev_name_middle,
    prev_name_last: parentRef.current.prev_name_last,
    prev_name_suffix: parentRef.current.prev_name_suffix,
  });

  return (
    <>
      <h2 className="register-form-title-small">YOUR NAME</h2>
      <label htmlFor="title" className="register-label">
        Title*
      </label>
      <select
        name="title"
        id="title"
        value={formData.title}
        className="register-input"
        onChange={(event) => {
          parentRef.current = {
            ...parentRef.current,
            title: event.target.value,
          };
          setFormData({ ...formData, title: event.target.value });
        }}
        required
      >
        <option value="">{""}</option>
        <option value="Mr.">Mr.</option>
        <option value="Mrs.">Mrs.</option>
        <option value="Miss">Miss</option>
        <option value="Ms.">Ms.</option>
        <option value="Sr.">Sr.</option>
        <option value="Sra.">Sra.</option>
        <option value="Srta.">Srta.</option>
      </select>
      <br />
      <label htmlFor="name_first" className="register-label">
        First Name*
      </label>
      <input
        type="text"
        id="name_first"
        name="name_first"
        className="register-input"
        value={formData.name_first}
        onChange={(event) => {
          parentRef.current = {
            ...parentRef.current,
            name_first: event.target.value,
          };
          setFormData({ ...formData, name_first: event.target.value });
        }}
      />
      <br />
      <label htmlFor="name_middle" className="register-label">
        Middle Name
      </label>
      <input
        type="text"
        id="name_middle"
        name="name_middle"
        className="register-input"
        value={formData.name_middle}
        onChange={(event) => {
          parentRef.current = {
            ...parentRef.current,
            name_middle: event.target.value,
          };
          setFormData({ ...formData, name_middle: event.target.value });
        }}
      />
      <br />
      <label htmlFor="name_last" className="register-label">
        Last name*
      </label>
      <input
        type="text"
        id="name_last"
        name="name_last"
        className="register-input"
        value={formData.name_last}
        onChange={(event) => {
          parentRef.current = {
            ...parentRef.current,
            name_last: event.target.value,
          };
          setFormData({ ...formData, name_last: event.target.value });
        }}
        required
      />
      <br />
      <label htmlFor="suffix" className="register-label">
        Suffix
      </label>
      <input
        type="text"
        id="suffix"
        name="suffix"
        className="register-input"
        value={formData.suffix}
        onChange={(event) => {
          parentRef.current = {
            ...parentRef.current,
            suffix: event.target.value,
          };
          setFormData({ ...formData, suffix: event.target.value });
        }}
      />
      <br />
      <div>
        <input
          type="checkbox"
          id="change_of_name"
          name="change_of_name"
          className="register-checkbox"
          onChange={(event) => {
            parentRef.current = {
              ...parentRef.current,
              change_of_name: event.target.checked,
            };
            setFormData({ ...formData, change_of_name: event.target.checked });
          }}
        />
        <label htmlFor="change_of_name" className="register-label">
          I've changed my name.
        </label>
      </div>
      <br />
      {formData.change_of_name && (
        <>
          <h2 className="register-form-title-small">PREVIOUS NAME</h2>
          <label htmlFor="prev_name_title" className="register-label">
            Title*
          </label>
          <select
            name="prev_name_title"
            id="prev_name_title"
            className="register-input"
            value={formData.prev_name_title}
            onChange={(event) => {
              parentRef.current = {
                ...parentRef.current,
                prev_name_title: event.target.value,
              };
              setFormData({ ...formData, prev_name_title: event.target.value });
            }}
            required
          >
            <option value="">{""}</option>
            <option value="Mr.">Mr.</option>
            <option value="Mrs.">Mrs.</option>
            <option value="Miss">Miss</option>
            <option value="Ms.">Ms.</option>
            <option value="Sr.">Sr.</option>
            <option value="Sra.">Sra.</option>
            <option value="Srta.">Srta.</option>
          </select>
          <br />
          <label htmlFor="prev_name_first" className="register-label">
            First Name*
          </label>
          <input
            type="text"
            id="prev_name_first"
            name="prev_name_first"
            className="register-input"
            value={formData.prev_name_first}
            onChange={(event) => {
              parentRef.current = {
                ...parentRef.current,
                prev_name_first: event.target.value,
              };
              setFormData({ ...formData, prev_name_first: event.target.value });
            }}
          />
          <br />
          <label htmlFor="prev_name_middle" className="register-label">
            Middle Name
          </label>
          <input
            type="text"
            id="prev_name_middle"
            name="prev_name_middle"
            className="register-input"
            value={formData.prev_name_middle}
            onChange={(event) => {
              parentRef.current = {
                ...parentRef.current,
                prev_name_middle: event.target.value,
              };
              setFormData({
                ...formData,
                prev_name_middle: event.target.value,
              });
            }}
          />
          <br />
          <label htmlFor="prev_name_last" className="register-label">
            Last name*
          </label>
          <input
            type="text"
            id="prev_name_last"
            name="prev_name_last"
            className="register-input"
            value={formData.prev_name_last}
            onChange={(event) => {
              parentRef.current = {
                ...parentRef.current,
                prev_name_last: event.target.value,
              };
              setFormData({ ...formData, prev_name_last: event.target.value });
            }}
            required
          />
          <br />
          <label htmlFor="prev_name_suffix" className="register-label">
            Suffix
          </label>
          <input
            type="text"
            id="prev_name_suffix"
            name="prev_name_suffix"
            value={formData.prev_name_suffix}
            className="register-input"
            onChange={(event) => {
              parentRef.current = {
                ...parentRef.current,
                prev_name_suffix: event.target.value,
              };
              setFormData({
                ...formData,
                prev_name_suffix: event.target.value,
              });
            }}
          />
          <br />
        </>
      )}
      <button
        className="next-btn"
        onClick={(event) => {
          event.preventDefault();
          //need to add guards here
          setParentState("homeAddress");
        }}
      >
        Next
      </button>
    </>
  );
};
