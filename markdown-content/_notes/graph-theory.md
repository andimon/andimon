---
title: 'Graph Theory Notes'
date: 2026-03-25
tech: 'Graph Theory'
tags: ['Graph Theory', 'graphs', 'nodes', 'edges', 'algorithms', 'networks']
excerpt: 'Notes for Graph Theory.'
toc: true
---

## Introduction to Graph Theory

### Definition 1 (Simple Graph) {#def-simple-graph}

A **simple graph** is a graph with no self-loops and no multiple edges between the same pair of vertices.

$$
G = (V, E)
$$

Where:
1. $V$ is a non-empty set of vertices (nodes)
2. $E$ is a set of unordered pairs of distinct vertices, i.e.
   $$
   E \subseteq \{\{u, v\} \mid u, v \in V,\; u \neq v\}
   $$
