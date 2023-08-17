import InputTypes from "./InputTypes";

interface Props {
  id: string;
  label: string;
  placeholder: string;
  validText: string;
  invalidText: string;
  onEnter: () => void;
  onChange: (e: HTMLInputElement) => void;
  type?: InputTypes;
  min?: number;
  max?: number;
}

const InputText = ({ 
  id,
  label, placeholder,
  validText, invalidText,
  onEnter, onChange,
  type = InputTypes.text,
  min = 0, max = 10
}: Props) => {
  return (
    <div className="input-group mb-3">
      <span className="input-group-text" id={id + "LabelText"}>
        {label}
      </span>
      <input id={id} type={type} className="form-control"
        placeholder={placeholder}
        // aria-label="" aria-describedby=""
        onKeyDown={(e) => {
          onChange(e.target as HTMLInputElement);
          if (e.key === 'Enter') onEnter();
        }}
        {...(type === InputTypes.number && { min, max })}
      />
      <div className="valid-feedback">
        {validText}
      </div>
      <div className="invalid-feedback">
        {invalidText}
      </div>
    </div>
  );
}

export default InputText;