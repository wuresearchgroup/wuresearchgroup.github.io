---
layout: page
permalink: /publications/
title: Publications
description: 
years: [2024,2023,2021]
nav: true
nav_order: 3
---

See [Google Scholar](https://scholar.google.com/citations?hl=en&user=wo1zj5kAAAAJ&view_op=list_works&sortby=pubdate). Asterisk (*) denotes corresponding authors. Ampersand (&) denotes equal contribution.

<!-- _pages/publications.md -->
<div class="publications">

{%- for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>