---
layout: page
permalink: /people/
title: People
description: Great people
nav: true
nav_order: 4
---

<div class="people">

  {% assign pis = site.projects | where: "category", "Principal Investigator" | sort: "importance" %}
  {% for project in pis %}
    {% include people_hero.liquid %}
  {% endfor %}

</div>
