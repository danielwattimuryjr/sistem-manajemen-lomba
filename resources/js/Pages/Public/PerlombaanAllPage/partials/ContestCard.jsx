const ContestCard = ({ contest }) => {
    return (
        <li>
            <a
                href={route("public.perlombaan.detail", contest.slug)}
                className="group relative block overflow-hidden rounded-lg border border-gray-100 bg-white p-4 shadow-lg sm:p-6 lg:p-8"
            >
                <span className="absolute inset-x-0 bottom-0 h-2 translate-y-full bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 transition-transform duration-300 ease-in-out group-hover:translate-y-0"></span>

                <div className="sm:flex sm:justify-between sm:gap-4">
                    <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                        {contest.title}
                    </h3>
                </div>

                <div className="mt-4">
                    <p className="text-pretty text-sm text-gray-500">
                        Click untuk lihat detail
                    </p>
                </div>

                <dl className="mt-6 flex gap-4 sm:gap-6">
                    <div className="flex flex-col-reverse">
                        <dt className="text-sm font-medium text-gray-600">
                            {contest.start_date}
                        </dt>
                        <dd className="text-xs text-gray-500">Tgl. Mulai</dd>
                    </div>

                    <div className="flex flex-col-reverse">
                        <dt className="text-sm font-medium text-gray-600">
                            {contest.end_date}
                        </dt>
                        <dd className="text-xs text-gray-500">Tgl. Selesai</dd>
                    </div>

                    <div className="flex flex-col-reverse">
                        <dt className="text-sm font-medium text-gray-600">
                            {contest.quota}
                        </dt>
                        <dd className="text-xs text-gray-500">Quota</dd>
                    </div>
                </dl>
            </a>
        </li>
    );
};

export default ContestCard;
