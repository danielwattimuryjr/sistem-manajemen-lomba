<table>
    <thead>
        <tr>
            <th>No.</th>
            <th>NIK</th>
            <th>Nama</th>
            <th>Email</th>
            <th>No. Telp</th>
            <th>Alamat</th>
            <th>Tgl. Daftar</th>
        </tr>
    </thead>
    <tbody>
        @foreach ($participants as $p)
            <tr>
                <td>{{ $loop->iteration }}</td>
                <td>{{ $p['nik'] }}</td>
                <td>{{ $p['full_name'] }}</td>
                <td>{{ $p['email'] }}</td>
                <td>{{ $p['phone_number'] }}</td>
                <td>{{ $p['address'] }}</td>
                <td>{{ $p['created_at'] }}</td>
            </tr>
        @endforeach
    </tbody>
</table>
