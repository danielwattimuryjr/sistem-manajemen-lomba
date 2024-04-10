const AuthLayout = ({ children, title }) => {
    return (
        <div className="mx-auto flex min-h-screen flex-col items-center justify-center px-6 py-8  lg:py-0">
            <h1 className="mb-6 text-2xl font-semibold text-gray-900">
                {title}
            </h1>

            {children}
        </div>
    );
};

export default AuthLayout;
