FROM mcr.microsoft.com/dotnet/core/aspnet:3.0-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.0-buster AS build
WORKDIR /src
COPY ["BudgetSnap.IdentityServer/BudgetSnap.IdentityServer.csproj", "BudgetSnap.IdentityServer/"]
RUN dotnet restore "BudgetSnap.IdentityServer/BudgetSnap.IdentityServer.csproj"
COPY . .
WORKDIR "/src/BudgetSnap.IdentityServer"
RUN dotnet build "BudgetSnap.IdentityServer.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "BudgetSnap.IdentityServer.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "BudgetSnap.IdentityServer.dll"]