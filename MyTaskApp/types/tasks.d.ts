export interface Task {
  id: string;
  name: string;
  firstOccurrence: Date;
  frequency: {
    value: number;
    unit: FrequencyUnit;
  };
}

export type FrequencyUnit = 'hour' | 'day' | 'month';
