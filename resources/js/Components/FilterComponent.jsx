import { Button, TextInput } from "flowbite-react";
import { SearchX } from "lucide-react";

const FilterComponent = ({ filterText, onFilter, onClear }) => {
    return (
        <div className="flex flex-row gap-x-2">
            <TextInput
                id="search"
                type="text"
                placeholder="Cari berdasarkan nama"
                aria-label="Search Input"
                value={filterText}
                onChange={onFilter}
            />
            <Button color="gray" onClick={onClear}>
                <SearchX className="h-5 w-5" />
            </Button>
        </div>
    );
};

export default FilterComponent;
