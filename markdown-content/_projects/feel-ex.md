---
layout: project
title: "FeelEx"
date: 2026-06-02
author: "Andre' Vella"
tags: [elixir]
git_url: "https://github.com/andimon/feel_ex"
excerpt: "Business-oriented expression language based on FEEL (Friendly Enough Expression Language), built in Elixir."
---

# FeelEx [![Build Status](https://github.com/ExSemantic/feel_ex/actions/workflows/tests.yml/badge.svg)](https://github.com/ExSemantic/feel_ex/actions) [![Coverage Status](https://coveralls.io/repos/github/ExSemantic/feel_ex/badge.svg)](https://coveralls.io/github/ExSemantic/feel_ex?branch=master) [![Hex.pm](https://img.shields.io/hexpm/v/feel_ex.svg)](https://hex.pm/packages/feel_ex) [![Documentation](https://img.shields.io/badge/documentation-gray)](https://hexdocs.pm/feel_ex/)

# Introduction

A friendly expression language helps users define decision logic without needing deep technical expertise. This language is based on the FEEL(Friendly Enough Expression Language). For more information regarding FEEL, please take a look at the official OMG specification at [https://www.omg.org/dmn/](https://www.omg.org/dmn/).

# Installation

Add `feel_ex` to the list of dependencies in mix.exs:

```elixir
def deps do
[
  {:feel_ex, "~> 0.2.0"}
]
end
```

# Data types

## Null

A null value is represented simply by `null`.

```elixir
iex> FeelEx.evaluate("null")
%FeelEx.Value{value: nil, type: :null}
```

## Number

Allows for integers and decimal numbers. The numbers can be negative, and leading zero may be omitted.

```elixir
iex> FeelEx.evaluate("1")
%FeelEx.Value{value: 1, type: :number}

iex> %FeelEx.Value{value: 2.4, type: :number}
FeelEx.evaluate("2.4")

iex> FeelEx.evaluate(".4")
%FeelEx.Value{value: 0.4, type: :number}

iex> FeelEx.evaluate("-5")
%FeelEx.Value{value: -5, type: :number}
```

## Strings

Strings are wrapped around in `"`.

```elixir
iex> FeelEx.evaluate("\"Aw dinja\"")
%FeelEx.Value{value: "Aw dinja", type: :string}
```

## Boolean

Either `true` or `false`.

```elixir
iex> FeelEx.evaluate("true")
%FeelEx.Value{value: true, type: :boolean}
iex> FeelEx.evaluate("false")
%FeelEx.Value{value: false, type: :boolean}
```

## Date

Format: `yyyy-MM-dd`.

```elixir
iex> FeelEx.evaluate("date(\"2017-03-10\")")
%FeelEx.Value{value: ~D[2017-03-10], type: :date}
iex> FeelEx.evaluate("@\"2017-03-10\"")
%FeelEx.Value{value: ~D[2017-03-10], type: :date}
```

## Time

Format: `HH:mm:ss` / `HH:mm:ss+/-HH:mm` / `HH:mm:ss@ZoneId`.

```elixir
iex> FeelEx.evaluate("time(\"11:45:30\")")
%FeelEx.Value{value: ~T[11:45:30], type: :time}
iex> FeelEx.evaluate("time(\"13:30\")")
%FeelEx.Value{value: ~T[13:30:00], type: :time}
iex> FeelEx.evaluate("time(\"11:45:30+02:00\")")
%FeelEx.Value{value: {~T[11:45:30], "+02:00"}, type: :time}
iex> FeelEx.evaluate("time(\"10:31:10@Europe/Paris\")")
%FeelEx.Value{value: {~T[10:31:10], "+01:00", "Europe/Paris"}, type: :time}
iex> FeelEx.evaluate("@\"11:45:30\"")
%FeelEx.Value{value: ~T[11:45:30], type: :time}
iex> FeelEx.evaluate("@\"13:30\"")
%FeelEx.Value{value: ~T[13:30:00], type: :time}
iex> FeelEx.evaluate("@\"11:45:30+02:00\"")
%FeelEx.Value{value: {~T[11:45:30], "+02:00"}, type: :time}
iex> FeelEx.evaluate("@\"10:31:10@Europe/Paris\"")
%FeelEx.Value{value: {~T[10:31:10], "+01:00", "Europe/Paris"}, type: :time}
```

## Date-time

Format: `yyyy-MM-dd'T'HH:mm:ss` / `yyyy-MM-dd'T'HH:mm:ss+/-HH:mm` / `yyyy-MM-dd'T'HH:mm:ss@ZoneId`.

```elixir
iex> FeelEx.evaluate("date and time(\"2015-09-18T10:31:10\")")
%FeelEx.Value{value: ~N[2015-09-18 10:31:10], type: :datetime}
iex> FeelEx.evaluate("date and time(\"2015-09-18T10:31:10+01:00\")")
%FeelEx.Value{value: {~N[2015-09-18 10:31:10], "+01:00"}, type: :datetime}
iex> FeelEx.evaluate("date and time(\"2015-09-18T10:31:10@Europe/Paris\")")
%FeelEx.Value{
  value: {~N[2015-09-18 10:31:10], "+01:00", "Europe/Paris"},
  type: :datetime
}
iex> FeelEx.evaluate("@\"2015-09-18T10:31:10\"")
%FeelEx.Value{value: ~N[2015-09-18 10:31:10], type: :datetime}
iex> FeelEx.evaluate("@\"2015-09-18T10:31:10+01:00\"")
%FeelEx.Value{value: {~N[2015-09-18 10:31:10], "+01:00"}, type: :datetime}
iex> FeelEx.evaluate("@\"2015-09-18T10:31:10@Europe/Paris\"")
%FeelEx.Value{
  value: {~N[2015-09-18 10:31:10], "+01:00", "Europe/Paris"},
  type: :datetime
}
```

## Days-time-duration

Format: `PxDTxHxMxS`.

```elixir
iex> FeelEx.evaluate("duration(\"P4D\")")
%FeelEx.Value{value: %Duration{day: 4}, type: :days_time_duration}
iex> FeelEx.evaluate("duration(\"PT2H\")")
%FeelEx.Value{value: %Duration{hour: 2}, type: :days_time_duration}
iex> FeelEx.evaluate("duration(\"PT30M\")")
%FeelEx.Value{value: %Duration{minute: 30}, type: :days_time_duration}
iex> FeelEx.evaluate("duration(\"  P1DT6H\")")
%FeelEx.Value{value: %Duration{day: 1, hour: 6}, type: :days_time_duration}
iex> FeelEx.evaluate("@\"P4D\"")
%FeelEx.Value{value: %Duration{day: 4}, type: :days_time_duration}
iex> FeelEx.evaluate("@\"PT2H\"")
%FeelEx.Value{value: %Duration{hour: 2}, type: :days_time_duration}
iex> FeelEx.evaluate("@\"PT30M\"")
%FeelEx.Value{value: %Duration{minute: 30}, type: :days_time_duration}
iex> FeelEx.evaluate("@\"P1DT6H\"")
%FeelEx.Value{value: %Duration{day: 1, hour: 6}, type: :days_time_duration}
```

## Years-months-duration

Format: `PxYxM`.

```elixir
iex> FeelEx.evaluate("duration(\"P2Y\")")
%FeelEx.Value{value: %Duration{year: 2}, type: :years_months_duration}
iex> FeelEx.evaluate("duration(\"P6M\")")
%FeelEx.Value{value: %Duration{month: 6}, type: :years_months_duration}
iex> FeelEx.evaluate("duration(\"P1Y6M\")")
%FeelEx.Value{value: %Duration{year: 1, month: 6}, type: :years_months_duration}
iex> FeelEx.evaluate("@\"P2Y\"")
%FeelEx.Value{value: %Duration{year: 2}, type: :years_months_duration}
iex> FeelEx.evaluate("@\"P6M\"")
%FeelEx.Value{value: %Duration{month: 6}, type: :years_months_duration}
iex> FeelEx.evaluate("@\"P1Y6M\"")
%FeelEx.Value{value: %Duration{year: 1, month: 6}, type: :years_months_duration}
```

## List

A list of elements. Lists may contain lists or may be empty.

```elixir
iex> FeelEx.evaluate("[]")
[]
iex> FeelEx.evaluate("[1,2,3]")
[
  %FeelEx.Value{value: 1, type: :number},
  %FeelEx.Value{value: 2, type: :number},
  %FeelEx.Value{value: 3, type: :number}
]
iex> FeelEx.evaluate("[\"a\",\"b\"]")
[
  %FeelEx.Value{value: "a", type: :string},
  %FeelEx.Value{value: "b", type: :string}
]
```

## Context

Key-value data structure. It may be empty or nested (value being a context). The key may be a name or a string.

```elixir
iex> FeelEx.evaluate("{}")
%FeelEx.Value{value: %{}, type: :context}
iex> FeelEx.evaluate("{a:1}")
%FeelEx.Value{
  value: %{a: %FeelEx.Value{value: 1, type: :number}},
  type: :context
}
iex> FeelEx.evaluate("{b:1, c: \"wow\"}")
%FeelEx.Value{
  value: %{
    c: %FeelEx.Value{value: "wow", type: :string},
    b: %FeelEx.Value{value: 1, type: :number}
  },
  type: :context
}
iex> FeelEx.evaluate("{nested: {d: 3}}")
%FeelEx.Value{
  value: %{
    nested: %FeelEx.Value{
      value: %{d: %FeelEx.Value{value: 3, type: :number}},
      type: :context
    }
  },
  type: :context
}
iex> FeelEx.evaluate("{\"a\": 1}")
%FeelEx.Value{
  value: %{a: %FeelEx.Value{value: 1, type: :number}},
  type: :context
}
iex> FeelEx.evaluate("{\"b\": 2, \"c\": \"valid\"}")
%FeelEx.Value{
  value: %{
    c: %FeelEx.Value{value: "valid", type: :string},
    b: %FeelEx.Value{value: 2, type: :number}
  },
  type: :context
}
```

# Expressions

## Introduction

### Comments

An expression can contain comments to explain it and give it more context. `//` is used for single line comments and `/**/` is used for multiline comments.

```elixir
iex> program =
"""
// returns the last item
[1,2,3,4][-1]
"""
iex> FeelEx.evaluate(program)
%FeelEx.Value{value: 4, type: :number}
```

```elixir
program =
"""
/*
 * returns the last item
 */
[1,2,3,4][-1]
"""
iex> FeelEx.evaluate(program)
%FeelEx.Value{value: 4, type: :number}
```

### Parenthesis

Parenthesis are used to group expressions or effect precedence of operators.

```elixir
iex> FeelEx.evaluate("(5 - 3) * (4 / 2)")
%FeelEx.Value{value: 4, type: :number}
iex> FeelEx.evaluate("if (5 < 10) then \"low\" else \"high\"")
%FeelEx.Value{value: "low", type: :string}
```

# Strings

## Creating a new string value.

```elixir
iex> FeelEx.evaluate("\"Aw dinja\"")
%FeelEx.Value{value: "Aw dinja", type: :string}
```

## String concatenation

```elixir
iex> FeelEx.evaluate("\"Aw\"+\" Dinja\"")
%FeelEx.Value{value: "Aw Dinja", type: :string}
```

## `string()`

Converting datatypes to string

### Examples

#### null

```elixir
iex> FeelEx.evaluate("string(null)")
%FeelEx.Value{value: "null", type: :string}
```

#### string (idempotent)

```elixir
iex> FeelEx.evaluate("string(\"Aw Dinja\")")
%FeelEx.Value{value: "Aw Dinja", type: :string}
```

#### number

```elixir
iex> FeelEx.evaluate("string(12)")
%FeelEx.Value{value: "12", type: :string}

iex> FeelEx.evaluate("string(.22)")
%FeelEx.Value{value: "0.22", type: :string}

iex> FeelEx.evaluate("string(-2.22)")
%FeelEx.Value{value: "-2.22", type: :string}

iex> FeelEx.evaluate("string(-.22)")
%FeelEx.Value{value: "-0.22", type: :string}
```

#### boolean

```elixir
iex> FeelEx.evaluate("string(true)")
%FeelEx.Value{value: "true", type: :string}

iex> FeelEx.evaluate("string(false)")
%FeelEx.Value{value: "false", type: :string}
```

#### date

```elixir
iex> FeelEx.evaluate("string(@\"2024-01-01\")")
%FeelEx.Value{value: "2024-01-01", type: :string}
iex> FeelEx.evaluate("string(date(\"2024-01-01\"))")
%FeelEx.Value{value: "2024-01-01", type: :string}
```

#### time

```elixir
iex> FeelEx.evaluate("string(time(\"11:45:30\"))")
%FeelEx.Value{value: "11:45:30", type: :string}

iex> FeelEx.evaluate("string(time(\"11:45\"))")
%FeelEx.Value{value: "11:45:00", type: :string}

iex> FeelEx.evaluate("string(time(\"11:45:30+02:00\"))")
%FeelEx.Value{value: "11:45:30+02:00", type: :string}

iex> FeelEx.evaluate("string(@\"11:45:30\")")
%FeelEx.Value{value: "11:45:30",type: :string}

iex> FeelEx.evaluate("string(@\"13:30\")")
%FeelEx.Value{value: "13:30:00", type: :string}

iex> FeelEx.evaluate("string(@\"10:45:30+02:00\")")
%FeelEx.Value{value: "10:45:30+02:00", type: :string}

iex> FeelEx.evaluate("string(@\"10:31:10@Europe/Paris\")")
%FeelEx.Value{value: "10:31:10@Europe/Paris", type: :string}
```

#### date-time

```elixir
iex> FeelEx.evaluate("string(date and time(\"2015-09-18T10:31:10\"))")
%FeelEx.Value{value: "2015-09-18T10:31:10", type: :string}

iex> FeelEx.evaluate("string(date and time(\"2015-09-18T10:31:10+01:00\"))")
%FeelEx.Value{value: "2015-09-18T10:31:10+01:00", type: :string}

iex> FeelEx.evaluate("string(date and time(\"2015-09-18T10:31:10@Europe/Paris\"))")
%FeelEx.Value{value: "2015-09-18T10:31:10@Europe/Paris", type: :string}

iex> FeelEx.evaluate("string(@\"2015-09-18T10:31:10\")")
%FeelEx.Value{value: "2015-09-18T10:31:10", type: :string}

iex> FeelEx.evaluate("string(@\"2015-09-18T10:31:10+01:00\")")
%FeelEx.Value{value: "2015-09-18T10:31:10+01:00", type: :string}

iex> FeelEx.evaluate("string(@\"2015-09-18T10:31:10@Europe/Paris\")")
%FeelEx.Value{value: "2015-09-18T10:31:10@Europe/Paris", type: :string}
```

#### days-time duration

```elixir
iex> FeelEx.evaluate("string(duration(\"P4D\"))")
%FeelEx.Value{value: "P4D", type: :string}

iex> FeelEx.evaluate("string(duration(\"PT2H\"))")
%FeelEx.Value{value: "PT2H", type: :string}

iex> FeelEx.evaluate("string(duration(\"PT30M\"))")
%FeelEx.Value{value: "PT30M", type: :string}

iex> FeelEx.evaluate("string(duration(\"P1DT6H\"))")
%FeelEx.Value{value: "P1DT6H", type: :string}

iex> FeelEx.evaluate("string(@\"P4D\")")
%FeelEx.Value{value: "P4D",type: :string}

iex> FeelEx.evaluate("string(@\"PT2H\")")
%FeelEx.Value{value: "PT2H", type: :string}

iex> FeelEx.evaluate("string(@\"PT30M\")")
%FeelEx.Value{value: "PT30M", type: :string}

iex> FeelEx.evaluate("string(@\"P1DT6H\")")
%FeelEx.Value{value: "P1DT6H", type: :string}
```

#### years-month-duration

```elixir
iex> FeelEx.evaluate("string(duration(\"P2Y\"))")
%FeelEx.Value{value: "P2Y", type: :string}

iex>  FeelEx.evaluate("string(duration(\"P6M\"))")
%FeelEx.Value{value: "P6M", type: :string}

iex> FeelEx.evaluate("string(duration(\"P1Y6M\"))")
%FeelEx.Value{value: "P1Y6M", type: :string}

iex> FeelEx.evaluate("string(@\"P2Y\")")
%FeelEx.Value{value: "P2Y", type: :string}

iex> FeelEx.evaluate("string(@\"P6M\")")
%FeelEx.Value{value: "P6M", type: :string}

iex> FeelEx.evaluate("string(@\"P1Y6M\")")
%FeelEx.Value{value: "P1Y6M", type: :string}
```

# Numbers

## Leading 0's are valid

```elixir
iex> FeelEx.evaluate("-000002")
%FeelEx.Value{value: -2, type: :number}
iex> FeelEx.evaluate("0001.5")
%FeelEx.Value{value: 1.5, type: :number}
```

## Addition, Subtraction, Multiplication, Division, Exponentiation

We can carry out the usual arithmetic operators with exponentiation having the highest precedence, division and multiplication the second highest and addition and subtraction the least precedence.

### Examples:

`2+3*2` is not `10` but `8` since the multiplicative operator `*` has more precedence than `+`

```elixir
iex> FeelEx.evaluate("2+3*2")
%FeelEx.Value{value: 8, type: :number}
iex> FeelEx.evaluate("2/3")
%FeelEx.Value{value: 0.6666666666666666, type: :number}
```

# Lists

## Getting element `list[i]`

Access element using **1-based indexing**. When index is out of bounds, null is returned.

```elixir
iex> FeelEx.evaluate("[1, \"a\", 3][1]")
%FeelEx.Value{value: 1, type: :number}
iex> FeelEx.evaluate("[1, \"a\", 3][2]")
%FeelEx.Value{value: "a", type: :string}
iex> FeelEx.evaluate("[1, \"a\", 3][3]")
%FeelEx.Value{value: 3, type: :number}
iex> FeelEx.evaluate("[1, \"a\", 3][4]")
%FeelEx.Value{value: nil, type: :null}
```

Using negative indexing we can access elements from the back of the list. The last element of the list is at index `-1`.

```elixir
iex> FeelEx.evaluate("[1, \"a\", 3][-1]")
%FeelEx.Value{value: 3, type: :number}
iex> FeelEx.evaluate("[1, \"a\", 3][-2]")
%FeelEx.Value{value: "a", type: :string}
iex> FeelEx.evaluate("[1, \"a\", 3][-3]")
%FeelEx.Value{value: 1, type: :number}
```

## Filtering

We can filter a list by a condition. The current element of the list is assigned to variable `item`.

```elixir
iex> FeelEx.evaluate("[1,2,4, 3][even(item)]")
[%FeelEx.Value{value: 2, type: :number}, %FeelEx.Value{value: 4, type: :number}]

iex> FeelEx.evaluate("[1,2,4, 3][item>2]")
[%FeelEx.Value{value: 4, type: :number}, %FeelEx.Value{value: 3, type: :number}]
```

## Quantified expression

`some a in b satisfies c`: iterates over list `b`, assigning current element in list to `a`, and evaluating `c`. If some of the elements evaluates to `true` then the statement is `true` else it is false.

`every a in b satisfies c`: iterates over list `b`, assigning current element in list to `a`, and evaluating `c`. If all of the elements evaluates to `true` then the statement is `true` else it is false.

```elixir
iex> FeelEx.evaluate("some x in [1,2,3] satisfies x > 2")
%FeelEx.Value{value: true, type: :boolean}
iex> FeelEx.evaluate("some x in [1,2,3] satisfies x > 5")
%FeelEx.Value{value: false, type: :boolean}
iex> FeelEx.evaluate("every x in [1,2,3] satisfies x >= 1")
%FeelEx.Value{value: true, type: :boolean}
iex> FeelEx.evaluate("every x in [1,2,3] satisfies x >= 2")
%FeelEx.Value{value: false, type: :boolean}
```

# Contexts

## Allows for previous element access

```elixir
iex> FeelEx.evaluate("{a: 2, b: a*2}")
%FeelEx.Value{
  value: %{
    a: %FeelEx.Value{value: 2, type: :number},
    b: %FeelEx.Value{value: 4, type: :number}
  },
  type: :context
}
```

## Get entry path `a.b`

We may use dot notation to access elements of a context.

```elixir
iex> FeelEx.evaluate("{a: 2}.a")
%FeelEx.Value{value: 2, type: :number}
iex> FeelEx.evaluate("{a: 2, b: {b: 3}}.b")
%FeelEx.Value{
  value: %{b: %FeelEx.Value{value: 3, type: :number}},
  type: :context
}
```

If the name we are accessing does not exist in the context than we simply return null.

```elixir
iex> FeelEx.evaluate("{}.a")
%FeelEx.Value{value: nil, type: :null}
iex> FeelEx.evaluate("{b: 1}.a")
%FeelEx.Value{value: nil, type: :null}
```

# Functions

## Numerical Functions

### decimal

```elixir
iex> FeelEx.evaluate("1/3")
%FeelEx.Value{value: 0.3333333333333333, type: :number}
iex> FeelEx.evaluate("decimal(1/3,2)")
%FeelEx.Value{value: 0.33, type: :number}
```

### floor

```elixir
iex> FeelEx.evaluate("floor(1)")
%FeelEx.Value{value: 1, type: :number}
```

### floor with scale

```elixir
iex> FeelEx.evaluate("floor(1.56,1)")
%FeelEx.Value{value: 1.5, type: :number}
```

### ceiling

```elixir
iex> FeelEx.evaluate("ceiling(1.54)")
%FeelEx.Value{value: 2, type: :number}
```

### ceiling with scale

```elixir
iex> FeelEx.evaluate("ceiling(1.5432,2)")
%FeelEx.Value{value: 1.55, type: :number}
```

### round up

```elixir
iex> FeelEx.evaluate("round up(1.123,3)")
%FeelEx.Value{value: 1.123, type: :number}
iex> FeelEx.evaluate("round up(1.1234,3)")
%FeelEx.Value{value: 1.124, type: :number}
iex> FeelEx.evaluate("round up(-1.1234,3)")
%FeelEx.Value{value: -1.124, type: :number}
```

### round down

```elixir
iex> FeelEx.evaluate("round down(-5.5,0)")
%FeelEx.Value{value: -5, type: :number}
iex> FeelEx.evaluate("round down(1.121,2)")
%FeelEx.Value{value: 1.12, type: :number}
```

### round half up

```elixir
iex> FeelEx.evaluate("round half up(1.126,2)")
%FeelEx.Value{value: 1.13, type: :number}
iex> FeelEx.evaluate("round half up(1.125,2)")
%FeelEx.Value{value: 1.13, type: :number}
iex> FeelEx.evaluate("round half up(1.124,2)")
%FeelEx.Value{value: 1.12, type: :number}
```

# Temporal Expressions

## Addition

### `<date>+<duration>=<date>`

```elixir
iex> FeelEx.evaluate("date(\"2020-04-06\") + duration(\"P1D\")")
%FeelEx.Value{value: ~D[2020-04-07], type: :date}
```

### `<time>+<duration>=<time>`

```elixir
iex> FeelEx.evaluate("time(\"08:00:00\") + duration(\"PT1H\")")
%FeelEx.Value{value: ~T[09:00:00], type: :time}
```

### `<date-time>+<duration>=<date-time>`

```elixir
iex> FeelEx.evaluate("date and time(\"2020-04-06T08:00:00\") + duration(\"P7D\")")
%FeelEx.Value{value: ~N[2020-04-13 08:00:00], type: :datetime}
```

### `<duration>+<duration>=<duration>`

```elixir
iex> FeelEx.evaluate("duration(\"P1D\") + duration(\"PT1H\")")
%FeelEx.Value{value: %Duration{day: 1, hour: 1}, type: :days_time_duration}
```

## Subtraction

### `<date>-<date>=<duration>`

```elixir
iex> FeelEx.evaluate("date(\"2020-04-06\") - date(\"2020-04-01\")")
%FeelEx.Value{value: %Duration{day: 5}, type: :days_time_duration}
```

### `<date>-<duration>=<date>`

```elixir
iex> FeelEx.evaluate("date(\"2020-04-06\") - duration(\"P5D\")")
%FeelEx.Value{value: ~D[2020-04-01], type: :date}
```

### `<date-time>-<date-time>=<days-time-duration>`

```elixir
iex> FeelEx.evaluate("date and time(\"2025-01-01T08:00:00\") - date and time(\"2024-01-01T06:00:01\")")
%FeelEx.Value{
  value: %Duration{hour: 8785, minute: 59, second: 59},
  type: :days_time_duration
}
```

### `<date-time>-<duration>=<date-time>`

```elixir
iex> FeelEx.evaluate("date and time(\"2021-01-01T08:00:00\") - duration(\"PT2H\")")
%FeelEx.Value{value: ~N[2021-01-01 06:00:00], type: :datetime}
```

### `<years-months-duration>-<years-months-duration>=<years-months-duration>`

```elixir
iex> FeelEx.evaluate("duration(\"P1Y\") - duration(\"P3M\")")
%FeelEx.Value{value: %Duration{month: 9}, type: :years_months_duration}
```

## Multiplication

```elixir
iex> FeelEx.evaluate("5*duration(\"P1D\")")
%FeelEx.Value{value: %Duration{day: 5}, type: :days_time_duration}
iex> FeelEx.evaluate("13 * duration(\"P1M\")")
%FeelEx.Value{value: %Duration{year: 1, month: 1}, type: :years_months_duration}
```

## Division

```elixir
iex> FeelEx.evaluate("duration(\"P5D\") / duration(\"P1D\")")
%FeelEx.Value{value: 5, type: :number}
iex> FeelEx.evaluate("duration(\"P1Y\") / duration(\"P2M\")")
%FeelEx.Value{value: 6, type: :number}
iex> FeelEx.evaluate("duration(\"P1Y\") / 12")
%FeelEx.Value{value: %Duration{month: 1}, type: :years_months_duration}
```

## Temporal Properties

### Accessing `year`

```elixir
iex> FeelEx.evaluate("@\"2021-01-01\".year")
%FeelEx.Value{value: 2021, type: :number}
iex> FeelEx.evaluate("date and time(\"2021-01-01T08:01:05\").year")
%FeelEx.Value{value: 2021, type: :number}
```

### Accessing `month`

```elixir
iex> FeelEx.evaluate("@\"2021-01-01\".month")
%FeelEx.Value{value: 1, type: :number}
```

### Accessing `day`

```elixir
iex> FeelEx.evaluate("@\"2021-01-01\".day")
%FeelEx.Value{value: 1, type: :number}
```

### Accessing `weekday` in `[1-7]` where 1 is Monday

```elixir
iex> FeelEx.evaluate("@\"2021-01-01\".weekday")
%FeelEx.Value{value: 5, type: :number}
```

### Accessing `hour`, `minute`, `second`

```elixir
iex> FeelEx.evaluate("time(\"08:01:05\").hour")
%FeelEx.Value{value: 8, type: :number}
iex> FeelEx.evaluate("time(\"08:01:05\").minute")
%FeelEx.Value{value: 1, type: :number}
iex> FeelEx.evaluate("time(\"08:01:05\").second")
%FeelEx.Value{value: 5, type: :number}
```

### Accessing `timezone`

```elixir
iex> FeelEx.evaluate("time(\"08:01:05@Europe/Malta\").timezone")
%FeelEx.Value{value: "Europe/Malta", type: :string}
iex> FeelEx.evaluate("date and time(\"2021-01-01T08:01:05@Europe/Malta\").timezone")
%FeelEx.Value{value: "Europe/Malta", type: :string}
```
