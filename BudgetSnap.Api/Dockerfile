FROM mcr.microsoft.com/dotnet/core/aspnet:3.0-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.0-buster AS build
WORKDIR /src
COPY ["BudgetSnap.Api/BudgetSnap.Api.csproj", "BudgetSnap.Api/"]
RUN dotnet restore "BudgetSnap.Api/BudgetSnap.Api.csproj"
COPY . .
WORKDIR "/src/BudgetSnap.Api"
RUN dotnet build "BudgetSnap.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "BudgetSnap.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "BudgetSnap.Api.dll"]