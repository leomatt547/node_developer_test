# Node_developer_test

NodeJS Developer test for PT DaNS Multipro Entrance

## Installation Guide

1. run `npm install`
2. Setting .env for Route and Database URI (currently using MongoDB)
3. Install Nodemon by `npm install -g nodemon`
4. run `nodemon app`
5. run in browser `localhost:PORT`

## Fitur

### Register/Login

- Atribut: Masukkan username dan password
- Terdapat JWT Token untuk mengecek timeout cookie

### Get Job List

- Atribut: Masukkan description, full_time, location, atau page (dapat berupa kombinasi keempatnya)
- Terdapat JWT Token untuk mengecek timeout cookie

### Get Job Detail by ID

- Atribut: Masukkan ID yang sesuai job
- Terdapat JWT Token untuk mengecek timeout cookie

## Arsitektur API

| Folder/File  |                Kegunaan                |
| :----------: | :------------------------------------: |
|    Config    |     Menyetel Konfigurasi Database      |
|  Middleware  |     Sebagai garda autentikasi JWT      |
|    Models    |     Mengatur Skema Basis Data User     |
|    Routes    | Routes untuk Login, Logout, dan Signup |
|    Views     |  Menampilkan Homepage dan Dokumentasi  |
|    App.js    |   Sumber Logika Utama dalam Program    |
|   Index.js   |      Interface untuk connect host      |
| Package.json |     mengatur dependencies library      |

## Dibuat Oleh

Leonard Matheus - Institut Teknologi Bandung
