// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import {
  Box,
  Chip,
  Select,
  Checkbox,
  MenuItem,
  InputLabel,
  SelectProps,
  FormControl,
  OutlinedInput,
  FormHelperText,
  SelectChangeEvent,
} from '@mui/material';

// ----------------------------------------------------------------------

export type FormSelectOptions = {
  label: string | number;
  value: string | number;
}[];

export type FormSelectProps = {
  name: string;
  options: FormSelectOptions;
  defaultEmptyValue?: string | number;
} & SelectProps;

export function FormSelect({ name, native = true, options, label, defaultEmptyValue = '', ...other }: FormSelectProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const onChange = (e: SelectChangeEvent<any>) => {
          if (!other.multiple) {
            field.onChange(e);
            return;
          }
          if (e.target.value.every((valueItem: string) => valueItem !== defaultEmptyValue)) {
            field.onChange(e);
            return;
          }

          field.onChange([]);
        };
        return (
          <FormControl fullWidth error={Boolean(error)}>
            <InputLabel id={`demo-simple-select-standard-label-${name}`}>{label}</InputLabel>
            <Select
              // label="Age"
              labelId={`demo-simple-select-standard-label-${name}`}
              label={label}
              {...field}
              {...other}
              value={field.value || ''}
              onChange={onChange}
              error={Boolean(error)}
            >
              <MenuItem value={defaultEmptyValue}>
                <em>Selecione...</em>
              </MenuItem>
              {/* eslint-disable-next-line @typescript-eslint/no-shadow */}
              {options.map((options, index) => (
                <MenuItem value={options.value} key={index}>
                  {options.label}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{error?.message}</FormHelperText>
          </FormControl>
        );
      }}
    />
  );
}

// ----------------------------------------------------------------------

type FormMultiSelectProps = SelectProps & {
  name: string;
  label?: string;
  chip?: boolean;
  checkbox?: boolean;
  placeholder?: string;
  helperText?: React.ReactNode;
  options: {
    label: string;
    value: string | number;
  }[];
};

export function FormMultiSelect({
  name,
  chip,
  label,
  options,
  checkbox,
  placeholder,
  helperText,
  sx,
  ...other
}: FormMultiSelectProps) {
  const { control } = useFormContext();

  const renderValues = (selectedIds: string[]) => {
    const selectedItems = options.filter((item) => selectedIds.includes(item.value));

    if (!selectedItems.length && placeholder) {
      return (
        <Box component="em" sx={{ color: 'text.disabled' }}>
          {placeholder}
        </Box>
      );
    }

    if (chip) {
      return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {selectedItems.map((item) => (
            <Chip key={item.value} size="small" label={item.label} />
          ))}
        </Box>
      );
    }

    return selectedItems.map((item) => item.label).join(', ');
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl sx={sx}>
          {label && <InputLabel id={name}> {label} </InputLabel>}

          <Select
            {...field}
            multiple
            displayEmpty={!!placeholder}
            labelId={name}
            input={<OutlinedInput fullWidth label={label} error={!!error} />}
            renderValue={renderValues}
            MenuProps={{
              PaperProps: {
                sx: { px: 1, maxHeight: 280 },
              },
            }}
            {...other}
          >
            {placeholder && (
              <MenuItem
                disabled
                value=""
                sx={{
                  py: 1,
                  px: 2,
                  borderRadius: 0.75,
                  typography: 'body2',
                }}
              >
                <em> {placeholder} </em>
              </MenuItem>
            )}

            {options.map((option) => {
              const selected = field.value.includes(option.value);

              return (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  sx={{
                    py: 1,
                    px: 2,
                    borderRadius: 0.75,
                    typography: 'body2',
                    ...(selected && {
                      fontWeight: 'fontWeightMedium',
                    }),
                    ...(checkbox && {
                      p: 0.25,
                    }),
                  }}
                >
                  {checkbox && <Checkbox disableRipple size="small" checked={selected} />}

                  {option.label}
                </MenuItem>
              );
            })}
          </Select>

          {(!!error || helperText) && (
            <FormHelperText error={!!error}>{error ? error?.message : helperText}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}
