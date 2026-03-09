# Build stage
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# 1. Copy ALL csproj files first (this is where most people fail)
COPY ["VehicleLookup.Api/VehicleLookup.Api.csproj", "VehicleLookup.Api/"]
COPY ["VehicleLookup.Application/VehicleLookup.Application.csproj", "VehicleLookup.Application/"]
COPY ["VehicleLookup.Domain/VehicleLookup.Domain.csproj", "VehicleLookup.Domain/"]
COPY ["VehicleLookup.Infrastructure/VehicleLookup.Infrastructure.csproj", "VehicleLookup.Infrastructure/"]
RUN dotnet restore "VehicleLookup.Api/VehicleLookup.Api.csproj"

# Copy the rest and publish
COPY . .
RUN dotnet publish "VehicleLookup.Api/VehicleLookup.Api.csproj" -c Release -o /app/publish --no-restore

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish ./

EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080
ENTRYPOINT ["dotnet", "VehicleLookup.Api.dll"]
