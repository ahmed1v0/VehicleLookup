# Vehicle Lookup Application

A full-stack vehicle lookup app built with **.NET Core Web API** and **Angular**.
It lets users:

- Select a car make.
- Select a manufacture year.
- View available vehicle types for the selected make.
- View available models for the selected make and year.

The app consumes NHTSA VPIC APIs:

- Get all makes: `https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json`
- Get vehicle types by make ID: `https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMakeId/{makeId}?format=json`
- Get models by make ID and year:
  `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/{makeId}/modelyear/{year}?format=json`

---

## Tech Stack

- Backend: ASP.NET Core (`net10.0`)
- Frontend: Angular 19 (standalone component)
- Containerization: Docker + Docker Compose

---

## Local Development (without Docker)

### 1) Run backend

```bash
cd backend/VehicleLookup.Api
dotnet restore
dotnet run
```

Backend runs on: `http://localhost:5000` (dev profile) or configured port.

### 2) Run frontend

```bash
cd frontend/car-app
npm install
npm start
```

Frontend runs on: `http://localhost:4200`

> If backend runs on a different local port, update `apiBaseUrl` in
> `frontend/car-app/src/environments/environment.ts`.

---

## Run with Docker Compose

From repository root:

```bash
docker compose up --build
```

Services:

- Frontend: `http://localhost:4200`
- Backend API: `http://localhost:8080`
- Swagger: `http://localhost:8080`

To stop:

```bash
docker compose down
```

---

## AWS Free Tier Hosting (EC2)

A practical free-tier path is to host both containers on a single EC2 `t2.micro`/`t3.micro` Linux instance.

### 1) Create infrastructure

1. Create an EC2 instance (Amazon Linux 2023 or Ubuntu).
2. Security group inbound rules:
   - `22` (SSH) from your IP
   - `80` (HTTP) from anywhere
   - `8080` (optional API direct access)
3. Associate an Elastic IP (optional but recommended).

### 2) Install Docker

On EC2:

```bash
sudo yum update -y
sudo yum install -y docker
sudo service docker start
sudo usermod -aG docker ec2-user
```

Reconnect SSH session, then install compose plugin if needed.

### 3) Deploy app

```bash
git clone (https://github.com/ahmed1v0/VehicleLookup.git)
cd VehicleLookup
docker compose up -d --build
```

### 4) Access app

- `http://<ec2-public-ip>:4200` (or map frontend to port 80 in compose for cleaner URL)

### 5) Optional production hardening

- Put Nginx on host to reverse proxy `80 -> frontend` and `/api -> backend`.
- Enable HTTPS using Let’s Encrypt + Certbot.
- Add CloudWatch agent for monitoring.

---

## API Endpoints in This App

- `GET /api/vehicles/makes`
- `GET /api/vehicles/makes/{makeId}/types`
- `GET /api/vehicles/models?makeId={id}&year={year}`

