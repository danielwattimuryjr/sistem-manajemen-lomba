import { Label, Textarea } from "flowbite-react";

const TextareaInput = (props) => {
    return (
        <div>
            <div className="mb-2 block">
                <Label color={props.color} value={props.label} />
            </div>
            <Textarea
                className="w-full"
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
                color={props.color}
                helperText={props.helperText}
            />
        </div>
    );
};

export default TextareaInput;
