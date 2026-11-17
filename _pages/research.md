---
layout: page
permalink: /research/
title: Research
description: Everything Should Be Made as Simple as Possible, But Not Simpler --- Albert Einstein
nav: true
nav_order: 2
---

**The Wu research group** is dedicated to advancing the understanding and design of complex materials, with a particular focus on *macromolecules* and *polymers*. By integrating cutting-edge computational techniques, we aim to push the boundary forward in the following key areas:

<!-- Research areas and their key papers: edit _data/research.yml and the `thrust` field in papers.bib -->
<div class="research-areas">
  {% for area in site.data.research %}
    {% assign area_image = area.image | prepend: 'assets/img/' %}
    <div class="research-area" id="{{ area.id }}">
      <div class="research-area__figure">
        {% include figure.liquid path=area_image alt=area.title sizes="(min-width: 768px) 320px, 100vw" class="img-fluid rounded" zoomable=true %}
      </div>
      <div class="research-area__body">
        <h2 class="research-area__title">{{ forloop.index }}. {{ area.title }}</h2>
        <p class="research-area__description">{{ area.description }}</p>
        <div class="research-area__papers-title">Key papers</div>
        {% bibliography --group_by none --template bib_compact --query @*[thrust={{area.id}}]* %}
      </div>
    </div>
  {% endfor %}
</div>

Through our interdisciplinary research, we strive to push the boundaries of chemistry, polymer physics, and computational materials science, fostering innovation in the discovery and design of next-generation macromolecular materials. Join us in our mission to transform the way we understand and engineer functional macromolecular materials!

**Research Infrastructure** Our group currently owns workstations with GPUs: 4  $$ \times $$ 3090 and 3 $$ \times $$ 4090 and CPUs: > 100 cores; In addition, XJTLU has university-wide HPC center, which is continuously growing. Currently, there are more than 60 GPUs and 1000 CPU cores. Find more details on [XJTLU HPC official website](https://hpc.xjtlu.edu.cn/).

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/group_photos/research_2025_12_16.png" title="Research Overview 12.16.2025" class="img-fluid rounded z-depth-1" width="100%" %}
    </div>
</div>
<br>

<br><br><br>
