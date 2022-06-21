import { createSlotSplitString } from '@tri/slot';
import React from 'react';

export const Slot = ({ name }: { name: string }) => {
  return <>{createSlotSplitString(name)}</>;
};
