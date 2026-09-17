---
title: '.NET Notes'
date: 2026-03-25
tech: '.NET'
tags: ['.NET', 'notes', 'learning', 'reference', 'practice', 'guide']
excerpt: 'Notes for .NET.'
toc: true
---

## Getting Started with .NET on Ubuntu

### Install the .NET SDK

Ubuntu ships .NET directly in its own package feeds — no Microsoft repository setup needed.

**Ubuntu 24.04 / 25.04 / 25.10 / 26.04**

```bash
# .NET 10 (LTS) - available in the built-in Ubuntu feed
sudo apt-get update && sudo apt-get install -y dotnet-sdk-10.0

# .NET 9 - on 24.04 and 22.04 you need the backports PPA first
sudo add-apt-repository ppa:dotnet/backports
sudo apt-get update && sudo apt-get install -y dotnet-sdk-9.0

# .NET 8 - available in the built-in Ubuntu feed
sudo apt-get update && sudo apt-get install -y dotnet-sdk-8.0
```

**Ubuntu 22.04**

```bash
# .NET 8 is in the built-in feed
sudo apt-get update && sudo apt-get install -y dotnet-sdk-8.0

# .NET 9 / 10 require the backports PPA
sudo add-apt-repository ppa:dotnet/backports
sudo apt-get update && sudo apt-get install -y dotnet-sdk-9.0
```

Verify the install:

```bash
dotnet --version

dotnet --list-sdks
dotnet --list-runtimes
```

**Package naming convention:** `{product}-{type}-{version}`

```bash
dotnet-sdk-10.0        # .NET 10 SDK
aspnetcore-runtime-9.0 # ASP.NET Core 9 runtime (includes .NET runtime)
dotnet-runtime-9.0     # .NET 9 runtime only (no ASP.NET Core)
```

---

### Create Your First Project

```bash
# Console app
dotnet new console -n HelloWorld
cd HelloWorld

# Run it
dotnet run
# Hello, World!
```

Common project templates:

| Command | Description |
|---|---|
| `dotnet new console` | Console application |
| `dotnet new web` | Minimal ASP.NET Core web app |
| `dotnet new webapi` | REST API with controllers |
| `dotnet new mvc` | ASP.NET Core MVC |
| `dotnet new classlib` | Class library |
| `dotnet new xunit` | xUnit test project |

---

### Project Structure

```
HelloWorld/
├── HelloWorld.csproj   # Project file (dependencies, SDK, target)
├── Program.cs          # Entry point
└── obj/                # Build intermediates (git-ignore this)
```

A minimal `Program.cs` using top-level statements (default since .NET 6):

```csharp
Console.WriteLine("Hello, World!");
```

The `.csproj` file:

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net9.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>
</Project>
```

---

### Essential CLI Commands

```bash
dotnet new <template>        # Scaffold a project
dotnet build                 # Compile the project
dotnet run                   # Build + run
dotnet test                  # Run tests
dotnet publish               # Produce deployable output
dotnet add package <name>    # Add a NuGet package
dotnet restore               # Restore NuGet dependencies
dotnet clean                 # Delete build artifacts
```

---

### Adding NuGet Packages

```bash
# Add a package
dotnet add package Newtonsoft.Json

# List installed packages
dotnet list package

# Remove a package
dotnet remove package Newtonsoft.Json
```

Packages are restored from [nuget.org](https://www.nuget.org) and recorded in the `.csproj`:

```xml
<ItemGroup>
  <PackageReference Include="Newtonsoft.Json" Version="13.0.3" />
</ItemGroup>
```

---

### Build a Minimal Web API

```bash
dotnet new webapi -n MyApi --use-minimal-apis
cd MyApi
dotnet run
```

The default `Program.cs` in a minimal API:

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello from .NET!");

app.MapGet("/greet/{name}", (string name) => $"Hello, {name}!");

app.Run();
```

Visit `http://localhost:5000` or check the port printed in the terminal.

---

### Solutions and Multiple Projects

A solution (`.sln`) groups related projects.

```bash
# Create a solution
dotnet new sln -n MyApp

# Create projects
dotnet new webapi -n MyApp.Api
dotnet new classlib -n MyApp.Core
dotnet new xunit -n MyApp.Tests

# Add them to the solution
dotnet sln add MyApp.Api/MyApp.Api.csproj
dotnet sln add MyApp.Core/MyApp.Core.csproj
dotnet sln add MyApp.Tests/MyApp.Tests.csproj

# Reference one project from another
dotnet add MyApp.Api/MyApp.Api.csproj reference MyApp.Core/MyApp.Core.csproj
```

---

### Publish and Run

Build a self-contained binary:

```bash
# Framework-dependent (requires .NET runtime on the host)
dotnet publish -c Release -o ./out

# Self-contained single file for Linux x64
dotnet publish -c Release -r linux-x64 --self-contained true -p:PublishSingleFile=true -o ./out

./out/MyApp
```

---

### Useful Environment Variables

```bash
# Change the URLs the app listens on
export ASPNETCORE_URLS="http://0.0.0.0:8080"

# Set environment (Development / Staging / Production)
export ASPNETCORE_ENVIRONMENT=Development

# Point to a custom NuGet cache
export NUGET_PACKAGES=~/.nuget/packages
```

---

### Install Multiple SDK Versions

```bash
# Install a specific SDK version alongside the current one
sudo apt install dotnet-sdk-8.0

# List all installed SDKs
dotnet --list-sdks

# Pin a project to a specific version with a global.json
dotnet new globaljson --sdk-version 8.0.x
```

`global.json` controls which SDK version `dotnet` uses in that directory:

```json
{
  "sdk": {
    "version": "8.0.0",
    "rollForward": "latestMinor"
  }
}
```

---

### Tips

- Enable nullable reference types (`<Nullable>enable</Nullable>`) in every new project - catches null bugs at compile time.
- `ImplicitUsings` auto-imports common namespaces (`System`, `System.Linq`, etc.) so you don't have to.
- Hot reload works in development: `dotnet watch run` restarts the app on file save.
- `dotnet format` enforces code style (runs on CI too).
- Secrets in development: `dotnet user-secrets init` keeps credentials out of `appsettings.json`.