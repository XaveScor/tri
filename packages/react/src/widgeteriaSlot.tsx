import { createWidgeteriaSlotSplitString } from '@widgeteria/slot';
import React from 'react';

export const WidgeteriaSlot = ({ name }: { name: string }) => {
  return <>{createWidgeteriaSlotSplitString(name)}</>;
};
