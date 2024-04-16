import { Card } from "flowbite-react";

const Schedule = ({ start_date, end_date }) => {
    return (
        <Card>
            <h5 className="mb-4 text-center text-xl font-bold leading-none text-gray-900 dark:text-white">
                Jadwal Perlombaan
            </h5>
            <div className="flex items-center justify-between">
                <div className="w-1/3 flex-1 border-r border-gray-300 text-center">
                    <div className="space-x-1 text-lg font-bold">
                        <span className=" hidden lg:inline">Tanggal</span>
                        <span className="">Mulai</span>
                    </div>
                    <p>{start_date || "-"}</p>
                </div>

                <div className="w-1/3 flex-1 text-center">
                    <div className="space-x-1 text-lg font-bold">
                        <span className=" hidden lg:inline">Tanggal</span>
                        <span className="">Selesai</span>
                    </div>
                    <p>{end_date || "-"}</p>
                </div>
            </div>
        </Card>
    );
};

export default Schedule;
