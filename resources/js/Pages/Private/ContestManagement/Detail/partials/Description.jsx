import { Button, Card, Tooltip } from "flowbite-react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const Description = ({ description }) => {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen(!open);
    };

    return (
        <Card>
            <div className="flex items-center justify-between">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white ">
                    Deskripsi Perlombaan
                </h5>

                <Tooltip content={open ? "Tutup deskripsi" : "Lihat deskripsi"}>
                    <Button color="light" onClick={toggleOpen}>
                        {open ? (
                            <ChevronUp className="h-5 w-5" />
                        ) : (
                            <ChevronDown className="h-5 w-5" />
                        )}
                    </Button>
                </Tooltip>
            </div>

            {open && (
                <div
                    className="ProseMirror"
                    dangerouslySetInnerHTML={{
                        __html: description,
                    }}
                />
            )}
        </Card>
    );
};

export default Description;
