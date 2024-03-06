import { Controller, useFormContext } from 'react-hook-form';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { useState, useMemo, HTMLInputTypeAttribute } from 'react';
import { MaskUtils } from 'src/utils/MakeUtils';
import { IconButton, InputAdornment } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

type FormInputProps = {
  name: string;
  label: string;
  mask?: {
    format: string;
  };
  regex?: RegExp;
} & TextFieldProps;

export const FormInputText = ({ name, helperText, label, mask, regex, ...other }: FormInputProps) => {
  const { control } = useFormContext();

  const [showPassword, setShowPassword] = useState(false);

  const isPasswordType = useMemo(() => other.type === 'password', [other.type]);

  const textFieldType: HTMLInputTypeAttribute | undefined = useMemo(() => {
    if (!isPasswordType) {
      return other.type;
    }

    return showPassword ? 'text' : 'password';
  }, [isPasswordType, other.type, showPassword]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        let valueRepresenter = field.value;

        if (mask) {
          valueRepresenter = MaskUtils.format(valueRepresenter, mask.format);
        }
        ('');

        function onChange(e: any) {
          e.target.value = e.target.value?.trimStart();

          if (regex) {
            e.target.value = e.target.value.replace(regex, '');
          }

          if (mask) {
            e.target.value = MaskUtils.format(e.target.value, mask.format);
          }

          field.onChange(e);
        }

        function onBlur() {
          field.onChange(field.value ? String(field.value)?.trim() : '');
        }

        return (
          <TextField
            error={Boolean(error)}
            helperText={error?.message || helperText}
            fullWidth
            label={label}
            {...field}
            InputProps={{
              endAdornment: isPasswordType && (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            {...other}
            value={valueRepresenter || ''}
            type={textFieldType}
            onChange={onChange}
            onBlur={onBlur}
          />
        );
      }}
    />
  );
};
