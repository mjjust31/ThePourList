// src/forms/shared/utils/formHandlers.js

// ========== Entry Form Handlers ========== //

/**
 * Handles input changes for form fields (including custom logic for wine types).
 * @param {Event} e - The input change event.
 * @param {Object} formData - Current form data state.
 * @param {Function} setFormData - State setter for form data.
 */
export const handleInputChange = (e, formData, setFormData) => {
  const { name, value } = e.target;
  setFormData({
    ...formData,
    [name]: value,
  });
};

/**
 * Handles updating the photo in form data.
 * @param {File} file - The uploaded image file.
 * @param {Object} wineData - Current wine object.
 * @param {Function} onChange - Callback to update the wine data.
 */
export const handlePhotoChange = (file, wineData, onChange) => {
  const updated = { ...wineData, photo: file };
  onChange(updated);
};

/**
 * Handles price input with two-decimal validation.
 * @param {Event} e - Input event.
 * @param {Object} formData - Current form data.
 * @param {Function} setFormData - Setter function to update form data.
 */
export const handlePriceChange = (e, formData, setFormData) => {
  const value = e.target.value;
  if (/^\d*\.?\d{0,2}$/.test(value)) {
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  }
};

// ========== Showdown Form Handlers ========== //

/**
 * Opens the modal and sets the selected wine index.
 * @param {number} index - Index of the clicked wine card.
 * @param {Function} setSelectedIndex - Sets selected index.
 * @param {Function} setShowModal - Toggles modal display.
 */
export const handleCardClick = (index, setSelectedIndex, setShowModal) => {
  setSelectedIndex(index);
  setShowModal(true);
};

/**
 * Closes the modal after form submission, then shows a "saved" modal
 * and advances the carousel automatically.
 * @param {Function} setShowModal - Closes form modal.
 * @param {Function} setShowSavedModal - Shows "Wine Saved" modal.
 * @param {Function} setCurrentIndex - Advances the carousel.
 * @param {number} currentIndex - Current position in the carousel.
 * @param {number} wineCount - Total number of wines.
 */
export const handleFormSubmit = (
  setShowModal,
  setShowSavedModal,
  setCurrentIndex,
  currentIndex,
  wineCount
) => {
  setShowModal(false);
  setShowSavedModal(true);

  setTimeout(() => {
    setShowSavedModal(false);
    if (currentIndex < wineCount - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  }, 1000); // Delay before moving on (adjust if needed)
};

/**
 * Navigates to the previous wine in the carousel.
 */
export const goToPrevious = (currentIndex, setCurrentIndex) => {
  if (currentIndex > 0) {
    setCurrentIndex((prev) => prev - 1);
  }
};

/**
 * Navigates to the next wine in the carousel.
 */
export const goToNext = (currentIndex, maxIndex, setCurrentIndex) => {
  if (currentIndex < maxIndex) {
    setCurrentIndex((prev) => prev + 1);
  }
};
