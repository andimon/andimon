---
layout: project
title: "Kaxxa"
date: 2026-06-02
author: "Andre' Vella"
tags: [elixir]
git_url: "https://github.com/sfera-lab/kaxxa"
excerpt: "A GenServer-backed ETS cache with periodic refresh — define your data source, key, and action; Kaxxa handles the rest."
---

# Kaxxa

[![Coverage Status](https://coveralls.io/repos/github/sfera-lab/kaxxa/badge.svg?branch=main)](https://coveralls.io/github/sfera-lab/kaxxa?branch=main)

An ETS-backed, periodically-refreshed cache. You define **where the data comes from** (`query/1`), **how to key it** (`key/1`), and **whether each entry should be inserted or deleted** (`action/1`); Kaxxa handles the GenServer lifecycle, the refresh timer, the ETS table, and a small telemetry surface.

The library is data-source agnostic — your `query/1` returns any `Enumerable` (a list, stream, executed Ecto query, HTTP response, file contents, etc.).

## Installation

Add `kaxxa` to your dependencies in `mix.exs`:

```elixir
def deps do
  [
    {:kaxxa, "~> 0.1.0"}
  ]
end
```

## Usage

### Minimal example

```elixir
defmodule MyApp.CountryCache do
  use Kaxxa

  @impl true
  def key(%{code: code}), do: code

  @impl true
  def action(%{deprecated: true}), do: :delete
  def action(_), do: :insert

  @impl true
  def query(_last_updated_at) do
    [
      %{code: "MT", name: "Malta", deprecated: false},
      %{code: "IT", name: "Italy", deprecated: false}
    ]
  end
end
```

Add it to your supervision tree with the refresh interval (in ms):

```elixir
children = [
  {MyApp.CountryCache, :timer.minutes(5)}
]
```

Then read from anywhere:

```elixir
MyApp.CountryCache.get("MT")
# => %{code: "MT", name: "Malta", deprecated: false}
```

### With an Ecto schema

If you pass a `:schema` option, Kaxxa provides sensible defaults for `key/1` (uses `:id`) and `action/1` (insert when `enabled: true`, otherwise delete). You still implement `query/1` yourself:

```elixir
defmodule MyApp.UserCache do
  use Kaxxa, schema: MyApp.User

  import Ecto.Query

  @impl true
  def query(last_updated_at) do
    from(u in MyApp.User, where: u.updated_at > ^last_updated_at)
    |> MyApp.Repo.all()
  end
end
```

## Callbacks

| Callback | Required | Default (with `:schema`) | Purpose |
|---|---|---|---|
| `query(last_updated_at)` | yes | — | Return an `Enumerable` of entries to apply since the last refresh |
| `key(entry)` | yes (no schema) | `%{id: id} -> id` | Extract the ETS key for an entry |
| `action(entry)` | no | `%{enabled: true} -> :insert`, else `:delete` | Whether to insert or delete the entry |

## Public API

Every module that `use`s Kaxxa exposes:

- `get(key)` — fetch a value from ETS
- `put(key, value)` — manually insert
- `update/0` — force an immediate refresh (synchronous)
- `reset/0` — clear the ETS table and refresh from scratch
- `ready?/0`, `ready?(timeout)` — health check
- `status/0` — human-readable last-updated-at message
- `ets_table_name/0` — the underlying table name (the module itself)

## Telemetry

Kaxxa emits two events on every `get/1`:

- `[:cache, :read]` — measurements: `%{duration: integer (native time)}`, metadata: `%{name: short_name, kind: :key, cache_type: :ets}`
- `[:cache, :miss]` — emitted only when the lookup returns `nil`. Metadata: `%{name: short_name, cache_type: :ets}`

Attach handlers via `:telemetry.attach/4`.

## Error handling

If `query/1` raises, the GenServer crashes and the supervisor restarts it. To swallow transient errors without restarting, rescue inside your own `query/1`:

```elixir
def query(last_updated_at) do
  from(u in MyApp.User, where: u.updated_at > ^last_updated_at)
  |> MyApp.Repo.all()
rescue
  _ in [Postgrex.Error, DBConnection.ConnectionError] -> []
end
```

## Tests

Run the suite with `mix test`.
