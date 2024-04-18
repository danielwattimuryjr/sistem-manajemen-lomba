import { Card } from "flowbite-react";
import PageTitle from "./PageHeader";

const UserProfileCard = ({ data, title, footer, ...props }) => {
    return (
        <div className="space-y-5" id="profile-section">
            <Card>
                {title && <PageTitle title={title} />}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
                    {/* NIK */}
                    <div>
                        <div className="mb-2 block">
                            <p className="font-bold">NIK : </p>
                        </div>
                        <p>{data.nik || "-"}</p>
                    </div>

                    {/* Nama Lengkap */}
                    <div>
                        <div className="mb-2 block">
                            <p className="font-bold">Nama Lengkap : </p>
                        </div>
                        <p>{data.full_name || "-"}</p>
                    </div>

                    {/* Jenis kelamin */}
                    <div>
                        <div className="mb-2 block">
                            <p className="font-bold">Jenis Kelamin : </p>
                        </div>
                        <p>{data.gender || "-"}</p>
                    </div>

                    {/* Tanggal Lahir */}
                    <div>
                        <div className="mb-2 block">
                            <p className="font-bold">Tanggal Lahir : </p>
                        </div>
                        <p>{data.d_o_b || "-"}</p>
                    </div>

                    {/* Nomor Telepon */}
                    <div>
                        <div className="mb-2 block">
                            <p className="font-bold">Nomor Telepon : </p>
                        </div>
                        <p>{data.phone_number || "-"}</p>
                    </div>

                    {/* Alamat */}
                    <div>
                        <div className="mb-2 block">
                            <p className="font-bold">Alamat : </p>
                        </div>
                        <p>{data.address || "-"}</p>
                    </div>
                </div>

                {footer && <div className="mt-4">{footer}</div>}
            </Card>
        </div>
    );
};

export default UserProfileCard;
