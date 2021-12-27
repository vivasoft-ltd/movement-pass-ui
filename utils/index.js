import moment from 'moment';

export const CARD_TYPES = {
  national_id: 'National ID',
  driving: 'Driving License',
  passport: 'Passport Number',
  birth_registration: 'Birth Registration Number',
  student_id: 'Student ID',
  employee_id: 'Employee ID'
};

export const FORMAT_PHONE_NUMBER = (number) => {
  return '0' + number.slice(-10);
};

export const MOVEMENT_REASONS = [
  'Take Covid Vaccine',
  'Covid Test',
  'Grocery shopping',
  'Kitchen Market',
  'Medicine purchase',
  'Treatment',
  'Job',
  'Agriculture',
  'Goods Transport',
  'Business',
  'Others'
];

export const START_TIMES = [
  '1:00',
  '2:00',
  '3:00',
  '4:00',
  '5:00',
  '6:00',
  '7:00',
  '8:00',
  '9:00',
  '10:00',
  '11:00',
  '12:00'
];

export const MOVEMENT_TYPES = {
  round: 'Round Trip',
  oneway: 'One way'
};

export const DATE_FORMAT = (date, hasTime = false) => {
  const formatString = hasTime ? 'DD MMM, YYYY hh:mm a' : 'DD MMM, YYYY';
  return moment(date).format(formatString);
}

export const PASS_STATUSES = {
  null: 'Pending',
  true: 'Approved',
  false: 'Rejected'
};

export const MESSAGE_TYPES = {
  success: 'success',
  error: 'error'
};

export const MESSAGES = {
  loginError: 'Please enter valid mobile number and password.',
  verifySuccess: 'Your verification has been successfully completed.',
  passCreateSuccess: 'Your pass has been successfully created.',
  approveAlert: 'Do you want to approve this application?',
  rejectAlert: 'Do you want to reject this application?',
};
