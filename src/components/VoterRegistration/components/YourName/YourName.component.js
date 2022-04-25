import React, { useState } from "react";
import { Tooltip } from "../Tooltip/Tooltip.component";
import "../../VoterRegistration.scss";

export const YourName = ({ parentRef, setParentState }) => {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name_title: parentRef.current.name_title,
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

  const [activeFields, setActiveFields] = useState({
    name_title:
      parentRef.current.name_title && parentRef.current.name_title.length > 0,
    name_first:
      parentRef.current.name_first && parentRef.current.name_first.length > 0,
    name_middle:
      parentRef.current.name_middle && parentRef.current.name_middle.length > 0,
    name_last:
      parentRef.current.name_last && parentRef.current.name_last.length > 0,
    suffix: parentRef.current.suffix && parentRef.current.suffix.length > 0,
    prev_name_title:
      parentRef.current.prev_name_title &&
      parentRef.current.prev_name_title.length > 0,
    prev_name_first:
      parentRef.current.prev_name_first &&
      parentRef.current.prev_name_first.length > 0,
    prev_name_middle:
      parentRef.current.prev_name_middle &&
      parentRef.current.prev_name_middle.length > 0,
    prev_name_last:
      parentRef.current.prev_name_last &&
      parentRef.current.prev_name_last.length > 0,
    prev_name_suffix:
      parentRef.current.prev_name_suffix &&
      parentRef.current.prev_name_suffix.length > 0,
  });

  return (
    <>
      <div className="horizontalContainer">
        <h2 className="register-form-title-small">YOUR NAME </h2>
        <Tooltip text="Put your full name in these boxes. Please do not use nicknames or initials. If this application is for a change of name, you will be asked for your previous name in a later section. Don't forget to include your title (Mr., Mrs., Miss, Ms.)." />
      </div>
      <label
        htmlFor="title"
        className={
          activeFields.name_title
            ? "floating-label-active"
            : "floating-label-default"
        }
        onClick={() => {
          setActiveFields({ ...activeFields, name_title: true });
        }}
      >
        Title*
      </label>
      <select
        name="name_title"
        id="name_title"
        value={formData.name_title}
        className="register-input"
        onFocus={() => {
          setActiveFields({ ...activeFields, name_title: true });
        }}
        onChange={(event) => {
          parentRef.current = {
            ...parentRef.current,
            name_title: event.target.value,
          };
          setFormData({ ...formData, name_title: event.target.value });
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
      <label
        htmlFor="name_first"
        className={
          activeFields.name_first
            ? "floating-label-active"
            : "floating-label-default"
        }
      >
        First Name*
      </label>
      <input
        type="text"
        id="name_first"
        name="name_first"
        className="register-input"
        value={formData.name_first}
        onClick={() => {
          setActiveFields({ ...activeFields, name_first: true });
        }}
        onFocus={() => {
          setActiveFields({ ...activeFields, name_first: true });
        }}
        onChange={(event) => {
          parentRef.current = {
            ...parentRef.current,
            name_first: event.target.value,
          };
          setFormData({ ...formData, name_first: event.target.value });
        }}
      />
      <br />
      <label
        htmlFor="name_middle"
        className={
          activeFields.name_middle
            ? "floating-label-active"
            : "floating-label-default"
        }
      >
        Middle Name
      </label>
      <input
        type="text"
        id="name_middle"
        name="name_middle"
        className="register-input"
        value={formData.name_middle}
        onClick={() => {
          setActiveFields({ ...activeFields, name_middle: true });
        }}
        onFocus={() => {
          setActiveFields({ ...activeFields, name_middle: true });
        }}
        onChange={(event) => {
          parentRef.current = {
            ...parentRef.current,
            name_middle: event.target.value,
          };
          setFormData({ ...formData, name_middle: event.target.value });
        }}
      />
      <br />
      <label
        htmlFor="name_last"
        className={
          activeFields.name_last
            ? "floating-label-active"
            : "floating-label-default"
        }
      >
        Last name*
      </label>
      <input
        type="text"
        id="name_last"
        name="name_last"
        className="register-input"
        value={formData.name_last}
        onClick={() => {
          setActiveFields({ ...activeFields, name_last: true });
        }}
        onFocus={() => {
          setActiveFields({ ...activeFields, name_last: true });
        }}
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
      <label
        htmlFor="suffix"
        className={
          activeFields.suffix
            ? "floating-label-active"
            : "floating-label-default"
        }
      >
        Suffix
      </label>
      <input
        type="text"
        id="suffix"
        name="suffix"
        className="register-input"
        onClick={() => {
          setActiveFields({ ...activeFields, suffix: true });
        }}
        onFocus={() => {
          setActiveFields({ ...activeFields, suffix: true });
        }}
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
      <div style={{ width: "100%", display: "flex", alignItems: "center" }}>
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
        <Tooltip text="If you have changed your name since your last registration, check this box and enter your previous name below." />
      </div>
      <br />
      {formData.change_of_name && (
        <>
          <h2 className="register-form-title-small">PREVIOUS NAME</h2>
          <label
            htmlFor="prev_name_title"
            className={
              activeFields.prev_name_title
                ? "floating-label-active"
                : "floating-label-default"
            }
          >
            Title*
          </label>
          <select
            name="prev_name_title"
            id="prev_name_title"
            className="register-input"
            value={formData.prev_name_title}
            onClick={() => {
              setActiveFields({ ...activeFields, prev_name_title: true });
            }}
            onFocus={() => {
              setActiveFields({ ...activeFields, prev_name_title: true });
            }}
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
          <label
            htmlFor="prev_name_first"
            className={
              activeFields.prev_name_first
                ? "floating-label-active"
                : "floating-label-default"
            }
          >
            First Name*
          </label>
          <input
            type="text"
            id="prev_name_first"
            name="prev_name_first"
            className="register-input"
            onClick={() => {
              setActiveFields({ ...activeFields, prev_name_first: true });
            }}
            onFocus={() => {
              setActiveFields({ ...activeFields, prev_name_first: true });
            }}
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
          <label
            htmlFor="prev_name_middle"
            className={
              activeFields.prev_name_middle
                ? "floating-label-active"
                : "floating-label-default"
            }
          >
            Middle Name
          </label>
          <input
            type="text"
            id="prev_name_middle"
            name="prev_name_middle"
            className="register-input"
            value={formData.prev_name_middle}
            onClick={() => {
              setActiveFields({ ...activeFields, prev_name_middle: true });
            }}
            onFocus={() => {
              setActiveFields({ ...activeFields, prev_name_middle: true });
            }}
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
          <label
            htmlFor="prev_name_last"
            className={
              activeFields.prev_name_last
                ? "floating-label-active"
                : "floating-label-default"
            }
          >
            Last name*
          </label>
          <input
            type="text"
            id="prev_name_last"
            name="prev_name_last"
            className="register-input"
            value={formData.prev_name_last}
            onClick={() => {
              setActiveFields({ ...activeFields, prev_name_last: true });
            }}
            onFocus={() => {
              setActiveFields({ ...activeFields, prev_name_last: true });
            }}
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
          <label
            htmlFor="prev_name_suffix"
            className={
              activeFields.prev_name_suffix
                ? "floating-label-active"
                : "floating-label-default"
            }
          >
            Suffix
          </label>
          <input
            type="text"
            id="prev_name_suffix"
            name="prev_name_suffix"
            value={formData.prev_name_suffix}
            className="register-input"
            onClick={() => {
              setActiveFields({ ...activeFields, prev_name_suffix: true });
            }}
            onFocus={() => {
              setActiveFields({ ...activeFields, prev_name_suffix: true });
            }}
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
      <p style={{ color: "red", fontStyle: "italic", textAlign: "center" }}>
        {error}
      </p>
      <button
        className="next-btn"
        onClick={(event) => {
          event.preventDefault();
          if (
            formData.name_title.length === 0 ||
            formData.name_first.length === 0 ||
            formData.name_last.length === 0 ||
            (formData.change_of_name &&
              (formData.prev_name_title.length === 0 ||
                formData.prev_name_first.length === 0 ||
                formData.prev_name_last.length === 0))
          ) {
            setError("Please complete all of the required fields");
            return;
          }
          setParentState("homeAddress");
        }}
      >
        Next
      </button>
    </>
  );
};
