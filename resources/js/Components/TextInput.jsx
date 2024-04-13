import { Label, TextInput } from "flowbite-react";

const InputText = ({
    label,
    value,
    placeholder,
    onChange,
    color,
    helperText,
    ...props
}) => {
    return (
        <div>
            <div className="mb-2 block">
                <Label color={color} value={label} />
            </div>
            <TextInput
                className="w-full"
                type={props.type || "text"}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                color={color}
                helperText={helperText}
                {...props} // Spread additional props to TextInput
            />
        </div>
    );
};

export default InputText;
