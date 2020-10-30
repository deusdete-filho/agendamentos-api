import ICreateAppointment from '@modules/appointments/dtos/ICreateAppointment';
import Appointment from '../infra/typeorm/entities/Appointment';
import IFindAllInMothFromProvider from '../dtos/IFindAllInMothFromProvider';
import IFindAllInDayFromProvider from '../dtos/IFindAllInDayFromProvider';
import IFindaAllByDate from '../dtos/IFindaAllByDate';

export default interface IAppointmentRepository {
  create(data: ICreateAppointment): Promise<Appointment>;
  findeByDateFromProvider(
    data: IFindeByDateFromProvider,
  ): Promise<Appointment | undefined>;
  findAllByDate(data: IFindaAllByDate): Promise<Appointment[]>;
  findAllInMothFromProvider(
    data: IFindAllInMothFromProvider,
  ): Promise<Appointment[]>;
  findAllInDayFromProvider(
    date: IFindAllInDayFromProvider,
  ): Promise<Appointment[]>;
  findAll(): Promise<Array<Appointment> | undefined>;
  findAllNextFromClient(
    client_id: string,
  ): Promise<Array<Appointment> | undefined>;
}
