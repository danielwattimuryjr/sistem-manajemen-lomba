import { Label, Textarea } from "flowbite-react";

const TextareaInput = ({
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
            <Textarea
                className="w-full"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                color={color}
                helperText={helperText}
                {...props}
            />
        </div>
    );
};

export default TextareaInput;
