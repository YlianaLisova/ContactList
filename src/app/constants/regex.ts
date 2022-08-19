export const RegEx = {
  name: new RegExp('^[a-zA-Z][a-zA-Z\\d]{1,19}$'),
  lastName: new RegExp('^[a-zA-Z][a-zA-Z\\d]{1,19}$'),
  number: new RegExp('^\\+?3?8?(0(67|68|96|97|98|66|95|99|63|44)\\d{7})$'),
  email: new RegExp('^[a-zA-Z\\d.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z\\d-]+(?:\\.[a-zA-Z\\d-]+)*$')
}
