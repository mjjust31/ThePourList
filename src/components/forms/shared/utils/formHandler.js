// src/forms/shared/utils/formHandlers.js

//Entry Form Handler

// components/forms/shared/utils/handleInputChange.js

export const handleInputChange = (e, formData, setFormData) => {
  const { name, value } = e.target;
  setFormData({
    ...formData,
    [name]: value,
  });
};

// /components/forms/shared/utils/handlePhotoChange.js
export const handlePhotoChange = (file, wineData, onChange) => {
  const updated = { ...wineData, photo: file };
  onChange(updated);
};

export const handlePriceChange = (e) => {
  const value = e.target.value;
  if (/^\d*\.?\d{0,2}$/.test(value)) {
    handleChange(e);
  }
};

//Showdown Form Handler
/**
 * Opens the modal and sets the selected index for the card being edited.
 */
export const handleCardClick = (index, setSelectedIndex, setShowModal) => {
  setSelectedIndex(index);
  setShowModal(true);
};

/**
 * Closes the modal on form submission.
 */
export const handleFormSubmit = (setShowModal) => {
  setShowModal(false);
};

/**
 * Navigates to the previous card if not already at the first.
 */
export const goToPrevious = (currentIndex, setCurrentIndex) => {
  if (currentIndex > 0) {
    setCurrentIndex((prev) => prev - 1);
  }
};

/**
 * Navigates to the next card if not already at the last.
 */
export const goToNext = (currentIndex, maxIndex, setCurrentIndex) => {
  if (currentIndex < maxIndex) {
    setCurrentIndex((prev) => prev + 1);
  }
};
