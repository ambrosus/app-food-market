let Validator = function (value) {
  this.value = value;
  this.errors = [];
};

Validator.prototype.validate = function () {
  return this;
};

Validator.prototype.null = function (message) {
  if (this.value === '') this.errors.push(message);
  return this;
};

Validator.prototype.number = function (message) {
  if (isNaN(this.value)) this.errors.push(message);
  return this;
};

Validator.prototype.min = function (min, message) {
  if (this.value < min) this.errors.push(message);
  return this;
};

Validator.prototype.range = function (min, max, message) {
  if (this.min(min) || this.max(max)) this.errors.push(message);
  return this;
};

Validator.prototype.max = function (max, message) {
  if (this.value > max) this.errors.push(message);
  return this;
};

let validator = new Validator()
  .validate()
  .null('Not defined')
  .number('Not a number')
  .range(3, 5, 'Not in range');

export default Validator;
