---
layout: blog
title: "Elixir Best Practices"
date: 2025-10-30 12:00:00 +0000
author: "Andre' Vella"
tags: [elixir]
excerpt: "Elixir Best Practices"
---

# Elixir Best Practices

## Order listing of module attributes, directives, and macros

```elixir
@moduledoc
@behaviour
use
import
require
alias
@module_attribute
defstruct
@type
@callback
@macrocallback
@optional_callbacks
defmacro, defmodule, defguard, def
```