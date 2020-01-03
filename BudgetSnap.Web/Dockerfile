FROM mcr.microsoft.com/dotnet/core/aspnet:3.0-buster-slim AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/core/sdk:3.0-buster AS build
WORKDIR /src
COPY ["BudgetSnap.Web/BudgetSnap.Web.csproj", "BudgetSnap.Web/"]
RUN dotnet restore "BudgetSnap.Web/BudgetSnap.Web.csproj"

# Setup NodeJs
RUN apt-get update && \
    apt-get install -y wget && \
    apt-get install -y gnupg2 && \
    wget -qO- https://deb.nodesource.com/setup_10.x | bash - && \
    apt-get install -y build-essential nodejs

COPY . .
WORKDIR "/src/BudgetSnap.Web"
RUN dotnet build "BudgetSnap.Web.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "BudgetSnap.Web.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "BudgetSnap.Web.dll"]