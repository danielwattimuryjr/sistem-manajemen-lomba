import { Label, Datepicker } from "flowbite-react";

const DateInput = ({
    label,
    value,
    placeholder,
    onSelectedDateChanged,
    color,
    helperText,
    ...props
}) => {
    return (
        <div>
            <div className="mb-2 block">
                <Label color={color} value={label} />
            </div>
            <Datepicker
                color={color}
                value={value}
                onSelectedDateChanged={onSelectedDateChanged}
                helperText={helperText}
                {...props}
            />
        </div>
    );
};

export default DateInput;
