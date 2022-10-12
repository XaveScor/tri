import { ICreateWidgeteriaController } from '../types/internal';

export const viewArgs = Symbol('controller view args');
export const slotArgs = Symbol('controller slots args');

export const createWidgeteriaController: ICreateWidgeteriaController = (
  controller,
) => controller;
