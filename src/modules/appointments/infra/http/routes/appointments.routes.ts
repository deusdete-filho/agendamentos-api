import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentController from '../controllers/AppointmentController';
import listProviderDayAppointmentsControoler from '../controllers/ListProviderDayAppointmentsController';
import ListClientAppointmnets from '../controllers/ListClientAppointmnets';

const appointmentsRouter = Router();

/**
 * Private Routes
 */
appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', AppointmentController.index);

appointmentsRouter.get(
  '/me',
  celebrate({
    [Segments.QUERY]: {
      day: Joi.number().required(),
      month: Joi.number().required(),
      year: Joi.number().required(),
    },
  }),
  listProviderDayAppointmentsControoler.index,
);

appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      user_id: Joi.string(),
      provider_id: Joi.string().uuid().required(),
      date: Joi.string().isoDate().required(),
    },
  }),
  AppointmentController.create,
);

appointmentsRouter.get('/client', ListClientAppointmnets.index);

export default appointmentsRouter;
