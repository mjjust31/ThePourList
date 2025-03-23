// src/components/forms/shared/forms/entry/CocktailEntryForm.jsx

import React, { useState } from "react";
import AddToInventoryButton from "../../buttons/AddtoInventoryButton";
import PhotoUpload from "../../photo/PhotoUpload";

const defaultCocktailData = {
  name: "",
  baseSpirit: "",
  ingredients: "",
  glassType: "",
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

export default function CocktailEntryForm({
  cocktailData = defaultCocktailData,
  onChange,
  onAdd,
}) {
  const [form, setForm] = useState(cocktailData);

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
        Cocktail Entry Form 🍸
      </h2>

      <FormRow label="Cocktail Name *">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="e.g. Espresso Martini"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </FormRow>

      <FormRow label="Base Spirit *">
        <input
          type="text"
          name="baseSpirit"
          value={form.baseSpirit}
          onChange={handleChange}
          placeholder="e.g. Vodka"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </FormRow>

      <FormRow label="Ingredients">
        <input
          type="text"
          name="ingredients"
          value={form.ingredients}
          onChange={handleChange}
          placeholder="e.g. Coffee liqueur, simple syrup"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </FormRow>

      <FormRow label="Glass Type">
        <input
          type="text"
          name="glassType"
          value={form.glassType}
          onChange={handleChange}
          placeholder="e.g. Coupe"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </FormRow>

      <FormRow label="Notes">
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Tasting notes, garnishes, presentation tips"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </FormRow>

      <FormRow label="Label Photo">
        <PhotoUpload
          label="Upload Cocktail Photo"
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
