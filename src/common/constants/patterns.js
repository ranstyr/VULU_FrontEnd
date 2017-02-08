export const PATTERNS = {
  email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  // 1 digit, 1 letter, minimum 8 chars and maximum 12 chars
  password: /^(?=.*\d)(?=.*[a-zA-Z]).{8,12}$/
};