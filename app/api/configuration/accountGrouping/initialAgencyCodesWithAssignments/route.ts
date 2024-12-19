import { initialAgencyCodes } from '@/app/api/configuration/accountGrouping/initialAgencyCode/route';

export const initialAgencyCodesWithAssignments = {
  'Group 1': {
    '1234567': 'SubGroup Q',
    '2345678': 'SubGroup Q',
    '3456789': 'Not Allocated',
    '4567890': 'SubGroup W',
    '5678901': 'Not Allocated',
    '6789012': 'Not Allocated',
    '7890123': 'Not Allocated',
    '8901234': 'Not Allocated',
    '9012345': 'Not Allocated',
    '0123456': 'Not Allocated',
    '1123456': 'Not Allocated',
    '2123456': 'Not Allocated',
  },
  'Group 2': {
    '1234567': 'Not Allocated',
    '2345678': 'Not Allocated',
    '3456789': 'Not Allocated',
    '4567890': 'Not Allocated',
    '5678901': 'Not Allocated',
    '6789012': 'Not Allocated',
    '7890123': 'Not Allocated',
    '8901234': 'Not Allocated',
    '9012345': 'Not Allocated',
    '0123456': 'Not Allocated',
    '1123456': 'Not Allocated',
    '2123456': 'Not Allocated',
  },
  'Group 3': { ...initialAgencyCodes },
};