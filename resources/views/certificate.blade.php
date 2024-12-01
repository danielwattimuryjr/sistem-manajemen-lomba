<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sertifikat</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
    }

    .certificate {
      margin: auto;
      background: white;
      padding: 30mm 20mm;
      box-sizing: border-box;
      position: relative;
    }

    .certificate img {
      width: 100px;
      position: absolute;
      top: 20px;
      left: calc(50% - 60px);
    }

    .certificate h1 {
      text-align: center;
      font-size: 24px;
      margin: 50px 0 10px;
      letter-spacing: 2px;
    }

    .certificate h2 {
      text-align: center;
      font-size: 18px;
      margin: 10px 0 20px;
    }

    .certificate p {
      font-size: 14px;
      line-height: 1.5;
      margin: 10px 0;
    }

    .certificate p.description {
      text-align: justify;
      margin: 20px 0;
    }

    .certificate .center {
      text-align: center;
    }

    .certificate .bottom {
      margin-top: 50px;
      text-align: right;
    }

    .certificate .bottom span {
      display: block;
      margin-top: 40px;
    }

    .certificate .placeholder {
      font-weight: bold;

    }

    .text-center {
      text-align: center;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
    }

    table td {
      vertical-align: top;
    }

    table td:first-child {
      font-weight: bold;
      width: 30%;
    }

    table td:nth-child(2) {
      font-weight: bold;
      width: 5%;
      text-align: center;
    }

    table td:last-child {
      width: 65%;
    }
  </style>
</head>
<body>
<div class="certificate">
  <img src="{{ $garudaImage }}" alt="Garuda Image">
  <h1>SERTIFIKAT</h1>
  <div class="center">
    <p>Nomor: <span class="placeholder">-</span></p>
  </div>
  <p class="text-center">Diberikan kepada:</p>
  <table>
    <tr>
      <td>
        <p>Nama</p>
      </td>
      <td>
        <p>:</p>
      </td>
      <td>
        <p>{{ $data->resource->userName }}</p>
      </td>
    </tr>
    <tr>
      <td>
        <p>NIK</p>
      </td>
      <td>
        <p>:</p>
      </td>
      <td>
        <p>{{ $data->resource->userNik }}</p>
      </td>
    </tr>
    <tr>
      <td>
        <p>Kriteria</p>
      </td>
      <td>
        <p>:</p>
      </td>
      <td>
        <p>{{ $data->resource->levelName }}</p>
      </td>
    </tr>
  </table>
  <p class="description">
    Sebagai apresiasi atas partisipasinya dalam
    <span class="placeholder">{{ $data->resource->competitionName }}</span> yang diselenggarakan oleh
    <span class="placeholder">UPTD. Monumen Perjuangan Rakyat Bali</span> dari tanggal <span
      class="placeholder">{{ \Carbon\Carbon::parse($data->resource->competitionStartDate)->translatedFormat('l, d F Y') }}</span>
    s.d <span class="placeholder">{{ \Carbon\Carbon::parse($data->resource->competitionEndDate)->translatedFormat('l, d F Y') }}</span> bertempat di <span
      class="placeholder">...</span>.
  </p>
  <div class="bottom">
    <p>Denpasar, {{ \Carbon\Carbon::now()->isoFormat('D MMMM YYYY') }}</p>
    <p>Gubernur Bali,</p>
  </div>
</div>
</body>
</html>
