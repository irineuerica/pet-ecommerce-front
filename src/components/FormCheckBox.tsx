// form
import { useFormContext, Controller, ControllerRenderProps, FieldValues } from 'react-hook-form';
// @mui
import {
  Checkbox,
  FormLabel,
  FormGroup,
  FormControl,
  FormHelperText,
  FormControlLabel,
  FormControlLabelProps,
} from '@mui/material';

// ----------------------------------------------------------------------

interface FormCheckboxProps extends Omit<FormControlLabelProps, 'control'> {
  name: string;
  helperText?: React.ReactNode;
  // eslint-disable-next-line no-unused-vars
  afterChange?: (value: any, field: ControllerRenderProps<FieldValues, string>) => void;
}

export function FormCheckbox({ name, helperText, afterChange, ...other }: FormCheckboxProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <FormControlLabel
            control={
              <Checkbox
                {...field}
                onChange={(event, checked) => {
                  field.onChange(event.target.checked);
                  if (afterChange) {
                    afterChange(!field.value, field);
                  }
                }}
                checked={field.value == null ? false : field.value}
              />
            }
            {...other}
          />

          {(!!error || helperText) && (
            <FormHelperText error={!!error}>{error ? error?.message : helperText}</FormHelperText>
          )}
        </div>
      )}
    />
  );
}
