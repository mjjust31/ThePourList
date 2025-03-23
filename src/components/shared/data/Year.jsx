const currentYear = new Date().getFullYear();
const startYear = currentYear - 60;

const years = Array.from(
  { length: currentYear - startYear + 1 },
  (_, i) => currentYear - i
);

export default years;
