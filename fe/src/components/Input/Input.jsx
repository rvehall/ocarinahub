import "./Input.css"

export const Input = ({onChange, name, label, type, value, required}) => {
  return (
    <div class="input">
        <label for={name}>{label} </label>
        <br/>
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={label}
            />
    </div>
  );
}