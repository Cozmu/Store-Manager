const { idSchema, validName, addValidateSales } = require('./schemas');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: error.message };

  return { type: null, message: '' };
};

const validateName = (name) => {
  const { error } = validName.validate(name);
  if (error) {
    return {
    type: 'INVALID_NAME',
    message: '"name" length must be at least 5 characters long',
    }; 
  }
  return { type: null, message: '' };
};

const validateSalesRequired = (sales) => {
  const { error } = addValidateSales.validate(sales);
  if (error) {
    return { type: 'INVALID_INPUT', message: error.message };
  }
  return { type: null, message: '' };
};

module.exports = {
  validateSalesRequired,
  validateId,
  validateName,
};