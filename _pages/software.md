---
layout: page
permalink: /software/
title: Software & Data
nav_title: Software
description: Open-source codes and data from the group
nav: true
nav_order: 4
---

We develop and share open-source tools for molecular simulation, analysis, and AI-assisted computational science. More on [GitHub](https://github.com/Chenghao-Wu).

<!-- Entries are listed in _data/software.yml -->
{% assign sections = site.data.software.software | concat: site.data.software.data %}
{% for section in sections %}
  <h2 class="software-section-title">{{ section.category }}</h2>
  <div class="software-grid">
    {% for item in section.items %}
      <a class="software-card" href="{{ item.url }}">
        <div class="software-card__name">
          {% if item.url contains 'github.com' %}<i class="fa-brands fa-github"></i>{% endif %}
          {{ item.name }}
        </div>
        <p class="software-card__description">{{ item.description }}</p>
        {% if item.language %}<span class="software-card__tag">{{ item.language }}</span>{% endif %}
      </a>
    {% endfor %}
  </div>
{% endfor %}
