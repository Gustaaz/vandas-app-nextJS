import { formatReal } from "app/util/money";
import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  onChange?: (value: any) => void;
  label: string;
  classColumn: string;
  currency?: boolean;
  error?: string;
}
export const Input: React.FC<InputProps> = ({
  onChange,
  label,
  classColumn,
  id,
  currency,
  error,
  ...inputProps
}: InputProps) => {
  const onInpurChange = (event: { target: HTMLInputElement }) => {
    let value = event.target.value;

    if (value && currency) {
      value = formatReal(value);
    }

    if (onChange) {
      onChange(value);
    }
  };
  return (
    <div className={`field column ${classColumn}`}>
      <label htmlFor={id} className="label">
        {label}
      </label>
      <div className="control">
        <input
          {...inputProps}
          id={id}
          className="input"
          onChange={onInpurChange}
        />
        {error && <p className="help is-danger">{error}</p>}
      </div>
    </div>
  );
};
