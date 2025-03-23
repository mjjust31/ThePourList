// src/components/forms/shared/forms/entry/BeerEntryForm.jsx

import React, { useState } from "react";
import AddToInventoryButton from "../../buttons/AddtoInventoryButton";
import PhotoUpload from "../../photo/PhotoUpload";

const defaultBeerData = {
  name: "",
  style: "",
  brewery: "",
  abv: "",
  notes: "",
  photo: null,
};

const FormRow = ({ label, children }) => (
  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
    <label className="w-full sm:w-1/3 text-burgundy font-semibold">
      {label}
    </label>
    <div className="w-full sm:w-2/3">{children}</div>
  </div>
);

export default function BeerEntryForm({ beerData = defaultBeerData, onChange, onAdd }) {
  const [form, setForm] = useState(beerData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...form, [name]: value };
    setForm(updated);
    onChange(updated);
  };

  const handlePhotoChange = (file) => {
    const updated = { ...form, photo: file };
    setForm(updated);
    onChange(updated);
  };

  return (
    <form
      className="p-4 bg-white rounded-lg shadow-md w-full max-w-2xl mx-auto"
      onSubmit={(e) => e.preventDefault()}
    >
      <h2 className="text-2xl font-bold text-burgundy mb-6 text-center">
        Beer Entry Form 🍺
      </h2>

      <FormRow label="Beer Name *">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="e.g. IPA Supreme"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </FormRow>

      <FormRow label="Beer Style *">
        <input
          type="text"
          name="style"
          value={form.style}
          onChange={handleChange}
          placeholder="e.g. Hazy IPA"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </FormRow>

      <FormRow label="Brewery">
        <input
          type="text"
          name="brewery"
          value={form.brewery}
          onChange={handleChange}
          placeholder="e.g. Revolution Brewing"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </FormRow>

      <FormRow label="ABV %">
        <input
          type="text"
          name="abv"
          value={form.abv}
          onChange={handleChange}
          placeholder="e.g. 6.5"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </FormRow>

      <FormRow label="Notes">
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Tasting notes, thoughts, etc."
          className="w-full p-2 border border-gray-300 rounded"
        />
      </FormRow>

      <FormRow label="Label Photo">
        <PhotoUpload
          label="Upload Beer Photo"
          file={form.photo}
          onChange={handlePhotoChange}
        />
      </FormRow>

      {onAdd && (
        <div className="text-center mt-6">
          <AddToInventoryButton onClick={onAdd} />
        </div>
      )}
    </form>
  );
}
