---
layout: page
permalink: /gallery/
title: Gallery
description: Some beautiful moments
nav: true
nav_order: 7
---

<!-- Photos are listed in _data/gallery.yml -->
<div class="gallery-grid">
  {% for photo in site.data.gallery %}
    {% assign photo_path = photo.image | prepend: 'assets/img/group_photos/' %}
    <div class="gallery-item">
      {% include figure.liquid path=photo_path alt=photo.caption caption=photo.caption sizes="(min-width: 768px) 300px, 100vw" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
  {% endfor %}
</div>
