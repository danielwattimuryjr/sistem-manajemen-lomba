import { Card } from "flowbite-react";

const ProfileCard = ({ data }) => {
    return (
        <div className="space-y-5" id="profile-section">
            <Card>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
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

                    <div>
                        <div className="mb-2 block">
                            <p className="font-bold">Tanggal Lahir : </p>
                        </div>
                        <p>{data.d_o_b || "-"}</p>
                    </div>

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
            </Card>
        </div>
    );
};

export default ProfileCard;
