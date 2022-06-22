import { createSlotSplitString } from '@drzewo/slot';
import React from 'react';

export const Slot = ({ name }: { name: string }) => {
  return <>{createSlotSplitString(name)}</>;
};
