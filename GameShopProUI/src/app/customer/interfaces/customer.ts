import { CheckIn } from '../interfaces/check-in';

export interface ICustomer {
    CustomerId: string,
    DisplayName: string,
    Email: string,
    CheckIns: Array<CheckIn>
};
