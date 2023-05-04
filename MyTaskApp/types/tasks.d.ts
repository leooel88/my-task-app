export interface Task {
  id: string;
  name: string;
  firstOccurrence: Date;
  frequency: {
    value: number;
    unit: FrequencyUnit;
  };
}

export interface FrequencyUnit {
  'hour'
  'day'
  'month'
}
