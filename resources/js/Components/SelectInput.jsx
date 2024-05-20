import { Label, Select } from "flowbite-react";

const SelectInput = ({
    label,
    color,
    children,
    onChange,
    helperText,
    ...props
}) => {
    return (
        <div>
            <div className="mb-2 block">
                <Label color={color} value={label} />
            </div>
            <Select
                onChange={onChange}
                helperText={helperText}
                defaultValue={props.defaultValue}
            >
                <option selected disabled>
                    -- PILIH --
                </option>
                {children}
            </Select>
        </div>
    );
};

export default SelectInput;
