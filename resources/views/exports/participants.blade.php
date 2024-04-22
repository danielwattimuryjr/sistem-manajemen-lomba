<table>
    <thead>
        <tr>
            <th style="font-weight: bold; text-align: center; border: 1px solid black; background-color: yellow;">No.
            </th>
            <th style="font-weight: bold; text-align: center; border: 1px solid black; background-color: yellow;">NIK
            </th>
            <th style="font-weight: bold; text-align: center; border: 1px solid black; background-color: yellow;">Nama
            </th>
            <th style="font-weight: bold; text-align: center; border: 1px solid black; background-color: yellow;">Email
            </th>
            <th style="font-weight: bold; text-align: center; border: 1px solid black; background-color: yellow;">No.
                Telp</th>
            <th style="font-weight: bold; text-align: center; border: 1px solid black; background-color: yellow;">Alamat
            </th>
            <th style="font-weight: bold; text-align: center; border: 1px solid black; background-color: yellow;">Tgl.
                Daftar</th>
            <th style="font-weight: bold; text-align: center; border: 1px solid black; background-color: yellow;">Tgl.
                Nilai</th>
        </tr>
    </thead>
    <tbody>
        @foreach ($participants as $p)
            <tr>
                <td style="text-align: center; border: 1px solid black;">{{ $loop->iteration }}</td>
                <td style="text-align: center; border: 1px solid black;">{{ $p['nik'] }}</td>
                <td style="text-align: center; border: 1px solid black;">{{ $p['full_name'] }}</td>
                <td style="text-align: center; border: 1px solid black;">{{ $p['email'] }}</td>
                <td style="text-align: center; border: 1px solid black;">{{ $p['phone_number'] }}</td>
                <td style="text-align: center; border: 1px solid black;">{{ $p['address'] }}</td>
                <td style="text-align: center; border: 1px solid black;">{{ $p['created_at'] }}</td>
                <td style="text-align: center; border: 1px solid black;">{{ $p['score'] }}</td>
            </tr>
        @endforeach
    </tbody>
</table>
