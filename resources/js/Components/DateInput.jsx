import { Label, Datepicker } from "flowbite-react";

const DateInput = (props) => {
    return (
        <div>
            <div className="mb-2 block">
                <Label color={props.color} value={props.label} />
            </div>
            <Datepicker
                color={props.color}
                value={props.value}
                onSelectedDateChanged={props.onSelectedDateChanged}
                helperText={props.helperText}
            />
        </div>
    );
};

export default DateInput;
