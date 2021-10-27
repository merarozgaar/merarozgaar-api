module.exports = {
  getValidationMessage() {
    return {
      isRequired(key) {
        return `${key} is required.`;
      },
      isInvalid(key) {
        return `${key} is invalid.`;
      },
    };
  },
};
