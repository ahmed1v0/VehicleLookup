FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY ["NuGet.Config", "./"]

COPY ["VehicleLookup.Api/VehicleLookup.Api.csproj", "VehicleLookup.Api/"]
COPY ["VehicleLookup.Application/VehicleLookup.Application.csproj", "VehicleLookup.Application/"]
COPY ["VehicleLookup.Infrastructure/VehicleLookup.Infrastructure.csproj", "VehicleLookup.Infrastructure/"]

RUN dotnet restore "VehicleLookup.Api/VehicleLookup.Api.csproj" --configfile /src/NuGet.Config

COPY . .
WORKDIR /src/VehicleLookup.Api
RUN dotnet publish "VehicleLookup.Api.csproj" -c Release -o /app/publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080
ENTRYPOINT ["dotnet", "VehicleLookup.Api.dll"]