import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import 'moment/locale/pt-br';
import { Controller, useFormContext } from 'react-hook-form';
import { DatePicker as MUIDatePicker, DatePickerProps, LocalizationProvider } from '@mui/x-date-pickers';
import { TextField, TextFieldProps } from '@mui/material';

export interface IDatePickerProps extends Omit<DatePickerProps<Date, Date>, 'renderInput' | 'onChange' | 'value'> {
  name: string;
  label: string;
  // eslint-disable-next-line no-unused-vars
  renderInput?: (params: TextFieldProps) => React.ReactElement;
  typeMonthYear?: boolean;
}

export function FormInputDate({ name, label, ...rest }: IDatePickerProps) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={'pt-br'}>
          <MUIDatePicker
            renderInput={(params: any) => (
              <TextField
                fullWidth
                {...params}
                error={Boolean(error)}
                helperText={error?.message}
                value={value || null}
                label={label}
              />
            )}
            {...rest}
            value={value || null}
            onChange={(date: any) => {
              onChange(date);
            }}
          />
        </LocalizationProvider>
      )}
    />
  );
}
