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

  {% assign grads = site.projects | where: "category", "Graduate Students" | sort: "importance" %}
  {% if grads.size > 0 %}
    <h2 class="people-section-title">Graduate Students</h2>
    <div class="people-grid">
      {% for project in grads %}{% include people_avatar.liquid %}{% endfor %}
    </div>
  {% endif %}

  {% assign ugs = site.projects | where: "category", "Undergraduate Students" | sort: "importance" %}
  {% if ugs.size > 0 %}
    <h2 class="people-section-title">Undergraduate Students</h2>
    <div class="people-grid">
      {% for project in ugs %}{% include people_avatar.liquid %}{% endfor %}
    </div>
  {% endif %}

  {% assign alumni = site.projects | where: "category", "Alumni" %}
  {% if alumni.size > 0 %}
    <h2 class="people-section-title">Alumni</h2>
    <div class="people-alumni">
      {% assign years = alumni | map: "year" | compact | uniq | sort | reverse %}
      {% for y in years %}
        <h3 class="people-alumni__year">{{ y }}</h3>
        {% assign group = alumni | where: "year", y | sort: "importance" %}
        {% for project in group %}{% include people_alum.liquid %}{% endfor %}
      {% endfor %}
    </div>
  {% endif %}

</div>
