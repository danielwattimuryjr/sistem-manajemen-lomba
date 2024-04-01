import { TextInput } from "flowbite-react";
import { Search } from "lucide-react";

const Searchbar = (props) => {
    return (
        <div className="mx-auto my-10 max-w-md">
            <TextInput
                className="w-full"
                id="search"
                type="text"
                icon={Search}
                defaultValue={props.value}
                onBlur={props.onChange}
                onKeyDown={props.onKeyPress}
                placeholder="Search by name"
            />
        </div>
    );
};

export default Searchbar;
