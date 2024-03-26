const PageTitle = ({ title, description, children }) => {
    return (
        <header>
            <div className="mx-auto max-w-screen-xl">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <div className="text-center sm:text-left">
                        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                            {title}
                        </h1>
                        {description && (
                            <p className="mt-1.5 text-sm text-gray-500">
                                {description}
                            </p>
                        )}
                    </div>

                    {children && (
                        <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
                            {children}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default PageTitle;
