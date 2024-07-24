---
title: VergeIO Recipes
description: VergeIO Recipe Engine
published: true
date: 2023-01-27T21:49:59.697Z
tags: 
editor: markdown
dateCreated: 2022-03-01T16:58:34.740Z
---

## Repositories

The top level recipe organization layer is referred to as a catalog repository, or repository.  A repository is a site collection of recipe catalogs. Typically, a tenant has access to a repository provided by its VergeIO Service Provider. Each tenant can also create a local repository to store its own recipe catalogs.
Repositories can be built as local or remote. Local repositories are built with catalogs and recipes that are hosted within the same system.  Remote repositories are configured with permissions to retrieve recipes from a remote VergeIO environment.  By sharing recipes remotely, administrators can reduce time creating and maintaining recipes in multiple environments.

## Catalogs

A catalog is a group of related recipes. For example, one catalog may contain many varied Windows vm recipes, while another catalog in the same repository could contain all Linux-based vm recipes. Administrators can group recipes into catalogs in whatever way makes sense for their particular organization. Catalogs can be configured to be shared to tenants beneath the current environment to reduce time creating and maintaining recipes in multiple environments.

## VM Recipe
A vm recipe is a customizable template for launching new virtual machine instances. A vm recipe can include initial hardware specifications (e.g. number of cores, RAM, CPU type, drives, NICs) and resource pool specification. Additionally, custom fields can be added to the recipe to gather input at the time of recipe consumption. This data, input by the recipe consumer, can then be utilized to adjust elements within the new vm guest at first startup. For example, a recipe can be configured to prompt for a database username and password, or select a specific set of packages to install. Due to tight integration with [cloud-init](https://cloudinit.readthedocs.io/en/latest/index.html), vm recipe questions can be configured using either "NoCloud" or "Config Drive v2" as the data source. The variables from the data source can then be turned into questions in the vm recipe to be answered right from the VergeIO user interface.

## Tenant Recipe
A tenant recipe is a customizable template for creating a new tenant instance. A tenant recipe can include pre-defined settings for configuration/resource allocation as well as include custom fields to gather input at time of consumption. 
A typical use case for a tenant recipe would be for an administrator that has to create a new tenant environment everytime a new customer is added to their roster. If a new customer always gets the same set of core services, i.e a webserver, domain controller, NAS service, etc. the admin can create a tenant recipe instance that includes all of the the core virtual machines. When the customer is signed the admin can then create a new tenant from the recipe, answer a few questions, and have the environment up and running in a matter of minutes.

### Recipe Heirarchy

![recipe-arch.png](/public/recipe-arch.png)

<br>
<br>
<div style="text-align:center; margin-bottom:5px">
  <a href="https://www.verge.io/test-drive#Demo-Section"><button class="button-cta">Request Trial</button></a>
</div>

