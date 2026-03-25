---
title: 'Elixir Notes'
date: 2026-03-25
tech: 'Elixir'
tags: ['Elixir', 'beam', 'otp', 'functional', 'backend', 'erlang']
excerpt: 'Notes for Elixir.'
toc: true
---

## Structs
- structs are built on top of maps, and they provide compile time checks and ability for default values
- to define a struct we need to make use of the `defstruct` keyword 

```elixir
defmodule Pastizz do 
    defstruct type: "Irkotta", calories: 1000000
end
```
- only defined fields are allowed to exist in a struct

```elixir
%Pastizz{oops: :field}
** (KeyError) key :oops not found expanding struct: Pastizz.__struct__/1
```
- Access with `pastizz.type`, update with `%{pastizz | type: "Anchovies"}`
- `struct/2` - silent, ignores invalid keys
- `struct!/2` - strict, raises `KeyError` on invalid keys
- Structs are bare maps with a hidden, special `__struct__` field, holding the name of the struct

```elixir
# struct/2 - silently ignores invalid keys
struct(%Pastiz{}, type: "Pizelli", invalid: "field")
#=> %Pastizz{calories: 1000000, type: "Pizelli"}

# struct!/2 - raises on invalid keys
struct!(%Pastizz{}, type: "Pizelli", invalid: "field")
#=> ** (KeyError) key :invalid not found in: %Pastizz{}

# struct!/2 - valid update
struct!(%Pastizz{}, type: "Chicken", calories: 500000)
#=> %Patizz{calories: 500000, type: "Chicken"}
```
```elixir
pastizz_irkotta = %Patizz{calories: 2000000, type: "Irkotta"}

iex> pastizz_irkotta.__struct__
Pastizz
```
- No `Enumerable` or `Access` protocols - can't use `pastizz[:type]` or `Enum`

```elixir
iex> food = %Pastizz{}
%Pastizz{calories: 1000000, type: "Irkotta"}
pastizz[:type]
** (UndefinedFunctionError) function Pastizz.fetch/2 is undefined (User does not implement the Access behaviour)
             Pastizz.fetch(%Pastizz{calories: 1000000, type: "Irkotta"}, :type)
iex> Enum.each(john, fn {field, value} -> IO.puts(value) end)
** (Protocol.UndefinedError) protocol Enumerable not implemented for %Pastizz{calories: 1000000, type: "Irkotta"} of type Pastizz (a struct)
```
- Fields without defaults are `nil`; nil-defaulted fields must come before keyword defaults in `defstruct`

```elixir
defmodule Pastizz do 
    defstruct [:pastizzeria, type: "Irkotta", calories: 1000000]
end
```
- `@enforce_keys` forces keys at creation, not on updates, no value validation

```elixir
iex> defmodule Pastizz do
...>  @enforce_keys [:type]
...>  defstruct [:calories, :type]
...> end
%Pastizz{}
** (ArgumentError) the following keys must also be given when building struct Pastizz: [:type]
    expanding struct: Pastizz.__struct__/1
```